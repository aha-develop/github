import { validPrUrl } from "./validPrUrl";

jest.mock("../extension", () => ({
  IDENTIFIER: "aha-develop.github",
}));

const settingsGet = jest.fn();
(global as any).aha = {
  settings: {
    get: settingsGet,
  },
};

describe("validPrUrl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("successed for valid urls", async () => {
    expect(
      await validPrUrl("https://github.com/example/project/pull/1"),
    ).toBeTruthy();
  });

  describe("when serverUrl is set", () => {
    it("succeeds for valid urls matching the serverUrl", async () => {
      settingsGet.mockResolvedValueOnce("https://github.enterprise.com");

      expect(
        await validPrUrl(
          "https://github.enterprise.com/example/project/pull/1",
        ),
      ).toBeTruthy();
    });
    it("fails for invalid urls", async () => {
      settingsGet.mockResolvedValueOnce("https://github.enterprise.com");

      expect(
        await validPrUrl("https://github.com/example/project/pull/1"),
      ).toBeFalsy();
    });
  });

  it("fails for invalid urls", async () => {
    const invalidUrls = [
      "not a url",
      "https://anotherdomain.com/example/project/pull/1",
      "http://github.com/example/project/pull/1",
      "https://github.com/example/pull/1",
      "https://github.com/example/project/pulls/1",
      "https://github.com/example/project/pull/a",
    ];

    for (const url of invalidUrls) {
      expect(await validPrUrl(url)).toBeFalsy();
    }
  });
});
