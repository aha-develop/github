import { useAuth } from "@aha-app/aha-develop-react";
import React from "react";
import { Branches } from "./Branches";
import { Menu } from "./Menu";
import { PullRequests } from "./PullRequests";

export const Attribute = ({ fields, record }) => {
  const { error, authed } = useAuth(async () => {});
  const authError = error && <div>{error}</div>;

  const isLinked = [fields.branches, fields.pullRequests].some(
    (ary) => ary?.length > 0
  );

  const githubLinks = isLinked ? (
    <aha-flex direction="column" gap="8px" justify-content="space-between">
      <Branches fields={fields} />
      <PullRequests record={record} prs={fields.pullRequests}></PullRequests>
    </aha-flex>
  ) : (
    <div>Not linked</div>
  );

  return (
    <>
      <aha-flex align-items="center" justify-content="space-between" gap="5px">
        {authError}
        {githubLinks}
        <Menu record={record} />
      </aha-flex>
    </>
  );
};
