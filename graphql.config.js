// Configures the graphql extension for vscode
module.exports = {
  projects: {
    github: {
      schema: "node_modules/@octokit/graphql-schema/schema.graphql",
      documents: ["src/lib/github/queries/*.graphql"],
    },
  },
};
