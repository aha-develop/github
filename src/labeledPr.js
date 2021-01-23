aha.on(
  { event: "aha-develop.github.pr.labeled" },
  async ({ record, label }) => {
    console.log(label);

    if (label.name === "documentation") {
      console.log("Changing");
      console.log(record);

      record = new aha.modelClasses.Feature(
        {
          id: record.attributes.id,
          workflowStatus: "unknown",
        },
        {
          query: aha.modelClasses.Feature.select(["id"]).first(),
        }
      );

      record.workflow_status = { name: "Documented" };
      await record.save();
    }
  }
);
