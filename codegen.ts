import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/generated/github-schema-loader.js",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typed-document-node",
      ],
      config: {
        onlyOperationTypes: true,
        avoidOptionals: true,
        enumsAsTypes: true,
        disableDescriptions: true,
        nonOptionalTypename: true,
      },
    },
  },
  documents: ["src/lib/github/queries/*.graphql"],
};

export default config;
