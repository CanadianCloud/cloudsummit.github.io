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
          'Networking space available (full venue not yet open - food provided)',
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
          'The One Certification That Works on Every Cloud',
          'Community Stage: Egina Malaj',
          'Simplifying the design and deployment of Agentic AI systems at scale',
        ],
        activityRoles: ['title', 'meta', 'title', 'meta'],
      },
      {
        startTime: '3:50 PM',
        endTime: '4:20 PM',
        activities: [
          'Main Stage: Panel, Sponsored by Fortinet',
          'Panel (AI Beyond the Buzz: Real Use Cases, Real Concerns, Real Conversations)',
          'Community Stage: HackerRivals Round 1',
          'Fast Paced Hackathon learn more at www.HackerRivals.com',
        ],
        activityRoles: ['title', 'meta', 'title', 'meta'],
      },
      {
        startTime: '3:50 PM',
        endTime: '6.30 PM',
        activities: [
          'AWS Workshop: Introduction to Claude Code on AWS',
          'Join waitlist here https://luma.com/awsworkshop',
        ],
        activityRoles: ['title', 'meta'],
      },
      {
        startTime: '4:20 PM',
        endTime: '4:50 PM',
        activities: [
          'Main Stage: Jason Mayes',
          'Vibing with Antigravity for custom Web AI solutions',
          'Community Stage: Nitin Gandhi',
          'Maximizing Cloud Value: Cost Engineering Playbooks',
        ],
        activityRoles: ['title', 'meta', 'title', 'meta'],
      },
      {
        startTime: '4:50 PM',
        endTime: '5:30 PM',
        activities: [
          'Main Stage: Morgan Foster',
          'The Illustrated Primer to GenAI Networking',
          '10 min break after',
          'Community Stage: Panel',
          'Panel (Women Shaping the Future of Cloud & AI)',
        ],
        activityRoles: ['title', 'meta', 'meta', 'title', 'meta'],
      },
      {
        startTime: '5:30 PM',
        endTime: '6:00 PM',
        activities: [
          'Main Stage: Niko Smeds',
          'The Cloud Bill Nobody Could Explain',
          'Community Stage: HackerRivals Round 2 Elimination Round',
          'Fast Paced Hackathon learn more at www.HackerRivals.com',
        ],
        activityRoles: ['title', 'meta', 'title', 'meta'],
      },
      {
        startTime: '6:00 PM',
        endTime: '6:30 PM',
        activities: [
          'Main Stage: Adina Gray',
          'Who Adopts AI First and Who Struggles to Keep Up',
          'Community Stage: Lightning Talks',
          'HabileLabs',
          'Defang',
        ],
        activityRoles: ['title', 'meta', 'title', 'meta', 'meta'],
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
        activities: [
          'After Party (limited space)',
          'Join Waitlist Here https://luma.com/csparty',
        ],
        activityRoles: ['title', 'meta'],
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
