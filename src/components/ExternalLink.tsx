import React from "react";

function isValidExternalLink(urlString: string) {
  try {
    const url = new URL(urlString);
    return url.protocol === "https:";
  } catch (e) {
    return false;
  }
}

/**
 * Ensures that Github target _blank links have the required noopener noreferrer properties
 * and that they point to Github. Use like a normal <a> tag
 */
export const ExternalLink: React.FC<{ href: string }> = (props) => {
  if (isValidExternalLink(props.href)) {
    return (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  } else return <>"Invalid external URL."</>;
};
