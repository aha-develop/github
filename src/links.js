import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Branches from "./components/Branches";
import Menu from "./components/Menu";
import PullRequests from "./components/PullRequest";
import { githubApi } from "./lib/github";
import { GithubAuthContext } from "./lib/useGithubApi";

function Styles() {
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
    `}
    </style>
  );
}

function prStatus(pr) {
  /*
  {
    viewer {
      login
      pullRequests(last: 10) {
        nodes {
          state
          commits(last: 1) {
            edges {
              node {
                id
                commit {
                  status {
                    state
                    contexts {
                      state
                      description
                      context
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  */
}

function App({ fields, record }) {
  const githubLinks =
    fields.branches || fields.pullRequests ? (
      <>
        <Branches fields={fields} />
        <PullRequests record={record} fields={fields}></PullRequests>
      </>
    ) : (
      <div>Not linked</div>
    );

  return (
    <aha-flex alignItems="center">
      {githubLinks}
      <div style={{ marginLeft: "auto" }}></div>
      <Menu record={record} />
    </aha-flex>
  );
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "authed":
      return { ...state, error: null, api: action.api, authed: true };
    case "error":
      if (action.message.includes("Token is not available")) {
        return {
          ...state,
          error: null,
          api: null,
          authed: false,
        };
      } else {
        return {
          ...state,
          error: action.message,
          api: null,
          authed: false,
        };
      }
    case "clear":
    default:
      return { error: null, api: null, authed: null };
  }
};

const Authed = (Component) => (props) => {
  /** @type {any} */
  const [authState, dispatch] = useReducer(authReducer, {});

  const loadCachedAuth = async () => {
    try {
      const api = await githubApi(true);
      dispatch({ type: "authed", api });
    } catch (err) {
      dispatch({ type: "error", message: err.message });
    }
  };

  useEffect(() => {
    loadCachedAuth();
  }, []);

  const handleReauth = useCallback(async () => {
    dispatch({ type: "clear" });

    try {
      const api = await githubApi(false);
      dispatch({ type: "authed", api });
      return true;
    } catch (err) {
      dispatch({ type: "error", message: err.message });
      return false;
    }
  }, [dispatch]);

  const authContext = useMemo(() => {
    return { ...authState, handleReauth };
  }, [authState, handleReauth]);

  return (
    <GithubAuthContext.Provider value={authContext}>
      <Component {...props} />
    </GithubAuthContext.Provider>
  );
};

const AuthedApp = Authed(App);

/**
 * @type {Aha.RenderExtension}
 */
function links(container, { record, fields }) {
  render(
    <>
      <Styles /> <AuthedApp fields={fields} record={record} />
    </>,
    container
  );

  return () => unmountComponentAtNode(container);
}

aha.on("links", links);
