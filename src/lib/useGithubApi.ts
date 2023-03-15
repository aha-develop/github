import { useAuth } from "@aha-app/aha-develop-react";
import { authedGraphql, GqlFetch } from "./github/api";

interface UseGithubOptions<R> {
  /**
   * Initial data
   */
  data?: R;
}

interface GithubApiCallback<R> {
  (api: GqlFetch): Promise<R>;
}

export function useGithubApi<R>(
  callback: GithubApiCallback<R>,
  options: UseGithubOptions<R> = {},
  deps: any[] = []
) {
  const authCallback = async (authData: any) => {
    const api = authedGraphql(authData.token);
    return await callback(api);
  };

  return useAuth(authCallback, options, deps as any);
}
