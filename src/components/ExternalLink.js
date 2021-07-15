import React from "react";

/**
 * @param {string} urlString
 */
function isValidExternalLink(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === "https:";
  } catch (e) {
    return false;
  }
};

/**
 * Ensures that Github target _blank links have the required noopener noreferrer properties
 * and that they point to Github. Use like a normal <a> tag
 *
 * @type {React.FC<{href: string}>}
 */
export const ExternalLink = (props) => {
  if (isValidExternalLink(props.href)) {
    return (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  } else return <>"Invalid external URL."</>;
};
