export interface CitySpecificContent {
  cityName: string;
  venue: string;
  address: string;
  addressUrl: string;
  date: string;
  time: string;
  callForSpeakers: string;
  ticketUrl: string;
}

export interface HeroContent {
  cityName: string;
  title: string;
  subtitle: string;
  description: string;
  venue: string;
  address: string;
  addressUrl: string;
  date: string;
  time: string;
  callForSpeakers: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

export interface NavLink {
  text: string;
  href: string;
}

export interface NavigationContent {
  links: NavLink[];
  // ctaText: string; Disabled as part of Issue #3 (Header & Navigation update)
  // ctaHref: string; Disabled as part of Issue #3 (Header & Navigation update)
}

interface CommunityPartners {
  name: string;
  logo: string;
}

interface Sponsors {
  ranking: "Gold" | "Platinum" | "Diamond";
  name: string;
  logo: string;
}

export interface Speaker {
  speakername: string;
  title: string;
  company: string;
  topic: string;
  image: string;
}

export type City = "vancouver" | "toronto";

export const defaultCity: City = 'vancouver';

// Shared content across all cities
export const sharedHeroContent = {
  title: 'Cloud Summit 2026',
  subtitle: "Sponsor Canada's Largest Multi-Cloud Conference",
  description:
    "Cloud Summit 2026 is Canada's multi-cloud conference, bringing together cloud professionals, developers, architects, sponsors, and communities in Vancouver and Toronto.",
  primaryCta: {
    text: 'Become a Volunteer',
    href: 'https://tally.so/r/mBVZjA',
  },
  secondaryCta: {
    text: 'Become a Speaker',
    href: 'https://tally.so/r/rjBeN5',
  },
};

// City-specific content
export const citySpecificContent: Record<City, CitySpecificContent> = {
  vancouver: {
    cityName: 'Vancouver',
    venue: 'Science World',
    address: '1455 Quebec St, Vancouver, BC V6A 3Z7',
    addressUrl: 'https://maps.app.goo.gl/DQbdiQLYB1qe1iZn7',
    date: 'Friday, May 1st, 2026',
    time: '2pm - 9pm',
    callForSpeakers: 'February 2026',
    ticketUrl: 'https://luma.com/cloudsummit26',
  },
  toronto: {
    cityName: 'Toronto',
    venue: 'Northeastern University',
    address: '375 Queen St W, Toronto, ON M5V 2A5',
    addressUrl: 'https://maps.app.goo.gl/tqLCm7Z6r1ctT4Db8',
    date: 'Saturday, August 29th, 2026',
    time: '12pm - 6pm',
    callForSpeakers: 'April 2026',
    ticketUrl: 'https://luma.com/0xpa2rxj',
  },
};

// Helper function to combine shared and city-specific content
export function getHeroContent(city: City): HeroContent {
  return {
    ...sharedHeroContent,
    ...citySpecificContent[city],
    // Added as part of Issue #3 (Header & Navigation)
    primaryCta: {
      text: 'Get Your Ticket',
      href: citySpecificContent[city].ticketUrl,
    },
    secondaryCta: {
      text: '',
      href: '',
    },
  };
}


// For backwards compatibility
export const heroContent: Record<City, HeroContent> = {
  vancouver: getHeroContent('vancouver'),
  toronto: getHeroContent('toronto'),
};

// Disabled as part of Issue #3 (Header & Navigation update)
// Reason: This button is removed according to new design requirements
// // Helper function to get navigation content with city-specific ticket URL
// export function getNavigationContent(city: City): NavigationContent {
//   return {
//     links: [
//       { text: 'About Cloud Summit', href: '/about-cloud-summit' },
//       // { text: 'Our Event Team', href: '/our-team' },
//       { text: 'Call for Speakers', href: '/our-speakers' },
//       { text: 'Sponsorship Info', href: '/our-sponsors' },
//       {
//         text: 'Get Earlybird Tickets',
//         href: citySpecificContent[city].ticketUrl,
//       },
//     ],
//     ctaText: 'Become a Sponsor',
//     ctaHref: 'https://tally.so/r/wLqXvO',
//   };

// }

// Added as part of Issue #3 (Header & Navigation)
// Reason: Replace old CTAs with new "Get Your Ticket" button
// Link is dynamic based on selected city
// Helper function to get navigation content with city-specific ticket URL
export function getNavigationContent(city: City): NavigationContent {
  return {
    links: [
      { text: 'Get Tickets', href: citySpecificContent[city].ticketUrl },
      { text: 'Apply to Volunteer', href: sharedHeroContent.primaryCta.href },
    ]
  };
}

// Default navigation content (for backwards compatibility)
export const navigationContent: NavigationContent =
  getNavigationContent(defaultCity);

export const aboutCPCAContent = {
  description:
    'As a non-profit organization, our purpose is to bring together & educate the local tech community about the cloud and support our local community through charity.',
  ctaText: 'Learn More About CPCA',
  ctaHref: 'https://canadiancloud.org',
};

export const whatIsCloudSummitContent = {
  heading: 'Cloud Summit?',
  description:
    "Canada's premier multi-cloud conference bringing together 1,000+ cloud professionals, industry leaders, and decision-makers from AWS, Azure, Google Cloud, and IBM Cloud ecosystems. Connect, learn, and shape the future of cloud computing.",
};

export const cloudSummitActivitiesContent = {
  activities: [
    {
      title: 'Expand Your Network',
      description:
        'Connect with industry leaders, decision-makers, and cloud professionals from across the country and beyond.',
      image: '/images/activities/networking.svg',
    },
    {
      title: 'Watch Presentations',
      description:
        'Learn from expert speakers sharing the latest trends, best practices, and cloud innovations that are shaping the industry.',
      image: '/images/activities/presentations.svg',
    },
    {
      title: 'Meet Tech Companies',
      description:
        'Discover cutting-edge solutions and services from leading cloud technology providers, sponsors, and innovative startups.',
      image: '/images/activities/tech_companies.svg',
    },
    {
      title: 'High-Pressure Live Cloud Builds',
      description:
        'Watch top teams race the clock in live cloud showdowns, shipping under pressure as the crowd votes and shapes the action.',
      image: '/images/activities/laptop.svg',
    },
    {
      title: 'Discover Communities',
      description:
        'Connect with local user groups, developer communities, and professional cloud organizations that drive innovation.',
      image: '/images/activities/communities.svg',
    },
    {
      title: 'Participate in Workshops',
      description:
        'Get hands-on experience through interactive sessions on cloud platforms, tools, and practical implementations that matter.',
      image: '/images/activities/workshops.svg',
    },
  ],
};

export const eventHighlightsContent = {
  heading: 'Event Highlights',
  description:
    'Explore what makes Cloud Summit an unforgettable experience for cloud professionals.',
};

export const tickerContent = {
  title: 'Cloud Providers',
  prefix: 'Explore',
};

export const eventMapContent = {
  /** Vancouver venue (Science World) — swap images/PDF when final assets are ready */
  venueLabel: 'Vancouver · Science World',
  pdfHref: '/images/event-map/cloud-summit-floorplan.pdf',
  floors: [
    {
      id: 'floor-1',
      label: 'Floor 1',
      imageSrc: '/images/event-map/floor-1.png',
      imageAlt:
        'Isometric floor plan for Science World Floor 1 with highlighted areas and wayfinding icons',
      legend: [
        {
          iconSrc: '/images/event-map/icons/volunteers-lounge-restricted.png',
          title: 'Volunteers lounge',
          detail: 'restricted access',
        },
        {
          iconSrc: '/images/event-map/icons/community-lounge-food-drinks.png',
          title: 'Community lounge',
          detail: 'food and drinks',
        },
        {
          iconSrc: '/images/event-map/icons/speakers-lounge-restricted.png',
          title: 'Speakers lounge',
          detail: 'restricted access',
        },
        {
          iconSrc: '/images/event-map/icons/water-refill-station.png',
          title: 'Water refill station',
        },
        {
          iconSrc: '/images/event-map/icons/washrooms.png',
          title: 'Washrooms',
        },
        {
          iconSrc: '/images/event-map/icons/registration-tickets.png',
          title: 'Registration and tickets',
        },
        {
          iconSrc: '/images/event-map/icons/venue-map-schedule.png',
          title: 'Venue map and schedule',
        },
        {
          iconSrc: '/images/event-map/icons/entrance-exit.png',
          title: 'Entrance and exit',
        },
        {
          iconSrc: '/images/event-map/icons/lockers-1-dollar.png',
          title: 'Lockers',
          detail: '$1',
        },
        {
          iconSrc: '/images/event-map/icons/community-stage.png',
          title: 'Community stage',
        },
        {
          iconSrc: '/images/event-map/icons/elevator.png',
          title: 'Elevator',
        },
      ],
    },
    {
      id: 'floor-2',
      label: 'Floor 2',
      imageSrc: '/images/event-map/floor-2.png',
      imageAlt:
        'Science World Floor 2 map with highlighted areas and wayfinding icons',
      legend: [
        {
          iconSrc: '/images/event-map/icons/ai-experience.png',
          title: 'Artificial Intelligence',
          detail: 'experience',
        },
        {
          iconSrc: '/images/event-map/icons/sound-visual-experience.png',
          title: 'Sound and visual',
          detail: 'experience',
        },
        {
          iconSrc: '/images/event-map/icons/no-food-drink-allowed.png',
          title: 'No food or drink allowed',
        },
        {
          iconSrc: '/images/event-map/icons/hackathon-teams-room.png',
          title: 'Hackathon teams room',
        },
        {
          iconSrc: '/images/event-map/icons/water-refill-station.png',
          title: 'Water refill station',
        },
        {
          iconSrc: '/images/event-map/icons/venue-map-schedule.png',
          title: 'Venue map and schedule',
        },
        {
          iconSrc: '/images/event-map/icons/lockers-1-dollar.png',
          title: 'Lockers',
          detail: '$1',
        },
        {
          iconSrc: '/images/event-map/icons/quiet-area-phone-calls.png',
          title: 'Quiet area to take',
          detail: 'phone calls',
        },
        {
          iconSrc: '/images/event-map/icons/main-stage.png',
          title: 'Main stage',
        },
        {
          iconSrc: '/images/event-map/icons/cloud-security-experience.png',
          title: 'Cloud security',
          detail: 'experience',
        },
        {
          iconSrc: '/images/event-map/icons/elevator.png',
          title: 'Elevator',
        },
        {
          iconSrc: '/images/event-map/icons/after-party-entrance.png',
          title: 'After party entrance',
          detail: 'restricted access',
        },
        {
          iconSrc: '/images/event-map/icons/washrooms.png',
          title: 'Washrooms',
        },
        {
          iconSrc: '/images/event-map/icons/cloud-chamber.png',
          title: 'Cloud chamber',
        },
      ],
    },
  ],
} as const;

export type EventMapContent = typeof eventMapContent;

// Venue logistics (city-specific)
export interface VenueLink {
  url: string;
  text: string;
}

export interface VenueLogisticsBase {
  title: string;
  bullets: string[];
  externalLink?: VenueLink[];
}

export interface VenueLogisticsSectionNewVersion {
  CityTitle: string;
  intro: string;
  section: VenueLogisticsBase[];
}

// Helper function to get footer content with city-specific ticket URL
export function getFooterContent(city: City) {
  return {
    copyright: 'Cloud Summit. All rights reserved.',
    links: [

      { col: 1, text: 'Get a Ticket', href: citySpecificContent[city].ticketUrl },
      { col: 1, text: 'Call for Speakers', href: '/our-speakers/' },
      { col: 1, text: 'Become a Sponsor', href: 'https://tally.so/r/wLqXvO' },
      { col: 1, text: 'Apply to Volunteer', href: 'https://tally.so/r/mBVZjA' },
      { col: 1, text: 'Enter Hackathon', href: 'https://hackerrivals.com/' },

      { col: 2, text: 'Press Release', href: '/archive/2025/index.html' },
      { col: 2, text: 'About Cloud Summit', href: '/about-cloud-summit/' },
      { col: 2, text: 'Subscribe to Newsletter', href: 'https://tally.so/r/mR6RBl' },
      // { col: 2, text: 'Our Event Team', href: '/our-team' },
      // { col: 2, text: 'Sponsorship Info', href: '/our-sponsors' },

      { col: 3, text: '2025', href: '/archive/2025/index.html' },
      { col: 3, text: '2024', href: '/archive/2024.html' },

    ],
    social: [
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/canadiancloudninja/',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/showcase/vancouvercloudsummit',
      },
    ],    
    // pressReleases: [
    //   { text: '2025 Press Release', href: '/archive/2025/index.html' },
    // ],
    previousYears: [
      { text: '2025', href: '/archive/2025/index.html' },
      { text: '2024', href: '/archive/2024.html' },
    ],

    newsletter: 
      {
        prefix: 'Stay',
        heading: 'Connected',
        description:
          'Subscribe to our newsletter to receive the latest updates about Cloud Summit 2026, speaker announcements, and exclusive content.',
        ctaText: 'Subscribe to Newsletter',
        ctaHref: 'https://tally.so/r/mR6RBl',
      }
    ,
  };
}

// Default footer content (for backwards compatibility)
export const footerContent = getFooterContent(defaultCity);

export const pastSponsorsContent = {
  prefix: 'Thank You',
  heading: 'Past Sponsors',
  description:
    'We are grateful to our past sponsors who have supported Cloud Summit and helped make our events successful.',
};

export const sponsorshipSponsorsContent = {
  prefix: 'Our',
  heading: 'Past Sponsors',
  description:
    'We are grateful to our sponsors who have supported Cloud Summit and helped make our events successful.',
};

export const newsletterContent = {
  prefix: 'Stay',
  heading: 'Connected',
  description:
    'Subscribe to our newsletter to receive the latest updates about Cloud Summit 2026, speaker announcements, and exclusive content.',
  ctaText: 'Subscribe to Newsletter',
  ctaHref: 'https://tally.so/r/mR6RBl',
};

export const venueLogisticsContentNewVersion: Record<City, VenueLogisticsSectionNewVersion> = {
  vancouver: {
    CityTitle: 'Vancouver',
    intro: '',
    section: [
      {
        title: 'Getting to the Venue',
        bullets: [
          '1455 Quebec Street, Vancouver, BC, V6A 3Z7',
          '604.443.7440',
          'Directions via Google Maps',
        ],
        externalLink: [
          {
            url: 'https://maps.app.goo.gl/DLdorR8GHCFJvXQp8',
            text: 'Directions via Google Maps',
          },

        ]
      },
      {
        title: 'Active & Shared Mobility',
        bullets: [
          'Bike (Personal)',
          'Bike racks available at the front plaza',
          'Visitors must bring their own lock',
          'Mobi Bike Share',
          'Station located near the entrance (under SkyTrain overpass)',
          'Accessible via seawall cycling path',
        ],
        externalLink: [
          {
            url: 'https://www.mobibikes.ca/en/',
            text: 'Visit Mobi Bike Share',
          },
        ],
      },

      {
        title: 'Public Transport',
        bullets: [
          'Bus Routes',
          'Bus 19 - Metrotown / Stanley Park',
          'Bus 22 - Knight / Downtown',
          'Bus 3 - Main / Downtown',
          'Bus 8 - Fraser / Downtown',
          'Skytrain',
          'Expo Line - Main Street-Science World',
          'Ferry',
          'Aquabus and False Creek Ferries Routes connect from:',
          'Granville Island',
          'English Bay',
          'Yaletown',
          'Kitsilano',
        ],
        externalLink: [
          {
            text: 'View Schedule',
            url: 'https://www.translink.ca/schedules-and-maps/skytrain?term=22',
          },
          {
            url: 'https://theaquabus.com/',
            text: 'Aquabus',
          },
          {
            url: 'https://granvilleislandferries.bc.ca/',
            text: 'False Creek Ferries',
          },
        ],
      },

      {
        title: 'Vehicle Access',
        bullets: [
          'Car Share',
          'Evo',
          'Share Now (formerly Car2Go)',
          'Designated parking available across Quebec St',
          'Parking',
          'Limited paid parking available',
          'No bus parking',
          'Parking Rates',
          '1 Hour – $5.25',
          '2 Hours – $9.95',
          '4 Hours – $15.25',
          'Until 6:30 PM – $20.95',
          'From 5 PM – 2 AM – $10.50',
          'Payment Options',
          'Phone payment',
          'Credit card',
          'Notes',
          'Rates may change during special events',
          'Pay inside admissions to get regular rates during events',
        ],
        externalLink: [],
      },
      {
        title: 'Accessibility & Facilities',
        bullets: [
          'Accessible Parking',
          'There are six wheelchair-accessible spaces in the parking lots. These are available on a first-come, first-served basis, and are located in the lots to the north and south of Science World. Ramps are available to reach the sidewalk.',
          'Automated Entry and Exit Doors',
          'Science World has button-operated automated entry doors and exit doors.',
          'Ramps and Elevators',
          'Science World has ramps that allow access to the first- and second-floor galleries. There are also two elevators which run between the first and second floors. We recommend using the elevator in the Connection Zone (near the lobby) to access the Wonder gallery.',
          'Service Animals',
          'Service dogs must be on a leash and in the company of their owner at all times. For the safety and comfort of all guests, service dogs must be well-behaved during their visit. Staff reserve the right to ask non-compliant owners and their dogs to leave the premises.',
          'Washrooms',
          'All public washrooms at Science World are equipped with baby-change facilities.',
        ],
        externalLink: [],
      },
    ],
  },
  toronto: {
    CityTitle: 'Toronto',
    intro: 'Comming Soon',
    section: [],
  },
};

export type VenueLogisticsContent = typeof venueLogisticsContentNewVersion;

export const speakerContent: Speaker[] = [
  {
    speakername: "Matt Biilmann",
    title: "CEO and Co-Founder",
    company: "Netlify",
    topic: "AX and Why It Matters",
    image: "/images/previous-speakers/matt-biilmann.png",
  },
  {
    speakername: "Eric Johnson",
    title: "Principal Developer Advocate",
    company: "Amazon Web Services (AWS)",
    topic: "Taking GenAI from Paper to Production with Serverless",
    image: "/images/previous-speakers/eric-johnson.png",
  },
  {
    speakername: "Ahmad Awais",
    title: "CEO",
    company: "Langbase",
    topic: "Why the Best AI Agents Are Built Without Frameworks",
    image: "/images/previous-speakers/ahmad-awais.jpg",
  },
  {
    speakername: "Luca Maraschi",
    title: "Co-Founder & CEO",
    company: "Platformatic",
    topic: "Scaling Node.js in Kubernetes: Metrics, Memory, and Mastery",
    image: "/images/previous-speakers/luca-maraschi.png",
  },
  {
    speakername: "Denis Astahov",
    title: "Solutions Architect",
    company: "OpsGuru",
    topic: "How to become Cloud/DevOps Engineer from Zero",
    image: "/images/previous-speakers/denis-astahov.png",
  },
  {
    speakername: "Aiman Parvaiz",
    title: "Director of DevOps",
    company: "NimbusStack",
    topic: "Driving Cloud Cost Efficiency: Multi-Cloud Strategies",
    image: "/images/previous-speakers/aiman-parvaiz.png",
  },
];

export const communityPartners: CommunityPartners[] = [
  {
    name: 'AWS',
    logo: '/images/community-partners/aws-day-logo.png',
  },
  {
    name: 'Google Developer Group',
    logo: '/images/community-partners/gdg-logo.png',
  },
  {
    name: 'ISACA',
    logo: '/images/community-partners/ISACA.png',
  },
  {
    name: 'Hacker Rivals',
    logo: '/images/community-partners/Logo-Oct25-Black.png',
  },
  {
    name: 'Microsoft',
    logo: '/images/community-partners/Microsoft_logo.png',
  },
];

export const sponsors: Sponsors[] = [
  {
    ranking: 'Platinum',
    name: 'AWS',
    logo: '/images/sponsors/aws-white.svg',
  },
  {
    ranking: 'Diamond',
    name: 'Fortinet',
    logo: '/images/sponsors/Fortinet_Logo.png',
  },
];

