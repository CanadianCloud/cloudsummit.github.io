import { describe, it, expect } from "vitest";
import {
  venues,
  slots,
  sessions,
  fullWidthRows,
  gridHeaders,
  venueKeyText,
  dateLine,
  shortDateLine,
} from "./torontoSchedule";

describe("torontoSchedule - venues", () => {
  it("lists exactly the 7 grid lanes in order, workshops split into two rooms", () => {
    expect(venues.map((v) => v.id)).toEqual([
      "hackathon",
      "showcase",
      "community",
      "main",
      "aws",
      "workshops-1",
      "workshops-2",
    ]);
  });
});

describe("torontoSchedule - gridHeaders", () => {
  it("has 6 header groups, with Workshops spanning both workshop lanes", () => {
    expect(gridHeaders).toHaveLength(6);
    const workshopsHeader = gridHeaders.find((h) => h.label === "Workshops");
    expect(workshopsHeader?.span).toBe(2);
    gridHeaders
      .filter((h) => h.label !== "Workshops")
      .forEach((h) => expect(h.span).toBe(1));
  });
});

describe("torontoSchedule - slots", () => {
  it("runs 12:00 to 6:30 in 30-minute steps (14 markers) using short labels", () => {
    expect(slots).toHaveLength(14);
    expect(slots[0]).toBe("12:00");
    expect(slots[slots.length - 1]).toBe("6:30");
  });
});

describe("torontoSchedule - doors open", () => {
  it("Doors open at 12:00 on Community, Main, and AWS only", () => {
    const doorsOpen = sessions.filter((s) => s.title === "Doors open");
    expect(doorsOpen.map((s) => s.venue).sort()).toEqual([
      "aws",
      "community",
      "main",
    ]);
    doorsOpen.forEach((s) => {
      expect(s.start).toBe("12:00");
      expect(s.slots).toBe(1);
    });
  });
});

describe("torontoSchedule - keynotes", () => {
  it("Opening Keynote is at 1:00 with a KEYNOTE eyebrow", () => {
    const keynote = sessions.find(
      (s) => s.venue === "main" && s.kind === "keynote",
    );
    expect(keynote?.title).toBe("Opening Keynote");
    expect(keynote?.eyebrow).toBe("KEYNOTE");
    expect(keynote?.start).toBe("1:00");
  });

  it("AWS Keynote is at 1:30 with a KEYNOTE eyebrow", () => {
    const awsKeynote = sessions.find(
      (s) => s.venue === "aws" && s.kind === "keynote",
    );
    expect(awsKeynote?.title).toBe("AWS Keynote");
    expect(awsKeynote?.eyebrow).toBe("KEYNOTE");
    expect(awsKeynote?.start).toBe("1:30");
  });
});

describe("torontoSchedule - Main Stage panel", () => {
  it("spans 2:00-3:00 (60 minutes, 2 slots)", () => {
    const panel = sessions.find((s) => s.kind === "panel");
    expect(panel?.title).toBe("AI Agents — can we trust them?");
    expect(panel?.eyebrow).toBe("PANEL · 60 MIN");
    expect(panel?.venue).toBe("main");
    expect(panel?.start).toBe("2:00");
    expect(panel?.end).toBe("3:00");
    expect(panel?.slots).toBe(2);
  });
});

describe("torontoSchedule - hackathon", () => {
  it("Round 1 is at 2:00 and the Elimination Round is at 3:30, both on the Basement stage", () => {
    const rounds = sessions
      .filter((s) => s.kind === "hackathon-round")
      .sort((a, b) => a.startMinutes - b.startMinutes);
    expect(rounds.map((r) => r.title)).toEqual([
      "Hackathon Round 1",
      "Hackathon Elimination Round",
    ]);
    expect(rounds.map((r) => r.eyebrow)).toEqual(["ROUND 1", "ELIMINATION"]);
    expect(rounds.map((r) => r.start)).toEqual(["2:00", "3:30"]);
    rounds.forEach((r) => expect(r.venue).toBe("hackathon"));
  });

  it("the Final happens on the Main Stage at 5:00 but flips to the Hackathon track/eyebrow", () => {
    const final = sessions.find((s) => s.kind === "hackathon-final");
    expect(final?.venue).toBe("main");
    expect(final?.track).toBe("hackathon");
    expect(final?.title).toBe("Hackathon Final");
    expect(final?.eyebrow).toBe("FINAL");
    expect(final?.start).toBe("5:00");
  });
});

describe("torontoSchedule - workshops", () => {
  it("Room 1 runs 2:00-3:30 in lane workshops-1", () => {
    const room1 = sessions.find((s) => s.id === "workshop-room-1");
    expect(room1?.venue).toBe("workshops-1");
    expect(room1?.start).toBe("2:00");
    expect(room1?.end).toBe("3:30");
  });

  it("Room 2 runs 3:30-5:00 in lane workshops-1, right after Room 1", () => {
    const room2 = sessions.find((s) => s.id === "workshop-room-2");
    expect(room2?.venue).toBe("workshops-1");
    expect(room2?.start).toBe("3:30");
    expect(room2?.end).toBe("5:00");
  });

  it("AWS Workshop + AWS Jam runs 2:00-4:30 in lane workshops-2 and notes it runs through the food break", () => {
    const awsWorkshop = sessions.find((s) => s.id === "workshop-aws");
    expect(awsWorkshop?.venue).toBe("workshops-2");
    expect(awsWorkshop?.start).toBe("2:00");
    expect(awsWorkshop?.end).toBe("4:30");
    expect(awsWorkshop?.subtext).toBe("Runs through food break");
  });

  it("no longer has the flagged 'AWS Jam on Level 5 Starts' note session", () => {
    expect(
      sessions.find((s) => s.title === "AWS Jam on Level 5 Starts"),
    ).toBeUndefined();
  });
});

describe("torontoSchedule - after party", () => {
  it("is a full-width banner at 6:30 across all 7 lanes, not a session", () => {
    expect(sessions.find((s) => s.title.startsWith("After"))).toBeUndefined();
    const afterParty = fullWidthRows.find((r) => r.id === "after-party");
    expect(afterParty?.title).toBe("After Party");
    expect(afterParty?.start).toBe("6:30");
    expect(afterParty?.variant).toBe("accent");
    expect(afterParty?.venues).toHaveLength(7);
  });
});

describe("torontoSchedule - full-width rows", () => {
  it("has exactly 3 full-width rows: food break, event conclusion, after party", () => {
    expect(fullWidthRows).toHaveLength(3);
    expect(fullWidthRows.map((r) => r.id)).toEqual([
      "food-break",
      "event-conclusion",
      "after-party",
    ]);
  });

  it("Hot Food Break at 3:00 spans every venue except the workshop lanes", () => {
    const foodBreak = fullWidthRows.find((r) => r.id === "food-break");
    expect(foodBreak?.start).toBe("3:00");
    expect(foodBreak?.end).toBe("3:30");
    expect(foodBreak?.variant).toBe("food");
    expect(foodBreak?.venues).toEqual([
      "hackathon",
      "showcase",
      "community",
      "main",
      "aws",
    ]);
  });

  it("Event Conclusion at 6:00 spans all 7 lanes", () => {
    const conclusion = fullWidthRows.find((r) => r.id === "event-conclusion");
    expect(conclusion?.start).toBe("6:00");
    expect(conclusion?.end).toBe("6:30");
    expect(conclusion?.variant).toBe("neutral");
    expect(conclusion?.venues).toHaveLength(7);
  });
});

describe("torontoSchedule - overflow live streams", () => {
  it("simulcasts the Main Stage on Basement, Community, and AWS during the opening remarks/keynote", () => {
    const streams = sessions.filter(
      (s) => s.kind === "stream" && s.start === "12:30",
    );
    expect(streams.map((s) => s.venue).sort()).toEqual([
      "aws",
      "community",
      "hackathon",
    ]);
    streams.forEach((s) => expect(s.end).toBe("1:30"));
  });
});

describe("torontoSchedule - venue key and date line", () => {
  it("exports the exact venue-key line text", () => {
    expect(venueKeyText).toBe(
      "3 stages + workshops across 5 levels + basement hackathon",
    );
  });

  it("exports the updated date line and a short mobile date line", () => {
    expect(dateLine).toBe(
      "Saturday, August 29 2026 · 12:00pm – 6:00pm · After party 6:30pm",
    );
    expect(shortDateLine).toBe("Sat Aug 29 · 12–6pm");
  });
});
