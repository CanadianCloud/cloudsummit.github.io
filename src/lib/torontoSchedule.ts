// Cloud Summit Toronto — Aug 29, 2026 — Full Event Schedule (Issue #176)
// Transcribed from the official event-schedule table provided by Matt.
// Two cells were fragmentary in the source table ("AWS Jam on Level 5 Starts"
// at 2:00pm followed by "Cloud" at 2:30pm and "Workshop Level 2" at 3:00pm);
// they're reconstructed here as "Cloud Workshop Level 2" spanning 2:30-3:30pm,
// matching the same "<title>" + "(cont.)" pattern used for Cloud Workshop
// Level 3. Flag to Matt if that reconstruction is wrong.

export type VenueId =
  | "hackathon"
  | "showcase"
  | "community"
  | "main"
  | "aws"
  | "workshops";

export type Track = VenueId | "food";

export type SessionKind =
  | "doors-open"
  | "welcome"
  | "keynote"
  | "talk"
  | "panel"
  | "stream"
  | "break"
  | "showcase"
  | "hackathon-round"
  | "hackathon-transition"
  | "hackathon-final"
  | "wrap-up"
  | "after-party"
  | "workshop"
  | "workshop-note";

export interface Venue {
  id: VenueId;
  label: string;
}

export interface Session {
  id: string;
  venue: VenueId;
  track: Track;
  kind: SessionKind;
  title: string;
  start: string;
  end: string;
  startMinutes: number;
  endMinutes: number;
  slots: number;
  badges: string[];
}

export interface FullWidthRow {
  id: string;
  title: string;
  start: string;
  end: string;
  startMinutes: number;
  endMinutes: number;
  /** Venues (in grid-column order) this banner row visually covers. */
  venues: VenueId[];
}

export interface LegendEntry {
  track: Track;
  label: string;
  color: string;
  fallback: string;
}

const SLOT_MINUTES = 30;
const EVENT_START_MINUTES = 12 * 60; // 12:00 PM
const EVENT_END_MINUTES = 18 * 60 + 30; // 6:30 PM

export { EVENT_START_MINUTES, EVENT_END_MINUTES, SLOT_MINUTES };

/** Formats minutes-since-midnight as "12:00 PM" / "6:30 PM" etc. */
function formatMinutes(totalMinutes: number): string {
  const hour24 = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minuteStr = minute === 0 ? "00" : String(minute).padStart(2, "0");
  return `${hour12}:${minuteStr} ${period}`;
}

export const slots: string[] = (() => {
  const out: string[] = [];
  for (
    let m = EVENT_START_MINUTES;
    m <= EVENT_END_MINUTES;
    m += SLOT_MINUTES
  ) {
    out.push(formatMinutes(m));
  }
  return out;
})();

export const venues: Venue[] = [
  { id: "hackathon", label: "Basement · Hackathon" },
  { id: "showcase", label: "L2 · Showcase" },
  { id: "community", label: "L3 · Community Stage" },
  { id: "main", label: "L4 · Main Stage" },
  { id: "aws", label: "L5 · AWS Stage" },
  { id: "workshops", label: "Workshops" },
];

interface SessionInput {
  id: string;
  venue: VenueId;
  track: Track;
  kind: SessionKind;
  title: string;
  startMinutes: number;
  durationMinutes: number;
  badges?: string[];
}

function buildSession(input: SessionInput): Session {
  const endMinutes = input.startMinutes + input.durationMinutes;
  return {
    id: input.id,
    venue: input.venue,
    track: input.track,
    kind: input.kind,
    title: input.title,
    start: formatMinutes(input.startMinutes),
    end: formatMinutes(endMinutes),
    startMinutes: input.startMinutes,
    endMinutes,
    slots: input.durationMinutes / SLOT_MINUTES,
    badges: input.badges ?? [],
  };
}

const rawSessions: SessionInput[] = [
  // Basement · Hackathon
  {
    id: "hackathon-1",
    venue: "hackathon",
    track: "hackathon",
    kind: "break",
    title: "Drinks & Snacks",
    startMinutes: 12 * 60,
    durationMinutes: 30,
  },
  {
    id: "hackathon-2",
    venue: "hackathon",
    track: "hackathon",
    kind: "stream",
    title: "Overflow live stream of Main Stage",
    startMinutes: 12 * 60 + 30,
    durationMinutes: 60,
    badges: ["LIVE"],
  },
  {
    id: "hackathon-3",
    venue: "hackathon",
    track: "hackathon",
    kind: "break",
    title: "Drinks & Snacks",
    startMinutes: 13 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "hackathon-4",
    venue: "hackathon",
    track: "hackathon",
    kind: "hackathon-round",
    title: "Hackathon Round 1 Live on Stage",
    startMinutes: 14 * 60,
    durationMinutes: 30,
    badges: ["LIVE"],
  },
  {
    id: "hackathon-5",
    venue: "hackathon",
    track: "hackathon",
    kind: "break",
    title: "Drinks & Snacks",
    startMinutes: 14 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "hackathon-6",
    venue: "hackathon",
    track: "hackathon",
    kind: "hackathon-round",
    title: "Hackathon Round 2 Elimination Live on Stage",
    startMinutes: 15 * 60 + 30,
    durationMinutes: 30,
    badges: ["LIVE"],
  },
  {
    id: "hackathon-7",
    venue: "hackathon",
    track: "hackathon",
    kind: "break",
    title: "Drinks & Snacks",
    startMinutes: 16 * 60,
    durationMinutes: 60,
  },
  {
    id: "hackathon-8",
    venue: "hackathon",
    track: "hackathon",
    kind: "hackathon-transition",
    title: "Hackathon moves to Level 4 Main Stage",
    startMinutes: 17 * 60,
    durationMinutes: 30,
  },

  // L2 · Showcase
  {
    id: "showcase-1",
    venue: "showcase",
    track: "showcase",
    kind: "showcase",
    title: "Showcase Space Opens",
    startMinutes: 13 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "showcase-2",
    venue: "showcase",
    track: "showcase",
    kind: "showcase",
    title: "Showcase",
    startMinutes: 14 * 60,
    durationMinutes: 60,
  },
  {
    id: "showcase-3",
    venue: "showcase",
    track: "showcase",
    kind: "showcase",
    title: "Showcase",
    startMinutes: 15 * 60 + 30,
    durationMinutes: 120,
  },

  // L3 · Community Stage
  {
    id: "community-1",
    venue: "community",
    track: "community",
    kind: "doors-open",
    title: "Doors Open",
    startMinutes: 12 * 60,
    durationMinutes: 30,
  },
  {
    id: "community-2",
    venue: "community",
    track: "community",
    kind: "stream",
    title: "Overflow live stream of Main Stage",
    startMinutes: 12 * 60 + 30,
    durationMinutes: 60,
    badges: ["LIVE"],
  },
  {
    id: "community-3",
    venue: "community",
    track: "community",
    kind: "talk",
    title: "Community Stage Talk",
    startMinutes: 13 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "community-4",
    venue: "community",
    track: "community",
    kind: "talk",
    title: "Community Stage Talk",
    startMinutes: 14 * 60,
    durationMinutes: 30,
  },
  {
    id: "community-5",
    venue: "community",
    track: "community",
    kind: "talk",
    title: "Community Stage Talk",
    startMinutes: 14 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "community-6",
    venue: "community",
    track: "community",
    kind: "talk",
    title: "Community Stage Talk",
    startMinutes: 15 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "community-7",
    venue: "community",
    track: "community",
    kind: "talk",
    title: "Community Stage Talk",
    startMinutes: 16 * 60,
    durationMinutes: 30,
  },
  {
    id: "community-8",
    venue: "community",
    track: "community",
    kind: "talk",
    title: "Community Stage Talk",
    startMinutes: 16 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "community-9",
    venue: "community",
    track: "community",
    kind: "stream",
    title: "Overflow live stream of Main Stage",
    startMinutes: 17 * 60,
    durationMinutes: 60,
    badges: ["LIVE"],
  },

  // L4 · Main Stage
  {
    id: "main-1",
    venue: "main",
    track: "main",
    kind: "doors-open",
    title: "Doors Open",
    startMinutes: 12 * 60,
    durationMinutes: 30,
  },
  {
    id: "main-2",
    venue: "main",
    track: "main",
    kind: "welcome",
    title: "Main Stage: Welcome Remarks",
    startMinutes: 12 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-3",
    venue: "main",
    track: "main",
    kind: "keynote",
    title: "Keynote",
    startMinutes: 13 * 60,
    durationMinutes: 30,
    badges: ["KEYNOTE"],
  },
  {
    id: "main-4",
    venue: "main",
    track: "main",
    kind: "talk",
    title: "Main Stage Talk",
    startMinutes: 13 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-5",
    venue: "main",
    track: "main",
    kind: "panel",
    title: "Panel: AI Agents, can we trust them?",
    startMinutes: 14 * 60,
    durationMinutes: 60,
    badges: ["PANEL · 60 MIN"],
  },
  {
    id: "main-6",
    venue: "main",
    track: "main",
    kind: "talk",
    title: "Main Stage Talk",
    startMinutes: 15 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-7",
    venue: "main",
    track: "main",
    kind: "talk",
    title: "Main Stage Talk",
    startMinutes: 16 * 60,
    durationMinutes: 30,
  },
  {
    id: "main-8",
    venue: "main",
    track: "main",
    kind: "talk",
    title: "Main Stage Talk",
    startMinutes: 16 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-9",
    venue: "main",
    track: "main",
    kind: "hackathon-final",
    title: "Hackathon Final Live on Main Stage",
    startMinutes: 17 * 60,
    durationMinutes: 30,
    badges: ["LIVE FINAL"],
  },
  {
    id: "main-10",
    venue: "main",
    track: "main",
    kind: "wrap-up",
    title: "Event Wrap-Up on Main Stage",
    startMinutes: 17 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-11",
    venue: "main",
    track: "main",
    kind: "after-party",
    title: "After-party starts at a nearby location (5min walk from event)",
    startMinutes: 18 * 60 + 30,
    durationMinutes: 30,
  },

  // L5 · AWS Stage
  {
    id: "aws-1",
    venue: "aws",
    track: "aws",
    kind: "doors-open",
    title: "Doors Open",
    startMinutes: 12 * 60,
    durationMinutes: 30,
  },
  {
    id: "aws-2",
    venue: "aws",
    track: "aws",
    kind: "stream",
    title: "Overflow live stream of Main Stage",
    startMinutes: 12 * 60 + 30,
    durationMinutes: 60,
    badges: ["LIVE"],
  },
  {
    id: "aws-3",
    venue: "aws",
    track: "aws",
    kind: "keynote",
    title: "AWS Keynote",
    startMinutes: 13 * 60 + 30,
    durationMinutes: 30,
    badges: ["KEYNOTE"],
  },
  {
    id: "aws-4",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "AWS Stage Talk",
    startMinutes: 14 * 60,
    durationMinutes: 30,
  },
  {
    id: "aws-5",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "AWS Stage Talk",
    startMinutes: 14 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "aws-6",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "AWS Stage Talk",
    startMinutes: 15 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "aws-7",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "AWS Stage Talk",
    startMinutes: 16 * 60,
    durationMinutes: 30,
  },
  {
    id: "aws-8",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "AWS Stage Talk",
    startMinutes: 16 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "aws-9",
    venue: "aws",
    track: "aws",
    kind: "stream",
    title: "Overflow live stream of Main Stage",
    startMinutes: 17 * 60,
    durationMinutes: 60,
    badges: ["LIVE"],
  },

  // Workshops lane
  {
    id: "workshops-1",
    venue: "workshops",
    track: "workshops",
    kind: "workshop-note",
    title: "AWS Jam on Level 5 Starts",
    startMinutes: 14 * 60,
    durationMinutes: 30,
  },
  {
    id: "workshops-2",
    venue: "workshops",
    track: "workshops",
    kind: "workshop",
    title: "Cloud Workshop Level 2",
    startMinutes: 14 * 60 + 30,
    durationMinutes: 60,
  },
  {
    id: "workshops-3",
    venue: "workshops",
    track: "workshops",
    kind: "workshop",
    title: "Cloud Workshop Level 3",
    startMinutes: 15 * 60 + 30,
    durationMinutes: 90,
  },
];

export const sessions: Session[] = rawSessions.map(buildSession);

interface FullWidthRowInput {
  id: string;
  title: string;
  startMinutes: number;
  durationMinutes: number;
  venues: VenueId[];
}

const rawFullWidthRows: FullWidthRowInput[] = [
  {
    id: "food-break",
    title: "Hot Food Break",
    startMinutes: 15 * 60,
    durationMinutes: 30,
    // Workshops doesn't pause for the food break — Cloud Workshop Level 2
    // runs straight through this slot.
    venues: ["hackathon", "showcase", "community", "main", "aws"],
  },
  {
    id: "event-conclusion",
    title: "Event Conclusion",
    startMinutes: 18 * 60,
    durationMinutes: 30,
    venues: ["hackathon", "showcase", "community", "main", "aws", "workshops"],
  },
];

export const fullWidthRows: FullWidthRow[] = rawFullWidthRows.map((row) => {
  const endMinutes = row.startMinutes + row.durationMinutes;
  return {
    id: row.id,
    title: row.title,
    start: formatMinutes(row.startMinutes),
    end: formatMinutes(endMinutes),
    startMinutes: row.startMinutes,
    endMinutes,
    venues: row.venues,
  };
});

export const legend: LegendEntry[] = [
  { track: "main", label: "Main", color: "oklch(0.75 0.11 255)", fallback: "#5B8DEF" },
  { track: "community", label: "Community", color: "oklch(0.75 0.11 185)", fallback: "#3DC9B0" },
  { track: "aws", label: "AWS", color: "oklch(0.78 0.11 65)", fallback: "#E8A33D" },
  { track: "hackathon", label: "Hackathon", color: "oklch(0.76 0.12 310)", fallback: "#C86ADB" },
  { track: "workshops", label: "Workshops", color: "oklch(0.75 0.11 150)", fallback: "#4FC97A" },
  { track: "food", label: "Food", color: "oklch(0.8 0.1 95)", fallback: "#E0C24F" },
];

export const filterTracks: { id: VenueId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "main", label: "Main Stage" },
  { id: "community", label: "Community" },
  { id: "aws", label: "AWS" },
  { id: "hackathon", label: "Hackathon" },
  { id: "workshops", label: "Workshops" },
  { id: "showcase", label: "Showcase" },
];

export const venueKeyText =
  "3 stages + workshops across 5 levels + basement hackathon";

export const dateLine = "Saturday, August 29th, 2026 · 12:00 PM – 6:30 PM";
