import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
import {
  render,
  unmountComponentAtNode,
} from "https://cdn.skypack.dev/react-dom";
import { allPrs } from "./lib/fields";

aha.on("prs", (container, props) => {
  const Prs = (props) => {
    const [prList, setPrList] = useState([]);

    useEffect(async () => {
      const prs = await allPrs();
      setPrList(prs);
    }, []);

    const prs = prList.map((pr) => {
      return (
        <li>
          {" "}
          PR{" "}
          <a href="#">
            {"#"}
            {pr.prNumber}
          </a>{" "}
          - {pr.ahaReference.join(" ")}
        </li>
      );
    });

    return (
      <div>
        <h1>GitHub Pull Requests</h1>

        <ul>{prs}</ul>
      </div>
    );
  };

  render(<Prs />, container);

  return () => {
    unmountComponentAtNode(container);
  };
});
