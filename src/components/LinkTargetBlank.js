import React from "react";

// Ensures that all target _blank links have the required noopener noreferrer properties
// Use like a normal <a> tag
const LinkTargetBlank = props => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {props.children}
  </a>
);

export default LinkTargetBlank;