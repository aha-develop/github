import { validPrUrl } from "./validPrUrl";

describe("validPrUrl", () => {
  it("successed for valid urls", () => {
    expect(
      validPrUrl("https://github.com/example/project/pull/1")
    ).toBeTruthy();
  });

  it("fails for invalid urls", () => {
    [
      "not a url",
      "https://anotherdomain.com/example/project/pull/1",
      "http://github.com/example/project/pull/1",
      "https://github.com/example/pull/1",
      "https://github.com/example/project/pulls/1",
      "https://github.com/example/project/pull/a",
    ].forEach((url) => {
      expect(validPrUrl(url)).toBeFalsy();
    });
  });
});
