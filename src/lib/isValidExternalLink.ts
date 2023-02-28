export const isValidExternalLink = (urlString: string | undefined) => {
  if (!urlString) return false;

  try {
    const url = new URL(urlString);
    return url.protocol === "https:";
  } catch (e) {
    return false;
  }
};
