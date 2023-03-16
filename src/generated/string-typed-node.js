// @ts-nocheck
"use strict";
const { extname } = require("path");
const { print } = require("graphql");
const { oldVisit } = require("@graphql-codegen/plugin-helpers");
const {
  optimizeOperations,
} = require("@graphql-codegen/visitor-plugin-common");
const { concatAST, Kind } = require("graphql");
const tslib_1 = require("tslib");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const auto_bind_1 = tslib_1.__importDefault(require("auto-bind"));

class TypeScriptDocumentNodesVisitor extends visitor_plugin_common_1.ClientSideBaseVisitor {
  constructor(schema, fragments, config, documents) {
    super(
      schema,
      fragments,
      {
        documentMode:
          visitor_plugin_common_1.DocumentMode.documentNodeImportFragments,
        documentNodeImport:
          "@graphql-typed-document-node/core#TypedDocumentNode",
        ...config,
      },
      {},
      documents
    );
    this.pluginConfig = config;
    (0, auto_bind_1.default)(this);
    // We need to make sure it's there because in this mode, the base plugin doesn't add the import
    if (
      this.config.documentMode ===
      visitor_plugin_common_1.DocumentMode.graphQLTag
    ) {
      const documentNodeImport = this._parseImport(
        this.config.documentNodeImport || "graphql#DocumentNode"
      );
      const tagImport = this._generateImport(
        documentNodeImport,
        "DocumentNode",
        true
      );
      this._imports.add(tagImport);
    }
  }
  SelectionSet(node, _, parent) {
    if (!this.pluginConfig.addTypenameToSelectionSets) {
      return;
    }
    // Don't add __typename to OperationDefinitions.
    if (parent && parent.kind === "OperationDefinition") {
      return;
    }
    // No changes if no selections.
    const { selections } = node;
    if (!selections) {
      return;
    }
    // If selections already have a __typename or is introspection do nothing.
    const hasTypename = selections.some(
      (selection) =>
        selection.kind === "Field" &&
        (selection.name.value === "__typename" ||
          selection.name.value.lastIndexOf("__", 0) === 0)
    );
    if (hasTypename) {
      return;
    }
    return {
      ...node,
      selections: [
        ...selections,
        {
          kind: "Field",
          name: {
            kind: "Name",
            value: "__typename",
          },
        },
      ],
    };
  }
  getDocumentNodeSignature(resultType, variablesTypes, node) {
    if (
      this.config.documentMode ===
        visitor_plugin_common_1.DocumentMode.documentNode ||
      this.config.documentMode ===
        visitor_plugin_common_1.DocumentMode.documentNodeImportFragments ||
      this.config.documentMode ===
        visitor_plugin_common_1.DocumentMode.graphQLTag
    ) {
      return ` as unknown as DocumentNode<${resultType}, ${variablesTypes}>`;
    }
    return super.getDocumentNodeSignature(resultType, variablesTypes, node);
  }
  _gql(node) {
    const document = super._gql(node);
    return "`" + print(JSON.parse(document)) + "`";
  }
}

module.exports = {
  plugin: (schema, rawDocuments, config) => {
    const documents = config.flattenGeneratedTypes
      ? optimizeOperations(schema, rawDocuments)
      : rawDocuments;
    const allAst = concatAST(documents.map((v) => v.document));
    const allFragments = [
      ...allAst.definitions
        .filter((d) => d.kind === Kind.FRAGMENT_DEFINITION)
        .map((fragmentDef) => ({
          node: fragmentDef,
          name: fragmentDef.name.value,
          onType: fragmentDef.typeCondition.name.value,
          isExternal: false,
        })),
      ...(config.externalFragments || []),
    ];
    const visitor = new TypeScriptDocumentNodesVisitor(
      schema,
      allFragments,
      config,
      documents
    );
    const visitorResult = oldVisit(allAst, { leave: visitor });
    return {
      prepend: allAst.definitions.length === 0 ? [] : visitor.getImports(),
      content: [
        visitor.fragments,
        ...visitorResult.definitions.filter((t) => typeof t === "string"),
      ].join("\n"),
    };
  },
};
