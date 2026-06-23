import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Hero Component - Get your ticket button", () => {
  it("should have target='_blank' and secure rel attributes on the primary CTA button", () => {
    // Resolve the path to the Hero component file
    const componentPath = path.resolve(
      __dirname,
      "../src/components/Hero.astro",
    );
    const fileContent = fs.readFileSync(componentPath, "utf8");

    // 1. Verify that the primary CTA button opens in a new tab
    expect(fileContent).toMatch(
      /<a[^>]*target="_blank"[^>]*href={content\.primaryCta\.href}/,
    );

    // 2. Ensure security best practices by checking for rel="noopener noreferrer"
    expect(fileContent).toContain('rel="noopener noreferrer"');
  });
});
