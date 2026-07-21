import {
  sessions,
  fullWidthRows,
  type Session,
  type FullWidthRow,
  type VenueId,
} from "./torontoSchedule";

export interface TimelineEntry {
  id: string;
  title: string;
  start: string;
  startMinutes: number;
  end: string;
  endMinutes: number;
  venue: VenueId | null;
  badges: string[];
  alwaysVisible: boolean;
  durationLabel: string;
}

export interface TimelineGroup {
  start: string;
  startMinutes: number;
  entries: TimelineEntry[];
}

export type TrackFilter = VenueId | "all";

/** Renders minute durations as the site's badge format: 30m / 60m / 90m / 2.5h. */
export function formatDuration(minutes: number): string {
  if (minutes < 120) return `${minutes}m`;
  return `${minutes / 60}h`;
}

function fromSession(session: Session): TimelineEntry {
  return {
    id: session.id,
    title: session.title,
    start: session.start,
    startMinutes: session.startMinutes,
    end: session.end,
    endMinutes: session.endMinutes,
    venue: session.venue,
    badges: session.badges,
    alwaysVisible: false,
    durationLabel: formatDuration(session.endMinutes - session.startMinutes),
  };
}

function fromFullWidthRow(row: FullWidthRow): TimelineEntry {
  return {
    id: row.id,
    title: row.title,
    start: row.start,
    startMinutes: row.startMinutes,
    end: row.end,
    endMinutes: row.endMinutes,
    venue: null,
    badges: [],
    alwaysVisible: true,
    durationLabel: formatDuration(row.endMinutes - row.startMinutes),
  };
}

export function buildTimelineEntries(): TimelineEntry[] {
  return [
    ...sessions.map(fromSession),
    ...fullWidthRows.map(fromFullWidthRow),
  ];
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
  return entries.filter((entry) => entry.alwaysVisible || entry.venue === track);
}
