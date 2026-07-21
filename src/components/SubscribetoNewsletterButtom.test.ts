import { describe, it, expect } from "vitest";
import { getFooterContent, newsletterContent } from "../lib/content";
import fs from "fs";
import path from "path";

const mockCity = "vancouver";
const footerContent = getFooterContent(mockCity);

describe("Newsletter Target Buttons Unit Tests (#138)", () => {
  // 1. Testing data structure integrity (Content Data)
  it("should verify the content structure for Newsletter is correctly configured", () => {
    expect(newsletterContent).toBeDefined();
    expect(newsletterContent.ctaText).toBe("Subscribe to Newsletter"); // اصلاح شده بر اساس دیتای واقعی فایل شما
    expect(newsletterContent.ctaHref).toBe("https://tally.so/r/mR6RBl");
  });

  // 2. Testing the presence of hardcoded target="_blank" within the component
  it("should ensure the HTML link inside Newsletter.astro has target='_blank' and safe rel attributes", () => {
    // Reading the component file from disk
    const componentPath = path.resolve(
      process.cwd(),
      "src/components/Newsletter.astro",
    );
    const componentContent = fs.readFileSync(componentPath, "utf8");

    // Checking the exact presence of attributes on the <a> tag in the component
    expect(componentContent).toContain('target="_blank"');
    expect(componentContent).toContain('rel="noopener noreferrer"');

    // Checking the exact structure of the <a> tag in the component
    const hasCorrectAnchorTag = componentContent.includes(
      '<a target="_blank" rel="noopener noreferrer" href={content.ctaHref} class="newsletter-button">',
    );
    expect(hasCorrectAnchorTag).toBe(true);
  });
});
