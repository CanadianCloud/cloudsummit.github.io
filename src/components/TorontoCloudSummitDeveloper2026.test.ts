import { describe, it, expect } from "vitest";
import { websiteCredits } from "../lib/content";

describe("Website Credits Unit Tests for Toronto Cloud Summit (#142)", () => {
  it("should verify that website credits array contains exactly Ahmad and Vincent with correct profiles", () => {
    expect(websiteCredits).toBeDefined();

    expect(websiteCredits.length).toBe(2);

    expect(websiteCredits[0].name).toBe("Ahmad");
    expect(websiteCredits[0].link).toBe(
      "https://www.linkedin.com/in/ahmad-salempoor/",
    );

    expect(websiteCredits[1].name).toBe("Vincent");
    expect(websiteCredits[1].link).toBe(
      "https://www.linkedin.com/in/vincent-vincent-360b71104/",
    );
  });
});
