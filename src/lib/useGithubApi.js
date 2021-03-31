import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const GithubAuthContext = createContext({
  authed: false,
  api: null,
  error: null,
  handleReauth: async () => {},
});

/**
 * @typedef Options
 * @prop {any=} data Initial data
 * @prop {boolean=} refetch If true data will eb refetched when deps change,
 *   otherwise it will return to the non-loaded state and fetch() must be called
 */

/**
 * @template R
 * @param {((api: any) => Promise<R>)} callback
 * @param {Options} options
 * @param {*} deps
 * @returns {{
 *  data: R;
 *  error: string | null;
 *  authed: boolean;
 *  loading: boolean;
 *  fetch: () => Promise<void>
 * }}
 */
export function useGithubApi(callback, options = {}, deps = []) {
  const authState = useContext(GithubAuthContext);
  const { authed, api, error: authError, handleReauth } = authState;
  const [error, setError] = useState(authError);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(options.data || null);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await callback(api);
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const fetch = async () => {
    setLoading(true);
    setData(null);
    handleReauth();
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
      return;
    }
    if (!authed) {
      setError(null);
      setLoading(false);
      return;
    }

    getData();
  }, [authed, authError]);

  useEffect(() => {
    if (!deps || deps.length === 0) return;
    // Although authed is checked, its not a dep because this should not be run
    // if it changes
    if (authed) getData();
  }, deps);

  return { data, error, authed, loading, fetch };
}
