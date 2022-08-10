import { useAuth } from "@aha-app/aha-develop-react";
import { LinkableRecord } from "@lib/linkableRecord";
import React from "react";
import { Branches } from "./Branches";
import { EmptyState } from "./EmptyState";
import { Menu } from "./Menu";
import { PullRequests } from "./PullRequests";

type AttributeProps = {
  record: LinkableRecord;
  fields: Github.IRecordExtensionFields;
};

export const Attribute: React.FC<AttributeProps> = ({ fields, record }) => {
  const { error, authed } = useAuth(async () => {});
  const authError = error && <div>{error}</div>;

  const isLinked = [fields.branches, fields.pullRequests].some(
    (ary) => ary && ary.length > 0
  );

  if (isLinked) {
    const githubLinks = (
      <aha-flex direction="column" gap="8px" justify-content="space-between">
        <Branches fields={fields} />
        <PullRequests record={record} prs={fields.pullRequests}></PullRequests>
      </aha-flex>
    );

    return (
      <>
        <aha-flex
          align-items="center"
          justify-content="space-between"
          gap="5px"
        >
          {authError}
          {githubLinks}
          <Menu record={record} />
        </aha-flex>
      </>
    );
  }

  return <EmptyState record={record} />;
};
