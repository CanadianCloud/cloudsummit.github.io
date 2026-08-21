import {
  sessions,
  fullWidthRows,
  venues,
  EVENT_START_MINUTES,
  SLOT_MINUTES,
  type Session,
  type FullWidthRow,
  type Track,
} from "./torontoSchedule";

export interface TimelineEntry {
  id: string;
  title: string;
  start: string;
  startMinutes: number;
  end: string;
  endMinutes: number;
  track: Track | null;
  tag: string;
  styleClass: string;
  alwaysVisible: boolean;
  durationLabel: string;
}

export interface TimelineGroup {
  start: string;
  startMinutes: number;
  entries: TimelineEntry[];
}

export type TrackFilter = Track | "all";

/** Renders minute durations as the site's badge format: 30m / 60m / 90m / 2.5h. */
export function formatDuration(minutes: number): string {
  if (minutes < 120) return `${minutes}m`;
  return `${minutes / 60}h`;
}

const venueById = new Map(venues.map((v) => [v.id, v]));

/** Session kinds the curated mobile timeline never shows. */
const EXCLUDED_KINDS = new Set<Session["kind"]>([
  "stream",
  "break",
  "hackathon-transition",
  "doors-open",
]);

function styleClassForTrack(track: Track): string {
  return track === "showcase" ? "neutral" : track;
}

function fromSession(session: Session): TimelineEntry {
  const venue = venueById.get(session.venue);
  return {
    id: session.id,
    title: session.title,
    start: session.start,
    startMinutes: session.startMinutes,
    end: session.end,
    endMinutes: session.endMinutes,
    track: session.track,
    tag: session.timelineTag ?? venue?.timelineTag ?? "",
    styleClass: styleClassForTrack(session.track),
    alwaysVisible: false,
    durationLabel: formatDuration(session.endMinutes - session.startMinutes),
  };
}

/** Per-row copy/tag overrides for the mobile timeline; rows not listed here are dropped. */
const ROW_OVERRIDES: Record<
  string,
  { title: string; tag: string; styleClass: string; durationLabel?: string }
> = {
  "food-break": {
    title: "Hot Food Break — all stages pause",
    tag: "Basement",
    styleClass: "food",
  },
  "after-party": {
    title: "After Party — 5-min walk from venue",
    tag: "Offsite",
    styleClass: "neutral",
    durationLabel: "",
  },
};

function fromFullWidthRow(row: FullWidthRow): TimelineEntry | null {
  const override = ROW_OVERRIDES[row.id];
  if (!override) return null;
  return {
    id: row.id,
    title: override.title,
    start: row.start,
    startMinutes: row.startMinutes,
    end: row.end,
    endMinutes: row.endMinutes,
    track: null,
    tag: override.tag,
    styleClass: override.styleClass,
    alwaysVisible: true,
    durationLabel:
      override.durationLabel ??
      formatDuration(row.endMinutes - row.startMinutes),
  };
}

function buildDoorsOpenEntry(): TimelineEntry {
  const anyDoors = sessions.find((s) => s.kind === "doors-open");
  const startMinutes = anyDoors?.startMinutes ?? EVENT_START_MINUTES;
  const endMinutes = anyDoors?.endMinutes ?? EVENT_START_MINUTES + SLOT_MINUTES;
  return {
    id: "doors-open",
    title: "Doors open",
    start: anyDoors?.start ?? "12:00",
    startMinutes,
    end: anyDoors?.end ?? "12:30",
    endMinutes,
    track: null,
    tag: "Levels 3–4",
    styleClass: "neutral",
    alwaysVisible: true,
    durationLabel: formatDuration(endMinutes - startMinutes),
  };
}

export function buildTimelineEntries(): TimelineEntry[] {
  const showcaseSessions = sessions
    .filter((s) => s.track === "showcase")
    .sort((a, b) => a.startMinutes - b.startMinutes);
  const firstShowcaseId = showcaseSessions[0]?.id;

  const sessionEntries = sessions
    .filter((session) => {
      if (EXCLUDED_KINDS.has(session.kind)) return false;
      if (session.track === "showcase" && session.id !== firstShowcaseId) {
        return false;
      }
      return true;
    })
    .map(fromSession);

  const rowEntries = fullWidthRows
    .map(fromFullWidthRow)
    .filter((entry): entry is TimelineEntry => entry !== null);

  return [buildDoorsOpenEntry(), ...sessionEntries, ...rowEntries];
}

export const timelineEntries: TimelineEntry[] = buildTimelineEntries();

export function groupByStartTime(entries: TimelineEntry[]): TimelineGroup[] {
  const byStart = new Map<number, TimelineGroup>();
  for (const entry of entries) {
    let group = byStart.get(entry.startMinutes);
    if (!group) {
      group = {
        start: entry.start,
        startMinutes: entry.startMinutes,
        entries: [],
      };
      byStart.set(entry.startMinutes, group);
    }
    group.entries.push(entry);
  }
  return [...byStart.values()].sort((a, b) => a.startMinutes - b.startMinutes);
}

export function filterByTrack(
  track: TrackFilter,
  entries: TimelineEntry[],
): TimelineEntry[] {
  if (track === "all") return entries;
  return entries.filter(
    (entry) => entry.alwaysVisible || entry.track === track,
  );
}
