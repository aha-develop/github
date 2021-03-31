import { createContext, useContext, useEffect, useState } from "react";

export const GithubAuthContext = createContext({
  authed: false,
  api: null,
  error: null,
  handleReauth: async () => {},
});

/**
 * @template R
 * @param {((api: any) => Promise<R>)} callback
 * @param {*} deps
 * @returns {{
 *  data: R;
 *  error: string | null;
 *  authed: boolean;
 *  loading: boolean;
 *  fetch: () => Promise<void>
 * }}
 */
export function useGithubApi(callback, deps = []) {
  const authState = useContext(GithubAuthContext);
  const { authed, api, error, handleReauth } = authState;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getData = async () => {
    setData(await callback(api));
  };

  const fetch = async () => {
    setLoading(true);
    handleReauth();
  };

  useEffect(() => {
    if (authed && api) {
      setLoading(true);
      getData().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [...deps, authed]);

  return { data, error, authed, loading, fetch };
}
