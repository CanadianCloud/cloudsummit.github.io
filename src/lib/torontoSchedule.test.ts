import { describe, it, expect } from "vitest";
import {
  venues,
  slots,
  sessions,
  fullWidthRows,
  venueKeyText,
} from "./torontoSchedule";

describe("torontoSchedule - venues", () => {
  it("lists exactly the 6 Figma venue columns in order", () => {
    expect(venues.map((v) => v.id)).toEqual([
      "hackathon",
      "showcase",
      "community",
      "main",
      "aws",
      "workshops",
    ]);
    expect(venues.map((v) => v.label)).toEqual([
      "Basement · Hackathon",
      "L2 · Showcase",
      "L3 · Community Stage",
      "L4 · Main Stage",
      "L5 · AWS Stage",
      "Workshops",
    ]);
  });
});

describe("torontoSchedule - slots", () => {
  it("runs 12:00pm to 6:30pm in 30-minute steps (14 markers)", () => {
    expect(slots).toHaveLength(14);
    expect(slots[0]).toBe("12:00 PM");
    expect(slots[slots.length - 1]).toBe("6:30 PM");
  });
});

describe("torontoSchedule - doors open", () => {
  it("Doors Open at 12:00pm on Community, Main, and AWS only", () => {
    const doorsOpen = sessions.filter((s) => s.title === "Doors Open");
    expect(doorsOpen.map((s) => s.venue).sort()).toEqual([
      "aws",
      "community",
      "main",
    ]);
    doorsOpen.forEach((s) => {
      expect(s.start).toBe("12:00 PM");
      expect(s.slots).toBe(1);
    });
  });
});

describe("torontoSchedule - keynotes", () => {
  it("Main Stage Keynote is at 1:00pm", () => {
    const keynote = sessions.find(
      (s) => s.venue === "main" && s.kind === "keynote",
    );
    expect(keynote?.title).toBe("Keynote");
    expect(keynote?.start).toBe("1:00 PM");
  });

  it("AWS Keynote is at 1:30pm", () => {
    const awsKeynote = sessions.find(
      (s) => s.venue === "aws" && s.kind === "keynote",
    );
    expect(awsKeynote?.title).toBe("AWS Keynote");
    expect(awsKeynote?.start).toBe("1:30 PM");
  });
});

describe("torontoSchedule - Main Stage panel", () => {
  it("spans 2:00pm-3:00pm (60 minutes, 2 slots)", () => {
    const panel = sessions.find((s) => s.kind === "panel");
    expect(panel?.title).toBe("Panel: AI Agents, can we trust them?");
    expect(panel?.venue).toBe("main");
    expect(panel?.start).toBe("2:00 PM");
    expect(panel?.end).toBe("3:00 PM");
    expect(panel?.slots).toBe(2);
  });
});

describe("torontoSchedule - hackathon", () => {
  it("Round 1 is at 2:00pm and Round 2 (Elimination) is at 3:30pm, both live on the Basement stage", () => {
    const rounds = sessions
      .filter((s) => s.kind === "hackathon-round")
      .sort((a, b) => a.startMinutes - b.startMinutes);
    expect(rounds.map((r) => r.title)).toEqual([
      "Hackathon Round 1 Live on Stage",
      "Hackathon Round 2 Elimination Live on Stage",
    ]);
    expect(rounds.map((r) => r.start)).toEqual(["2:00 PM", "3:30 PM"]);
    rounds.forEach((r) => {
      expect(r.venue).toBe("hackathon");
      expect(r.badges).toContain("LIVE");
    });
  });

  it("the Final happens live on the Main Stage at 5:00pm, not on the Basement venue", () => {
    const final = sessions.find((s) => s.kind === "hackathon-final");
    expect(final?.venue).toBe("main");
    expect(final?.title).toBe("Hackathon Final Live on Main Stage");
    expect(final?.start).toBe("5:00 PM");
    expect(final?.badges).toContain("LIVE FINAL");
  });
});

describe("torontoSchedule - workshops", () => {
  it("Cloud Workshop Level 2 runs 2:30pm-3:30pm (60 minutes)", () => {
    const w2 = sessions.find((s) => s.title === "Cloud Workshop Level 2");
    expect(w2?.venue).toBe("workshops");
    expect(w2?.start).toBe("2:30 PM");
    expect(w2?.end).toBe("3:30 PM");
  });

  it("Cloud Workshop Level 3 runs 3:30pm-5:00pm (90 minutes)", () => {
    const w3 = sessions.find((s) => s.title === "Cloud Workshop Level 3");
    expect(w3?.venue).toBe("workshops");
    expect(w3?.start).toBe("3:30 PM");
    expect(w3?.end).toBe("5:00 PM");
  });
});

describe("torontoSchedule - after party", () => {
  it("is a Main Stage-only session at 6:30pm, not a full-width row", () => {
    const afterParty = sessions.find((s) => s.kind === "after-party");
    expect(afterParty?.venue).toBe("main");
    expect(afterParty?.start).toBe("6:30 PM");
    expect(afterParty?.title).toBe(
      "After-party starts at a nearby location (5min walk from event)",
    );
    expect(fullWidthRows.find((r) => r.title === "After Party")).toBeUndefined();
  });
});

describe("torontoSchedule - full-width rows", () => {
  it("Hot Food Break at 3:00pm spans every venue except Workshops", () => {
    const foodBreak = fullWidthRows.find((r) => r.title === "Hot Food Break");
    expect(foodBreak?.start).toBe("3:00 PM");
    expect(foodBreak?.end).toBe("3:30 PM");
    expect(foodBreak?.venues).toEqual([
      "hackathon",
      "showcase",
      "community",
      "main",
      "aws",
    ]);
  });

  it("Event Conclusion at 6:00pm spans all 6 venues", () => {
    const conclusion = fullWidthRows.find(
      (r) => r.title === "Event Conclusion",
    );
    expect(conclusion?.start).toBe("6:00 PM");
    expect(conclusion?.end).toBe("6:30 PM");
    expect(conclusion?.venues).toEqual([
      "hackathon",
      "showcase",
      "community",
      "main",
      "aws",
      "workshops",
    ]);
  });

  it("has exactly 2 full-width rows", () => {
    expect(fullWidthRows).toHaveLength(2);
  });
});

describe("torontoSchedule - overflow live streams", () => {
  it("simulcasts the Main Stage on Basement, Community, and AWS during the opening remarks/keynote", () => {
    const streams = sessions.filter(
      (s) => s.kind === "stream" && s.start === "12:30 PM",
    );
    expect(streams.map((s) => s.venue).sort()).toEqual([
      "aws",
      "community",
      "hackathon",
    ]);
    streams.forEach((s) => {
      expect(s.end).toBe("1:30 PM");
      expect(s.badges).toContain("LIVE");
    });
  });
});

describe("torontoSchedule - venue key", () => {
  it("exports the exact venue-key line text", () => {
    expect(venueKeyText).toBe(
      "3 stages + workshops across 5 levels + basement hackathon",
    );
  });
});
