import React from "react";

const isValidGithubLink = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.origin === "https://github.com";
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
const GithubLink = (props) => {
  if (isValidGithubLink(props.href)) {
    return (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  } else return <>"Invalid Github URL."</>;
};

export default GithubLink;
