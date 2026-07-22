import { describe, it, expect } from "vitest";
import {
  timelineEntries,
  groupByStartTime,
  filterByTrack,
  formatDuration,
} from "./scheduleFilter";

describe("scheduleFilter - groupByStartTime", () => {
  const groups = groupByStartTime(timelineEntries);

  it("returns groups in chronological order", () => {
    const startTimes = groups.map((g) => g.startMinutes);
    const sorted = [...startTimes].sort((a, b) => a - b);
    expect(startTimes).toEqual(sorted);
  });

  it("covers every timeline entry exactly once", () => {
    const idsInGroups = groups.flatMap((g) => g.entries.map((e) => e.id));
    expect(idsInGroups).toHaveLength(timelineEntries.length);
    expect(new Set(idsInGroups).size).toBe(timelineEntries.length);
    const expectedIds = new Set(timelineEntries.map((e) => e.id));
    idsInGroups.forEach((id) => expect(expectedIds.has(id)).toBe(true));
  });
});

describe("scheduleFilter - curation", () => {
  it("drops overflow streams, drink/snack breaks, and the hackathon-to-mainstage transition", () => {
    timelineEntries.forEach((entry) => {
      expect(entry.title).not.toMatch(/Overflow/i);
      expect(entry.title).not.toMatch(/Drinks/i);
      expect(entry.title).not.toMatch(/moves to Main Stage/i);
    });
  });

  it("synthesizes exactly one Doors open entry", () => {
    const doorsEntries = timelineEntries.filter((e) => e.title === "Doors open");
    expect(doorsEntries).toHaveLength(1);
    expect(doorsEntries[0].alwaysVisible).toBe(true);
    expect(doorsEntries[0].tag).toBe("Levels 3–5");
  });

  it("keeps only the first Showcase entry", () => {
    const showcaseEntries = timelineEntries.filter((e) => e.track === "showcase");
    expect(showcaseEntries).toHaveLength(1);
    expect(showcaseEntries[0].title).toBe("Showcase Space opens");
  });

  it("drops the Event Conclusion row but keeps food break and after party as always-visible", () => {
    expect(
      timelineEntries.find((e) => e.id === "event-conclusion"),
    ).toBeUndefined();

    const foodBreak = timelineEntries.find((e) => e.id === "food-break");
    const afterParty = timelineEntries.find((e) => e.id === "after-party");
    expect(foodBreak?.alwaysVisible).toBe(true);
    expect(afterParty?.alwaysVisible).toBe(true);
  });
});

describe("scheduleFilter - filterByTrack", () => {
  it("'all' returns everything", () => {
    expect(filterByTrack("all", timelineEntries)).toHaveLength(
      timelineEntries.length,
    );
  });

  it("'workshops' matches sessions from both workshop lanes (3 total)", () => {
    const result = filterByTrack("workshops", timelineEntries);
    const workshopSessions = result.filter((e) => e.track === "workshops");
    expect(workshopSessions).toHaveLength(3);
  });

  it("'hackathon' includes the Hackathon Final (track flipped from Main)", () => {
    const result = filterByTrack("hackathon", timelineEntries);
    expect(result.some((e) => e.id === "main-9")).toBe(true);
  });

  it("non-'all' filters always include the always-visible rows", () => {
    const result = filterByTrack("aws", timelineEntries);
    const alwaysVisibleIds = timelineEntries
      .filter((e) => e.alwaysVisible)
      .map((e) => e.id);
    alwaysVisibleIds.forEach((id) =>
      expect(result.some((e) => e.id === id)).toBe(true),
    );
  });

  it("excludes entries from other tracks", () => {
    const result = filterByTrack("aws", timelineEntries);
    const otherTrackEntry = timelineEntries.find(
      (e) => e.track === "community",
    );
    expect(result.some((e) => e.id === otherTrackEntry!.id)).toBe(false);
  });
});

describe("scheduleFilter - duration labels", () => {
  it("formats known durations as 30m / 60m / 90m / 2.5h", () => {
    expect(formatDuration(30)).toBe("30m");
    expect(formatDuration(60)).toBe("60m");
    expect(formatDuration(90)).toBe("90m");
    expect(formatDuration(150)).toBe("2.5h");
  });

  it("pins the two 90-minute room workshops and the 2.5h AWS workshop", () => {
    const room1 = timelineEntries.find((e) => e.id === "workshop-room-1");
    const room2 = timelineEntries.find((e) => e.id === "workshop-room-2");
    const awsWorkshop = timelineEntries.find((e) => e.id === "workshop-aws");
    expect(room1?.durationLabel).toBe("90m");
    expect(room2?.durationLabel).toBe("90m");
    expect(awsWorkshop?.durationLabel).toBe("2.5h");
  });
});
