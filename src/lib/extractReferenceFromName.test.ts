import { extractReferenceFromName } from "./extractReferenceFromName";

describe("extractReferenceFromName  ", () => {
  it("should return null if no match", () => {
    expect(extractReferenceFromName("foo")).toBe(null);
  });

  it("returns Requirement", () => {
    expect(extractReferenceFromName("FEAT-123-1")).toEqual({
      type: "Requirement",
      referenceNum: "FEAT-123-1",
    });
    expect(extractReferenceFromName("in a sentence FEAT-123-1")).toEqual({
      type: "Requirement",
      referenceNum: "FEAT-123-1",
    });
  });

  it("returns Epic", () => {
    expect(extractReferenceFromName("FEAT-E-123")).toEqual({
      type: "Epic",
      referenceNum: "FEAT-E-123",
    });
    expect(extractReferenceFromName("in a sentence FEAT-E-123")).toEqual({
      type: "Epic",
      referenceNum: "FEAT-E-123",
    });
  });

  it("returns Feature", () => {
    expect(extractReferenceFromName("FEAT-123")).toEqual({
      type: "Feature",
      referenceNum: "FEAT-123",
    });
    expect(extractReferenceFromName("in a sentence FEAT-123")).toEqual({
      type: "Feature",
      referenceNum: "FEAT-123",
    });
  });

  it("returns the first match", () => {
    expect(extractReferenceFromName("with FEAT-123-1 I'm fixing issues that were found in FEAT-122 of epic FEAT-E-121")).toEqual({
      type: "Requirement",
      referenceNum: "FEAT-123-1",
    });
  })
});
