// Cloud Summit Toronto — Aug 29, 2026 — Full Event Schedule (Issue #176)
// Restyled per design/design_handoff_cloud_summit_schedule; workshop timing
// corrected against schedule-extracted.txt (supersedes the earlier
// reconstructed "Cloud Workshop Level 2/3" guess).

export type VenueId =
  | "hackathon"
  | "showcase"
  | "main"
  | "aws"
  | "workshops-2";

export type Track =
  | "hackathon"
  | "showcase"
  | "main"
  | "aws"
  | "workshops"
  | "food";

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
  | "workshop";

export interface Venue {
  id: VenueId;
  label: string;
  /** Short location tag shown on the mobile timeline card. */
  timelineTag: string;
}

export interface GridHeader {
  label: string;
  /** Number of venue columns this header spans. */
  span: number;
  color: string;
  fallback: string;
}

export interface Speaker {
  name: string;
  role?: string;
  linkedIn?: string;
}

export interface Session {
  id: string;
  venue: VenueId;
  track: Track;
  kind: SessionKind;
  title: string;
  eyebrow?: string;
  subtext?: string;
  /** Overrides the venue's default timelineTag on the mobile card. */
  timelineTag?: string;
  speakers?: Speaker[];
  start: string;
  end: string;
  startMinutes: number;
  endMinutes: number;
  slots: number;
}

export interface FullWidthRow {
  id: string;
  title: string;
  subtext?: string;
  variant: "food" | "neutral" | "accent";
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

/** Formats minutes-since-midnight as the handoff's short "12:00" / "6:30" labels. */
function formatMinutes(totalMinutes: number): string {
  const hour24 = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minuteStr = minute === 0 ? "00" : String(minute).padStart(2, "0");
  return `${hour12}:${minuteStr}`;
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
  { id: "hackathon", label: "Basement · Hackathon", timelineTag: "Basement" },
  { id: "showcase", label: "L2 · Showcase", timelineTag: "Showcase · L2" },
  { id: "main", label: "L4 · Main Stage", timelineTag: "Main Stage · L4" },
  { id: "aws", label: "L3 · AWS Stage", timelineTag: "AWS Stage · L3" },
  { id: "workshops-2", label: "Workshops", timelineTag: "Workshops" },
];

export const gridHeaders: GridHeader[] = [
  { label: "Basement · Hackathon", span: 1, color: "oklch(0.76 0.12 310)", fallback: "#C86ADB" },
  { label: "L2 · Showcase", span: 1, color: "#98a2b5", fallback: "#98a2b5" },
  { label: "L4 · Main Stage", span: 1, color: "oklch(0.75 0.11 255)", fallback: "#5B8DEF" },
  { label: "L3 · AWS Stage", span: 1, color: "oklch(0.78 0.11 65)", fallback: "#E8A33D" },
  { label: "Workshops", span: 1, color: "oklch(0.75 0.11 150)", fallback: "#4FC97A" },
];

interface SessionInput {
  id: string;
  venue: VenueId;
  track: Track;
  kind: SessionKind;
  title: string;
  eyebrow?: string;
  subtext?: string;
  timelineTag?: string;
  speakers?: Speaker[];
  startMinutes: number;
  durationMinutes: number;
}

function buildSession(input: SessionInput): Session {
  const endMinutes = input.startMinutes + input.durationMinutes;
  return {
    id: input.id,
    venue: input.venue,
    track: input.track,
    kind: input.kind,
    title: input.title,
    eyebrow: input.eyebrow,
    subtext: input.subtext,
    timelineTag: input.timelineTag,
    speakers: input.speakers,
    start: formatMinutes(input.startMinutes),
    end: formatMinutes(endMinutes),
    startMinutes: input.startMinutes,
    endMinutes,
    slots: input.durationMinutes / SLOT_MINUTES,
  };
}

const rawSessions: SessionInput[] = [
  // Basement · Hackathon
  {
    id: "hackathon-1",
    venue: "hackathon",
    track: "hackathon",
    kind: "break",
    title: "Drinks & snacks",
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
  },
  {
    id: "hackathon-3",
    venue: "hackathon",
    track: "hackathon",
    kind: "break",
    title: "Drinks & snacks",
    startMinutes: 13 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "hackathon-4",
    venue: "hackathon",
    track: "hackathon",
    kind: "hackathon-round",
    title: "Hackathon Round 1",
    eyebrow: "ROUND 1",
    startMinutes: 14 * 60,
    durationMinutes: 30,
  },
  {
    id: "hackathon-5",
    venue: "hackathon",
    track: "hackathon",
    kind: "break",
    title: "Drinks & snacks",
    startMinutes: 14 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "hackathon-6",
    venue: "hackathon",
    track: "hackathon",
    kind: "hackathon-round",
    title: "Hackathon Elimination Round",
    eyebrow: "ELIMINATION",
    startMinutes: 15 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "hackathon-7",
    venue: "hackathon",
    track: "hackathon",
    kind: "break",
    title: "Drinks & snacks · hot food from 3pm",
    startMinutes: 16 * 60,
    durationMinutes: 60,
  },
  {
    id: "hackathon-8",
    venue: "hackathon",
    track: "hackathon",
    kind: "hackathon-transition",
    title: "Hackathon moves to Main Stage ↑",
    startMinutes: 17 * 60,
    durationMinutes: 30,
  },

  // L2 · Showcase
  {
    id: "showcase-1",
    venue: "showcase",
    track: "showcase",
    kind: "showcase",
    title: "Showcase Space opens",
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

  // L4 · Main Stage
  {
    id: "main-1",
    venue: "main",
    track: "main",
    kind: "doors-open",
    title: "Doors open",
    startMinutes: 12 * 60,
    durationMinutes: 30,
  },
  {
    id: "main-2",
    venue: "main",
    track: "main",
    kind: "welcome",
    title: "Welcome Remarks",
    startMinutes: 12 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-3",
    venue: "main",
    track: "main",
    kind: "keynote",
    title: "Opening Keynote",
    eyebrow: "KEYNOTE",
    startMinutes: 13 * 60,
    durationMinutes: 30,
  },
  {
    id: "main-4",
    venue: "main",
    track: "main",
    kind: "talk",
    title: "Gateway API Is The Fastest Path to Secure Cloud Based Applications",
    speakers: [{ name: "Reza Ramezanpour", linkedIn: "https://www.linkedin.com/in/rramezanpour/" }],
    startMinutes: 13 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-5",
    venue: "main",
    track: "main",
    kind: "panel",
    title: "AWS Frontier Agents",
    eyebrow: "PANEL · 60 MIN",
    speakers: [
      { name: "Avani Sharma", linkedIn: "https://www.linkedin.com/in/avanisharma130203/" },
      { name: "Archana Manohar", linkedIn: "https://www.linkedin.com/in/archanamanohar/" },
    ],
    startMinutes: 14 * 60,
    durationMinutes: 60,
  },
  {
    id: "main-6",
    venue: "main",
    track: "main",
    kind: "talk",
    title: "From Prompt to Pipeline: Building a Multi-Agent System in Azure AI Foundry with GitHub Copilot",
    speakers: [{ name: "Kaan Turgut", linkedIn: "https://www.linkedin.com/in/hkaanturgut/" }],
    startMinutes: 15 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-7",
    venue: "main",
    track: "main",
    kind: "talk",
    title: "Beyond Ingress: Mastering the Kubernetes Gateway API",
    speakers: [{ name: "Wolfgang Ofner", linkedIn: "https://www.linkedin.com/in/wolfgangofner" }],
    startMinutes: 16 * 60,
    durationMinutes: 30,
  },
  {
    id: "main-8",
    venue: "main",
    track: "main",
    kind: "talk",
    title: "Next-Gen Kubernetes Networking: Bypassing Kube-Proxy and Edge Bottlenecks with Cilium",
    speakers: [
      { name: "Marino Wijay", linkedIn: "https://www.linkedin.com/in/mwijay" },
      { name: "Rachel Leekin", linkedIn: "https://www.linkedin.com/in/rachel-leekin/" },
    ],
    startMinutes: 16 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "main-9",
    venue: "main",
    // Design flips the Final's track color to Hackathon — it stays a
    // Main Stage session but joins the Hackathon chip, not Main Stage's.
    track: "hackathon",
    kind: "hackathon-final",
    title: "Hackathon Final",
    eyebrow: "FINAL",
    startMinutes: 17 * 60,
    durationMinutes: 30,
  },
  {
    id: "main-10",
    venue: "main",
    track: "main",
    kind: "wrap-up",
    title: "Event Wrap-Up",
    startMinutes: 17 * 60 + 30,
    durationMinutes: 30,
  },

  // L3 · AWS Stage
  {
    id: "aws-1",
    venue: "aws",
    track: "aws",
    kind: "doors-open",
    title: "Doors open",
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
  },
  {
    id: "aws-3",
    venue: "aws",
    track: "aws",
    kind: "keynote",
    title: "AWS Keynote",
    eyebrow: "KEYNOTE",
    speakers: [
      {
        name: "Milad Kayali",
        role: "Head of Canada Enterprise Industry Solutions Architecture, AWS",
        linkedIn: "https://www.linkedin.com/in/miladkayali/",
      },
    ],
    startMinutes: 13 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "aws-4",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "Your Pods Can Think Now: AI-Augmented Workloads on EKS with Amazon Bedrock",
    speakers: [{ name: "Kriti Bhandari", linkedIn: "https://www.linkedin.com/in/kritibhandari/" }],
    startMinutes: 14 * 60,
    durationMinutes: 30,
  },
  {
    id: "aws-5",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "Agents Are the New Microservices Problem",
    speakers: [{ name: "Rohini Gaonkar", linkedIn: "https://www.linkedin.com/in/rohinigaonkar/" }],
    startMinutes: 14 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "aws-6",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "Building a Personal Knowledge Graph: How Amazon Quick Remembers Everything",
    speakers: [{ name: "Hetvi Parsana", linkedIn: "https://www.linkedin.com/in/hetvi-parsana" }],
    startMinutes: 15 * 60 + 30,
    durationMinutes: 30,
  },
  {
    id: "aws-7",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "A Company AI Brain That Curates Itself",
    speakers: [{ name: "Brett Gillett", linkedIn: "https://www.linkedin.com/in/brettgillett/" }],
    startMinutes: 16 * 60,
    durationMinutes: 30,
  },
  {
    id: "aws-8",
    venue: "aws",
    track: "aws",
    kind: "talk",
    title: "Security at Machine Speed: Introducing AWS Continuum",
    speakers: [{ name: "Ashwin Bhargava", linkedIn: "https://www.linkedin.com/in/ashwinbh/" }],
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
  },

  // Workshops
  {
    id: "workshop-aws",
    venue: "workshops-2",
    track: "workshops",
    kind: "workshop",
    title: "AWS Workshop + AWS Jam",
    eyebrow: "2:00–4:30",
    subtext: "Runs through food break",
    timelineTag: "Workshops",
    startMinutes: 14 * 60,
    durationMinutes: 150,
  },
];

export const sessions: Session[] = rawSessions.map(buildSession);

interface FullWidthRowInput {
  id: string;
  title: string;
  subtext?: string;
  variant: "food" | "neutral" | "accent";
  startMinutes: number;
  durationMinutes: number;
  venues: VenueId[];
}

const rawFullWidthRows: FullWidthRowInput[] = [
  {
    id: "food-break",
    title: "Hot Food Break",
    subtext: "all stages pause · hot food in the Basement · workshops continue",
    variant: "food",
    startMinutes: 15 * 60,
    durationMinutes: 30,
    venues: ["hackathon", "showcase", "main", "aws"],
  },
  {
    id: "event-conclusion",
    title: "Event Conclusion",
    subtext: "Event conclusion — all levels",
    variant: "neutral",
    startMinutes: 18 * 60,
    durationMinutes: 30,
    venues: [
      "hackathon",
      "showcase",
      "main",
      "aws",
      "workshops-2",
    ],
  },
  {
    id: "after-party",
    title: "After Party",
    subtext: "After Party from 6:30pm · 5-minute walk from venue",
    variant: "accent",
    startMinutes: 18 * 60 + 30,
    durationMinutes: 30,
    venues: [
      "hackathon",
      "showcase",
      "main",
      "aws",
      "workshops-2",
    ],
  },
];

export const fullWidthRows: FullWidthRow[] = rawFullWidthRows.map((row) => {
  const endMinutes = row.startMinutes + row.durationMinutes;
  return {
    id: row.id,
    title: row.title,
    subtext: row.subtext,
    variant: row.variant,
    start: formatMinutes(row.startMinutes),
    end: formatMinutes(endMinutes),
    startMinutes: row.startMinutes,
    endMinutes,
    venues: row.venues,
  };
});

export const legend: LegendEntry[] = [
  { track: "main", label: "Main", color: "oklch(0.75 0.11 255)", fallback: "#5B8DEF" },
  { track: "aws", label: "AWS", color: "oklch(0.78 0.11 65)", fallback: "#E8A33D" },
  { track: "hackathon", label: "Hackathon", color: "oklch(0.76 0.12 310)", fallback: "#C86ADB" },
  { track: "workshops", label: "Workshops", color: "oklch(0.75 0.11 150)", fallback: "#4FC97A" },
  { track: "food", label: "Food", color: "oklch(0.8 0.1 95)", fallback: "#E0C24F" },
];

export const filterTracks: { id: Track | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "main", label: "Main Stage" },
  { id: "aws", label: "AWS" },
  { id: "hackathon", label: "Hackathon" },
  { id: "workshops", label: "Workshops" },
  { id: "showcase", label: "Showcase" },
];

export const venueKeyText =
  "2 stages + workshops across 5 levels + basement hackathon";

export const dateLine =
  "Saturday, August 29 2026 · 12:00pm – 6:00pm · After party 6:30pm";

export const shortDateLine = "Sat Aug 29 · 12–6pm";
