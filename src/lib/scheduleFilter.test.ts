import { describe, it, expect } from "vitest";
import {
  timelineEntries,
  groupByStartTime,
  filterByTrack,
  formatDuration,
} from "./scheduleFilter";
import { sessions, fullWidthRows } from "./torontoSchedule";

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

describe("scheduleFilter - filterByTrack", () => {
  it("'all' returns everything", () => {
    expect(filterByTrack("all", timelineEntries)).toHaveLength(
      timelineEntries.length,
    );
  });

  it("'aws' returns only AWS sessions plus the always-visible full-width rows", () => {
    const result = filterByTrack("aws", timelineEntries);
    const resultIds = new Set(result.map((e) => e.id));

    const awsSessionIds = sessions
      .filter((s) => s.venue === "aws")
      .map((s) => s.id);
    const fullWidthIds = fullWidthRows.map((r) => r.id);

    expect(resultIds.size).toBe(awsSessionIds.length + fullWidthIds.length);
    awsSessionIds.forEach((id) => expect(resultIds.has(id)).toBe(true));
    fullWidthIds.forEach((id) => expect(resultIds.has(id)).toBe(true));

    const otherVenueSession = sessions.find((s) => s.venue === "community");
    expect(resultIds.has(otherVenueSession!.id)).toBe(false);
  });

  (["main", "community", "hackathon", "workshops"] as const).forEach(
    (track) => {
      it(`'${track}' returns only that track's sessions plus the always-visible rows`, () => {
        const result = filterByTrack(track, timelineEntries);
        const resultIds = new Set(result.map((e) => e.id));

        const trackSessionIds = sessions
          .filter((s) => s.venue === track)
          .map((s) => s.id);
        const fullWidthIds = fullWidthRows.map((r) => r.id);

        expect(resultIds.size).toBe(
          trackSessionIds.length + fullWidthIds.length,
        );
        trackSessionIds.forEach((id) => expect(resultIds.has(id)).toBe(true));
        fullWidthIds.forEach((id) => expect(resultIds.has(id)).toBe(true));
      });
    },
  );
});

describe("scheduleFilter - duration labels", () => {
  it("formats known durations as 30m / 60m / 90m / 2.5h", () => {
    expect(formatDuration(30)).toBe("30m");
    expect(formatDuration(60)).toBe("60m");
    expect(formatDuration(90)).toBe("90m");
    expect(formatDuration(150)).toBe("2.5h");
  });

  it("computes the panel's duration label as 60m and the 90-minute workshop as 90m", () => {
    const panel = timelineEntries.find((e) => e.id === "main-5");
    const longWorkshop = timelineEntries.find((e) => e.id === "workshops-3");
    expect(panel?.durationLabel).toBe("60m");
    expect(longWorkshop?.durationLabel).toBe("90m");
  });
});
