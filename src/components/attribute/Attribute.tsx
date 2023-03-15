import { useAuth } from "@aha-app/aha-develop-react";
import { LinkableRecord } from "@lib/linkableRecord";
import { useClipboard } from "@lib/useClipboard";
import { IRecordExtensionFields } from "extension";
import React from "react";
import { Branches } from "./Branches";
import { EmptyState } from "./EmptyState";
import { Menu } from "./Menu";
import { PullRequests } from "./PullRequests";

type AttributeProps = {
  record: LinkableRecord;
  fields: IRecordExtensionFields;
};

export const Attribute: React.FC<AttributeProps> = ({ fields, record }) => {
  const [onCopy, copied] = useClipboard();
  const { error, authed } = useAuth(async () => {});
  const authError = error && <div>{error}</div>;

  const isLinked = [fields.branches, fields.pullRequests].some(
    (ary) => ary && ary.length > 0
  );

  if (isLinked) {
    return (
      <div className="mt-1 ml-1">
        <aha-flex
          align-items="center"
          justify-content="space-between"
          gap="5px"
        >
          <Branches fields={fields} />
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <aha-button-group>
              <aha-button
                kind="secondary"
                size="mini"
                onClick={(e) => onCopy(record.referenceNum)}
              >
                {copied ? "Copied!" : "Copy ID"}
              </aha-button>
              <Menu record={record} />
            </aha-button-group>
          </div>
        </aha-flex>
        <aha-flex
          align-items="center"
          justify-content="space-between"
          gap="5px"
        >
          {authError}
          <aha-flex
            direction="column"
            gap="8px"
            justify-content="space-between"
          >
            <PullRequests
              record={record}
              prs={fields.pullRequests || []}
            ></PullRequests>
          </aha-flex>
        </aha-flex>
      </div>
    );
  }

  return <EmptyState record={record} />;
};
