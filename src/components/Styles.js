import React from "react";

const Styles = () => {
  return (
    <style>
      {`
    .type-icon {
      font-size: 18px;
      color: #aaa;
      padding-right: 5px;
      vertical-align: middle;
    }

    .icon-button {
      border: 0;
    }

    .pr-state {
      display: inline-block;
      font-size: 12px;
      background-color: #aaa;
      color: white;
      padding: 1px 6px;
      border-radius: 4px;
      margin-left: 5px;
      text-transform: capitalize;
    }
    .pr-state-open {
      background-color: #28a745;
    }
    .pr-state-merged {
      background-color: #6f42c1;
    }
    .pr-state-closed {
      background-color: #d73a49;
    }
    .pr-state-draft {
      background-color: #6a737d;
    }

    .pr-status {
      margin-left: 5px;
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
      opacity: 0.0;
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
    .pr-check-error, .pr-check-failure {
      color: var(--aha-red-600);
    }
    .pr-check-expected, .pr-check-pending {
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
    `}
    </style>
  );
};

export default Styles;
