import { describe, it, expect, afterEach } from "vitest";
import { getNowLinePosition } from "./scheduleNow";

describe("scheduleNow - only renders on event day (America/Toronto)", () => {
  it("returns null for dates that aren't Aug 29, 2026", () => {
    expect(getNowLinePosition(new Date("2026-08-28T18:00:00Z"))).toBeNull();
    expect(getNowLinePosition(new Date("2026-07-19T18:00:00Z"))).toBeNull();
  });

  it("returns null when the UTC calendar day is Aug 29 but the Toronto-local day is still Aug 28", () => {
    // 2026-08-29T02:00:00Z is 2026-08-28 22:00 in America/Toronto (EDT, UTC-4).
    expect(getNowLinePosition(new Date("2026-08-29T02:00:00Z"))).toBeNull();
  });
});

describe("scheduleNow - only renders within event hours", () => {
  it("returns null before 12:00pm Toronto time on event day", () => {
    // 15:00 UTC = 11:00 AM EDT
    expect(getNowLinePosition(new Date("2026-08-29T15:00:00Z"))).toBeNull();
  });

  it("returns null after 6:30pm Toronto time on event day", () => {
    // 23:00 UTC = 7:00 PM EDT
    expect(getNowLinePosition(new Date("2026-08-29T23:00:00Z"))).toBeNull();
  });
});

describe("scheduleNow - fractional slot position for known times", () => {
  it("12:00pm Toronto is position 0", () => {
    // 16:00 UTC = 12:00 PM EDT
    expect(getNowLinePosition(new Date("2026-08-29T16:00:00Z"))).toBe(0);
  });

  it("3:15pm Toronto is the midpoint of the 3:00pm slot (position 6.5)", () => {
    // 19:15 UTC = 3:15 PM EDT
    expect(getNowLinePosition(new Date("2026-08-29T19:15:00Z"))).toBe(6.5);
  });

  it("6:30pm Toronto is the final boundary (position 13), not null", () => {
    // 22:30 UTC = 6:30 PM EDT
    expect(getNowLinePosition(new Date("2026-08-29T22:30:00Z"))).toBe(13);
  });
});

describe("scheduleNow - timezone math is independent of the host machine's TZ", () => {
  const originalTz = process.env.TZ;

  afterEach(() => {
    process.env.TZ = originalTz;
  });

  it("returns the same position regardless of process.env.TZ", () => {
    const instant = new Date("2026-08-29T19:15:00Z");

    process.env.TZ = "Asia/Tokyo";
    const tokyoResult = getNowLinePosition(instant);

    process.env.TZ = "America/Los_Angeles";
    const laResult = getNowLinePosition(instant);

    process.env.TZ = "UTC";
    const utcResult = getNowLinePosition(instant);

    expect(tokyoResult).toBe(6.5);
    expect(laResult).toBe(6.5);
    expect(utcResult).toBe(6.5);
  });
});
