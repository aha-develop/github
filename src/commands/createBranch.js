aha.on("createBranch", async ({ record }) => {
  const branchName = await aha.commandPrompt("Branch name", {
    default: "PLAT-4-branch-name",
    placeholder: "Enter a name for the branch",
  });

  console.log(`Branch name: ${branchName}`);

  // Delay just for fun.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const secondValue = await aha.commandPrompt("Second prompt", {
    placeholder: "Enter a second prompt",
  });

  console.log(`Second value: ${secondValue}`);

  const repos = await aha.command("aha-develop.github.sync");

  throw new Error(`I didn't like your second value: ${secondValue}`);
  //withGitHubApi(async (api) => {});
});
