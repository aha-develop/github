export const repoFromUrl = (url: string) =>
  new URL(url).pathname.split("/").slice(1, 3);
