aha.on(
  { event: "aha-develop.github.pr.labeled" },
  async ({ record, payload }) => {
    let label = payload["label"];
    if (label.name === "documentation") {
      record.workflowStatus = { name: "Will not implement" };
      await record.save();
    }
  }
);
