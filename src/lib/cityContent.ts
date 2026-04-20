export type City = 'vancouver' | 'toronto';

export interface CitySchedule {
  startTime: string;
  endTime?: string;
  activities: string[];
  /** Lines 0..primaryLineCount-1 use the same prominent style (no sub-line bullet). Default 1. Ignored when activityRoles is set. */
  primaryLineCount?: number;
  /** Per-line style when order matters (e.g. a meta line between two titles). Length must match activities. */
  activityRoles?: ('title' | 'meta')[];
}

export interface CityContent {
  name: string;
  displayName: string;
  title: string;
  subtitle: string;
  description: string;
  venue?: string;
  date?: string;
  schedule?: CitySchedule[];
}

export const cityContent: Record<City, CityContent> = {
  vancouver: {
    name: 'vancouver',
    displayName: 'Vancouver',
    title: 'Cloud Summit 2026 - Vancouver',
    subtitle: "Canada's Largest Multi-Cloud Conference",
    description:
      'Connect with over 1,000 cloud professionals and decision-makers. Showcase your brand at this premier gathering of AWS, Azure, Google Cloud, and IBM Cloud experts.',
    venue: 'Science World',
    date: 'Friday, May 1st, 2026 • 3 pm - 9 pm',
    schedule: [
      {
        startTime: '2:15 PM',
        activities: [
          'Registration Opens',
          'Networking space available (full venue not yet open)',
        ],
      },
      {
        startTime: '2:50 PM',
        activities: [
          'Doors Open to Full Venue',
          'Experience areas open - sponsored by AWS',
        ],
      },
      {
        startTime: '3:00 PM',
        endTime: '3:20 PM',
        activities: [
          'Opening Welcome Remarks',
          'Live on the Main Stage: streamed to the Community Stage',
        ],
      },
      {
        startTime: '3:20 PM',
        endTime: '3:50 PM',
        activities: [
          'Main Stage: Gabriel Velazquez Lopez',
          'Community Stage: Egina Malaj',
        ],
        primaryLineCount: 2,
      },
      {
        startTime: '3:50 PM',
        endTime: '4:20 PM',
        activities: [
          'Main Stage: Panel, Sponsored by Fortinet',
          'Community Stage: Niko Smeds',
        ],
        primaryLineCount: 2,
      },
      {
        startTime: '4:20 PM',
        endTime: '4:50 PM',
        activities: [
          'Main Stage: Jason Mayes',
          'Community Stage: HackerRivals Round 1',
        ],
        primaryLineCount: 2,
      },
      {
        startTime: '4:50 PM',
        endTime: '5:30 PM',
        activities: [
          'Main Stage: Morgan Foster',
          '10 min break after',
          'Community Stage: Panel',
          'Panel (Women Shaping the Future of Cloud & AI)',
        ],
        activityRoles: ['title', 'meta', 'title', 'meta'],
      },
      {
        startTime: '5:30 PM',
        endTime: '6:00 PM',
        activities: [
          'Main Stage: Session 5',
          'Community Stage: HackerRivals Round 2 Elimination Round',
        ],
        primaryLineCount: 2,
      },
      {
        startTime: '6:00 PM',
        endTime: '6:30 PM',
        activities: [
          'Main Stage: Adina Gray',
          'Community Stage: Lightning Talks',
        ],
        primaryLineCount: 2,
      },
      {
        startTime: '6:30 PM',
        endTime: '7:00 PM',
        activities: [
          'HackerRivals Final',
          'Live on the Main Stage: streamed to the Community Stage',
        ],
      },
      {
        startTime: '7:00 PM',
        endTime: '7:30 PM',
        activities: [
          'HackerRivals Awards',
          'Live on the Main Stage: streamed to the Community Stage',
          'Closing Remarks',
        ],
        primaryLineCount: 1,
      },
      {
        startTime: '7:30 PM',
        endTime: '9:00 PM',
        activities: ['After Party (invite only)'],
      },
    ],
  },
  toronto: {
    name: 'toronto',
    displayName: 'Toronto',
    title: 'Cloud Summit 2026 - Toronto',
    subtitle: "Canada's Largest Multi-Cloud Conference",
    description:
      'Connect with over 1,500 cloud professionals and decision-makers. Showcase your brand at this premier gathering of AWS, Azure, Google Cloud, and IBM Cloud experts.',
    venue: 'NEU 375 Queen Street West',
    date: 'Saturday, August 29th, 2026 • 12pm-6pm',
  },
};

export const defaultCity: City = 'vancouver';

export function isValidCity(city: string): city is City {
  return city === 'vancouver' || city === 'toronto';
}

export function getCityFromUrl(): City {
  if (typeof window === 'undefined') return defaultCity;

  const params = new URLSearchParams(window.location.search);
  const cityParam = params.get('city');

  if (cityParam && isValidCity(cityParam)) {
    return cityParam;
  }

  return defaultCity;
}

export function setCityInUrl(city: City): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.set('city', city);
  window.history.pushState({ city }, '', url.toString());
}
