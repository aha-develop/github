import React from "react";
import css from "../lib/css";

const Styles = () => {
  return (
    <style>
      {css`
        * {
          font-family: Inter, Helvetica, Segoe UI, Arial, sans-serif !important;
        }

        .type-icon {
          color: #3fad33;
          padding-right: 5px;
          vertical-align: middle;
        }

        .icon-button {
          border: 0;
        }

        .branches {
          font-size: 85%;
        }

        .pr-state {
          display: inline-block;
          font-size: 12px;
          background-color: #aaa;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          text-transform: capitalize;
        }
        .pr-state-open {
          color: #4f8f0e;
          background-color: #e5f3d6;
        }
        .pr-state-merged {
          color: #463159;
          background-color: #e5dced;
        }
        .pr-state-closed {
          color: #992e0b;
          background-color: #fae7e1;
        }
        .pr-state-draft {
          color: #0b0b0b;
          background-color: #b8c0c9;
        }

        .pr-status {
          cursor: pointer;
          white-space: nowrap;
        }

        .pr-checks {
          font-size: 85%;
          z-index: 1000;
          background: white;
          border: 1px solid #ccc;
          box-shadow: 2px 2px 7px #eeee;
          padding: 8px;
        }

        .pr-check-detail {
          margin-bottom: 2px;
        }

        .pr-icon {
          margin-right: 3px;
        }

        .pr-count {
          font-size: 12px;
          margin-left: 2px;
        }

        .hidden {
          opacity: 0;
          visibility: hidden;
        }

        .pr-check {
          vertical-align: middle;
        }
        .pr-check-detail {
          display: flex;
        }
        .pr-check-icon {
          margin-right: 5px;
          width: 20px;
          display: flex;
          justify-content: center;
        }
        .pr-check-error,
        .pr-check-failure {
          color: var(--aha-red-600);
        }
        .pr-check-expected,
        .pr-check-pending {
          color: var(--aha-yellow-600);
        }
        .pr-check-success {
          color: var(--aha-green-600);
        }
        .pr-check-avatar {
          width: 20px;
          margin-right: 5px;
        }
        .pr-check-avatar img {
          max-width: 18px;
          max-height: 18px;
        }

        .sections {
          background-color: var(--aha-gray-100);
          display: flex;
          padding: 16px;
          gap: 18px;
          flex-wrap: wrap;
        }

        .sections section {
          background: white;
          border: 1px solid #e1e1e1;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          min-height: 100px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          flex-shrink: 1;
          max-width: 800px;
        }

        .sections h2 {
          border-bottom: 1px solid var(--aha-gray-400);
          padding: 15px 21px;
          margin: 0;

          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 18px;
          color: #000000;
        }

        .sections .subsection {
          padding: 21px 26px;
        }

        .sections h3 {
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 21px;
        }
      `}
    </style>
  );
};

export default Styles;
