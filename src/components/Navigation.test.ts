import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getNavigationContent } from "../lib/content";

describe("Navigation content - Schedule link", () => {
  (["toronto", "vancouver"] as const).forEach((city) => {
    it(`includes the Schedule link pointing at /#schedule for ${city}`, () => {
      const { links } = getNavigationContent(city);
      expect(links).toContainEqual({ text: "Schedule", href: "/#schedule" });
    });
  });
});

describe("Navigation.astro - renders links from content", () => {
  it("maps over content.links so the Schedule link reaches the DOM", () => {
    const componentPath = path.resolve(__dirname, "./Navigation.astro");
    const source = fs.readFileSync(componentPath, "utf8");

    expect(source).toMatch(/content\.links\.map\(/);
  });
});
