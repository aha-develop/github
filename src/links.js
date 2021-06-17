import { AuthProvider } from "@aha-app/aha-develop-react";
import React from "react";
import { Attribute } from "./components/attribute/Attribute";
import { Styles } from "./components/Styles";

/**
 * @type {Aha.RenderExtension}
 */
const links = ({ record, fields }) => {
  return (
    <>
      <Styles />
      <AuthProvider serviceName="github" serviceParameters={{ scope: "repo" }}>
        <Attribute fields={fields} record={record} />
      </AuthProvider>
    </>
  );
};

aha.on("links", links);
