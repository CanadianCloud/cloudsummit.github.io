import {
  EVENT_START_MINUTES,
  EVENT_END_MINUTES,
  SLOT_MINUTES,
} from "./torontoSchedule";

const EVENT_TIMEZONE = "America/Toronto";
const EVENT_YEAR = 2026;
const EVENT_MONTH = 8; // August
const EVENT_DAY = 29;

interface TorontoParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

function getTorontoParts(date: Date): TorontoParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts: Record<string, string> = {};
  for (const part of formatter.formatToParts(date)) {
    parts[part.type] = part.value;
  }

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    // hour12: false can format midnight as "24" in some ICU versions.
    hour: Number(parts.hour) % 24,
    minute: Number(parts.minute),
  };
}

/**
 * Fractional slot position (0 = 12:00pm, 13 = 6:30pm) for the desktop grid's
 * "now" line, computed in America/Toronto regardless of the host machine's
 * timezone. Returns null on any date other than Aug 29, 2026, or outside
 * event hours.
 */
export function getNowLinePosition(date: Date): number | null {
  const { year, month, day, hour, minute } = getTorontoParts(date);

  if (year !== EVENT_YEAR || month !== EVENT_MONTH || day !== EVENT_DAY) {
    return null;
  }

  const minutesSinceMidnight = hour * 60 + minute;

  if (
    minutesSinceMidnight < EVENT_START_MINUTES ||
    minutesSinceMidnight > EVENT_END_MINUTES
  ) {
    return null;
  }

  return (minutesSinceMidnight - EVENT_START_MINUTES) / SLOT_MINUTES;
}
