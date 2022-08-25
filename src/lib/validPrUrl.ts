const regex = /\/[^\/]+\/[^\/]+\/pull\/\d+/;

export function validPrUrl(urlString: string) {
  try {
    const url = new URL(urlString);
    return url.origin === "https://github.com" && regex.test(url.pathname);
  } catch (err) {
    return false;
  }
}
