import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";

const componentPath = path.resolve(__dirname, "./Schedule.astro");
let source: string;

beforeAll(() => {
  source = fs.readFileSync(componentPath, "utf8");
});

describe("Schedule.astro - section anchor", () => {
  it("keeps id=\"schedule\" and scroll-margin-top for the sticky nav anchor", () => {
    expect(source).toMatch(/id="schedule"/);
    expect(source).toMatch(/scroll-margin-top/);
  });
});

describe("Schedule.astro - data source", () => {
  it("imports the Toronto schedule data module and drops the Vancouver/cityContent path", () => {
    expect(source).toMatch(/from ['"]\.\.\/lib\/torontoSchedule['"]/);
    expect(source).not.toMatch(/cityContent/);
    expect(source).not.toMatch(/vancouver/i);
  });
});

describe("Schedule.astro - venue key", () => {
  it("renders the venue-key line from the exported constant, not hardcoded prose", () => {
    expect(source).toMatch(/\{venueKeyText\}/);
    expect(source).not.toMatch(
      /3 stages \+ workshops across 5 levels \+ basement hackathon/,
    );
  });
});

describe("Schedule.astro - grid data-driven rendering", () => {
  it("iterates the data module's venues, sessions, and gridHeaders collections to build the grid", () => {
    expect(source).toMatch(/venues\.map\(/);
    expect(source).toMatch(/sessions\.map\(/);
    expect(source).toMatch(/fullWidthRows\.map\(/);
    expect(source).toMatch(/gridHeaders\.map\(/);
  });
});

describe("Schedule.astro - full-width row column span respects data", () => {
  it("computes each full-width row's grid-column span from row.venues instead of hardcoding every column", () => {
    expect(source).toMatch(/row\.venues/);
    expect(source).not.toMatch(/grid-column:\s*1\s*\/\s*-1/);
  });
});

describe("Schedule.astro - event-day now line", () => {
  it("wires the pure now-line position math into a dedicated line element", () => {
    expect(source).toMatch(/from ['"]\.\.\/lib\/scheduleNow['"]/);
    expect(source).toMatch(/getNowLinePosition/);
    expect(source).toMatch(/now-line/);
  });
});

describe("Schedule.astro - no Vancouver-only visibility gating", () => {
  it("has no city-based hide/show logic left over from the Vancouver gating", () => {
    expect(source).not.toMatch(/schedule--hidden/);
    expect(source).not.toMatch(/syncScheduleVisibility/);
    expect(source).not.toMatch(/setAttribute\(\s*['"]aria-hidden['"]/);
    expect(source).not.toMatch(/cityStore/);
  });
});

describe("index.astro - Schedule section placement", () => {
  it("renders CallToActions, then Schedule, then WhatIsCloudSummit in that order", () => {
    const indexPath = path.resolve(__dirname, "../pages/index.astro");
    const indexSource = fs.readFileSync(indexPath, "utf8");

    const ctaIndex = indexSource.search(/<CallToActions\s*\/>/);
    const scheduleIndex = indexSource.search(/<Schedule\s*\/>/);
    const whatIsIndex = indexSource.search(/<WhatIsCloudSummit\b/);

    expect(ctaIndex).toBeGreaterThan(-1);
    expect(scheduleIndex).toBeGreaterThan(-1);
    expect(whatIsIndex).toBeGreaterThan(-1);
    expect(ctaIndex).toBeLessThan(scheduleIndex);
    expect(scheduleIndex).toBeLessThan(whatIsIndex);
  });
});

describe("Schedule.astro - mobile timeline and filter chips", () => {
  it("imports the pure grouping logic for the server-rendered timeline instead of reimplementing it inline", () => {
    expect(source).toMatch(/from ['"]\.\.\/lib\/scheduleFilter['"]/);
    expect(source).toMatch(/groupByStartTime/);
  });

  it("the inline script's filter predicate mirrors scheduleFilter's alwaysVisible-or-track-match rule via DOM data attributes only", () => {
    expect(source).toMatch(/dataset\.track/);
    expect(source).toMatch(/alwaysVisible/i);
  });

  it("renders a filter chip per track", () => {
    expect(source).toMatch(/filterTracks\.map\(/);
  });

  it("marks always-visible (food break / after party) entries in the DOM", () => {
    expect(source).toMatch(/data-always-visible/);
  });

  it("tags each timeline entry with its track via a data attribute instead of venue", () => {
    expect(source).toMatch(/data-track=/);
    expect(source).not.toMatch(/data-venue=/);
  });
});
