import { AuthProvider } from "@aha-app/aha-develop-react";
import React from "react";
import { Styles } from "./Styles";

/**
 * Set up the styles and auth provider
 */
export const ExtensionRoot: React.FC = ({ children }) => {
  return (
    <>
      <Styles />
      <AuthProvider serviceName="github" serviceParameters={{ scope: "repo" }}>
        {children}
      </AuthProvider>
    </>
  );
};
