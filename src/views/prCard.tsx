import React from "react";
import { ExternalLink } from "../components/ExternalLink";
import { PrState } from "../components/PrState";
import { IDENTIFIER } from "../extension";
import { PrLink } from "../lib/fields";

const cards = aha.getCardContributor("aha-develop.github.prCard");

cards.on({ action: "loadCardData" }, async ({ records, onData }) => {
  const recordsByType = records.reduce((acc, record) => {
    return {
      ...acc,
      [record.typename]: [...(acc[record.typename] || []), record],
    };
  }, {} as { [index: string]: Aha.RecordUnion[] });
  const fields = await Promise.all(
    Object.entries(recordsByType).map(([typename, records]) =>
      aha.models.ExtensionField.select(
        "extensionFieldableId",
        "extensionFieldableType",
        "id",
        "value"
      )
        .where({
          extensionFieldableType:
            aha.enums.ExtensionFieldableTypeEnum[typename.toUpperCase()],
          extensionFieldableId: records.map((r) => r.id),
          extensionIdentifier: IDENTIFIER,
          name: "pullRequests",
        })
        .findInBatches((fields) => {
          onData(
            fields.reduce(
              (acc, field) => ({
                ...acc,
                [[
                  field.extensionFieldableType,
                  field.extensionFieldableId,
                ].join("-")]: field.value,
              }),
              {}
            )
          );
        })
    )
  );
});

const prState = {
  display: "inline-block",
  fontSize: "10px",
  backgroundColor: "#aaa",
  color: "white",
  padding: "1px 5px",
  borderRadius: "2px",
  textTransform: "capitalize",
};
const prStates = {
  open: {
    color: "var(--theme-green-text)",
    backgroundColor: "var(--theme-green-background)",
  },
  merged: {
    color: "#463159",
    backgroundColor: "#e5dced",
  },
  closed: {
    color: "var(--theme-red-text)",
    backgroundColor: "var(--theme-red-background)",
  },
  draft: {
    color: "#0b0b0b",
    backgroundColor: "#b8c0c9",
  },
};

cards.on({ action: "renderCard" }, ({ record, value }, context) => {
  if (!value || value.length === 0) return null;
  const pr: PrLink = value[0];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <aha-icon
        icon="fa-regular fa-code-pull-request"
        style={{ color: "var(--theme-green-text)" }}
      />
      <ExternalLink href={pr.url}>{pr.name}</ExternalLink>
      <PrState
        pr={pr}
        style={{ ...prState, ...prStates[pr.state.toLowerCase()] }}
      />
    </div>
  );
});
