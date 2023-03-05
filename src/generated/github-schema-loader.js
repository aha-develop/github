/**
 * This file is used by the codegen script `yarn codegen` only, to point codegen
 * at the schema in the octokit package. It is not used at runtime.
 */
const schema = require("@octokit/graphql-schema").schema;
module.exports = schema.json;
