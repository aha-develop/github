import { withGitHubApi } from "./lib/fields.js";

aha.on("createBranch", async (args) => {
  console.log("createBranch");
  console.log("Got args:");
  console.log(args);

  // Delay just for fun.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const branchName = await aha.commandPrompt("Enter a name for the branch", {
    default: "PLAT-4-branch-name",
  });

  console.log(`Branch name: ${branchName}`);
  throw new Error("foo");
  //withGitHubApi(async (api) => {});
});
