// src/components/Footer.test.ts
import { describe, test, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getFooterContent } from "../lib/content";

describe("Footer Component - LinkedIn social link", () => {
  test("footer content data should contain a LinkedIn entry with the correct URL", () => {
    const { social } = getFooterContent("vancouver");
    const linkedIn = social?.find((item) => item.name === "LinkedIn");

    expect(linkedIn).toBeDefined();
    expect(linkedIn?.url).toBe("https://www.linkedin.com/company/canadiancloud/");
  });

  test("LinkedIn social link should open in a new tab with secure rel attributes", () => {
    const componentPath = path.resolve(__dirname, "./Footer.astro");
    const fileContent = fs.readFileSync(componentPath, "utf8");

    // Social links (Instagram/LinkedIn) are rendered from content.social via
    // a single <a> template, so verify that template opens in a new tab...
    expect(fileContent).toMatch(
      /<a\s+href={social\.url}\s+target="_blank"\s+rel="noopener noreferrer"/,
    );

    // ...and specifically renders a LinkedIn icon for the LinkedIn entry.
    expect(fileContent).toMatch(/social\.name === "LinkedIn"/);
  });
});
