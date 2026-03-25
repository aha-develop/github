import { getServerUrl, IDENTIFIER } from "../extension";

const regex = /\/[^\/]+\/[^\/]+\/pull\/\d+/;

export function validPrUrl(urlString: string) {
  try {
    const serverUrl = getServerUrl();
    const url = new URL(urlString);

    // This needs to match PRs from potentially different origins
    return url.origin === serverUrl && regex.test(url.pathname);
  } catch (err) {
    return false;
  }
}
