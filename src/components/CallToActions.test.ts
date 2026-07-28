// src/components/CallToActions.test.ts
import { describe, test, expect } from "vitest";
import { topPageCTAs } from "../lib/content";

describe("CallToActions Component Data & Structure Tests", () => {
  test("should have exactly three CTA buttons configured", () => {
    // Verifies that the requirements for issue #165 are met (exactly 3 buttons)
    expect(topPageCTAs).toHaveLength(3);
  });

  test("should contain correct core CTA identifiers and labels", () => {
    const expectedIds = ["cta-sponsor", "cta-speakers", "cta-volunteers"];
    const actualIds = topPageCTAs.map((cta) => cta.testid);

    // Ensures all three specific CTAs exist in the dataset
    expect(actualIds).toEqual(expectedIds);
  });

  test("all CTA links must point to the correct Tally forms", () => {
    const sponsorCTA = topPageCTAs.find((cta) => cta.testid === "cta-sponsor");
    const speakersCTA = topPageCTAs.find(
      (cta) => cta.testid === "cta-speakers",
    );
    const volunteersCTA = topPageCTAs.find(
      (cta) => cta.testid === "cta-volunteers",
    );

    // Validating exact destination URLs from issue #165 requirements
    expect(sponsorCTA?.href).toBe("https://tally.so/r/wLqXvO");
    expect(speakersCTA?.href).toBe("https://tally.so/r/rjBeN5");
    expect(volunteersCTA?.href).toBe("https://tally.so/r/mBVZjA");
  });

  test("all CTA items must have valid non-empty labels", () => {
    topPageCTAs.forEach((cta) => {
      expect(cta.label).toBeDefined();
      expect(cta.label.length).toBeGreaterThan(0);
    });
  });
});
