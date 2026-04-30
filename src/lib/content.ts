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

export interface Committee {
  name: string;
  title: string;
  link: string;
  bio: string;
  image: string;
}

export interface CommunityPartner {
  name: string;
  logo: string;
  url: string;
}

export interface Sponsor {
  ranking: 'Gold' | 'Platinum' | 'Diamond';
  name: string;
  logo: string;
  url: string;
}

export interface Speaker {
  speakername: string;
  title?: string;
  company?: string;
  topic?: string;
  image: string;
  linkedin?: string;
  bio?: string;
  talkTitle?: string;
  talkLevel?: string;
  talkSummary?: string;
  hidden?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type City = 'vancouver' | 'toronto';

export const defaultCity: City = 'vancouver';

// Shared content across all cities
export const sharedHeroContent = {
  title: 'Cloud Summit 2026',
  subtitle: "Canada's Largest Multi-Cloud Conference",
  description: '',
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
    time: '2:15 pm - 9 pm',
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
      { text: 'Schedule', href: '/#schedule' },
    ],
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
    "Canada's premier multi-cloud conference bringing together hundreds of cloud professionals, industry leaders, and decision-makers from AWS, Azure, Google Cloud, and IBM Cloud ecosystems. Connect, learn, and shape the future of cloud computing.",
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
        {
          iconSrc: '/images/event-map/icons/Workshop.png',
          title: 'Workshop',
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

/** Footer line: Website by … — optional LinkedIn per name (same pattern as aws-community-day). */
export const websiteCredits: Array<{ name: string; link: string | null }> = [
  {
    name: 'Nichanun (Luck)',
    link: 'https://www.linkedin.com/in/nichanun-pong/',
  },
  {
    name: 'Zack',
    link: 'https://www.linkedin.com/in/viet-anh-hoang-a504911b1/',
  },
  {
    name: 'Ahmad',
    link: 'https://www.linkedin.com/in/ahmad-salempoor/',
  },
  {
    name: 'Laurie',
    link: 'https://www.linkedin.com/in/laurieyeh1/',
  },
];

// Helper function to get footer content with city-specific ticket URL
export function getFooterContent(city: City) {
  return {
    copyright: 'Cloud Summit. All rights reserved.',
    links: [
      {
        col: 1,
        text: 'Get a Ticket',
        href: citySpecificContent[city].ticketUrl,
      },
      { col: 1, text: 'Call for Speakers', href: '/our-speakers/' },
      { col: 1, text: 'Become a Sponsor', href: 'https://tally.so/r/wLqXvO' },
      { col: 1, text: 'Apply to Volunteer', href: 'https://tally.so/r/mBVZjA' },
      { col: 1, text: 'Enter Hackathon', href: 'https://hackerrivals.com/' },

      { col: 2, text: 'Press Release', href: '/press-release/' },
      { col: 2, text: 'About Cloud Summit', href: '/about-cloud-summit/' },
      { col: 2, text: 'Meet the Team', href: '/our-team/' },
      {
        col: 2,
        text: 'Community Booth Application',
        href: 'https://tally.so/r/obOE0O',
      },
      {
        col: 2,
        text: 'Subscribe to Newsletter',
        href: 'https://tally.so/r/mR6RBl',
      },
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

    newsletter: {
      prefix: 'Stay',
      heading: 'Connected',
      description:
        'Subscribe to our newsletter to receive the latest updates about Cloud Summit 2026, speaker announcements, and exclusive content.',
      ctaText: 'Subscribe to Newsletter',
      ctaHref: 'https://tally.so/r/mR6RBl',
    },
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

export const venueLogisticsContentNewVersion: Record<
  City,
  VenueLogisticsSectionNewVersion
> = {
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
        ],
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
          'Science World has ramps that allow access to the first- and second-floor galleries. There are also two elevators which run between the first and second floors.',
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
    speakername: 'Gabriel Velazquez Lopez',
    title: 'Ex-AWS Anthropic Lead (Currently in Stealth Startup)',
    image: '/images/speakers/Gabriel-trans.png',
    linkedin: 'https://www.linkedin.com/in/gvlz/',
    bio: "Gabriel Velazquez is the founder of Antfluent, a Canadian consultancy focused exclusively on Anthropic's Claude. He spent nearly two decades in cloud technology, and was Anthropic's first Applied AI Solutions Architect at AWS, where he led the business relationship that helped scale Anthropic into one of the platform's largest AI partners. After working with organizations around the world, he left to bring that expertise home to Canada.",
    talkTitle: 'The One Certification That Works on Every Cloud',
    talkLevel: 'L100 (Beginner)',
    talkSummary:
      "Every cloud certification you can earn today locks you into a single provider. AWS certs make you an AWS practitioner. Azure certs make you a Microsoft practitioner. But the technology reshaping every cloud platform, AI, now has a certification that travels with you everywhere. In this talk, Gabriel Velazquez shares why he left a global role at AWS to bet his career on Anthropic's Claude ecosystem, why Claude being the only frontier AI model available across AWS, Azure, and Google Cloud changes the certification calculus for cloud practitioners, and what he learned earning the Claude Certified Architect credential. Whether you're choosing your first certification or your next one, this session offers a framework for thinking about where to invest when the industry is moving faster than any single vendor's roadmap.",
  },
  {
    speakername: 'Ahmad Awais',
    image: '/images/speakers/Ahmad-trans.png',
    linkedin: 'https://www.linkedin.com/in/MrAhmadAwais/',
    hidden: true,
    bio: 'Ahmad Awais is an award-winning open-source engineering leader, founder & CEO of Command Code (frontier coding agent with taste) f/k/a Langbase (Serverless AI Developer Platform powering 350K+ AI agents). NASA Mars Ingenuity Helicopter mission code-contributor. Angel investor. Ex-VP DX, Google Developers Advisory Board founding member and Board Member Linux Foundation & OpenAPI Initiative. Ahmad has authored various open-source software tools used by millions of developers worldwide, like his Shades of Purple code theme (4M Dev Users), corona-cli (10+ Billion Requests), and now Langbase (1.2Billion/mo agent runs). He’s a Google Devs Expert and 5x recipient of the 8th GitHub Stars Gold award.',
    talkTitle: 'Agentic Engineering & Developing Taste in Coding Agents',
    talkLevel: 'L100 (Beginner)',
    talkSummary:
      "Your coding agent writes code like an LLM bot. Mine writes code like me.  Every developer has a coding agent now. What if your coding agent actually had taste? What if it understood not just what you're building, but how you like to build it? Your weird naming conventions. Your obsession with early returns. That thing you do where you always extract utilities before they get messy. Your coding taste.  I've been building coding agents since Greg Brockman gave me GPT-3 access in 2020. Started as a CLI tool I used every day. Five years later, we've deployed over 350K agents through Langbase, and I've learned something crucial: the best agents don't just write code, they develop taste.  In this talk, I'll share what we've learned about building agents that actually feel like they know you. We'll dive into the architecture patterns that make this possible: contextual memory systems, preference learning loops, and what I call \"engineering intuition\" going way beyond the typical \"agents.md\" approach.  It's about building agents that evolve with you, remember your decisions, and start making choices that feel like your own. By the end, you'll understand how to build coding agents that can develop taste. It's battle-tested insights from one of the largest deployment of AI agents in production today.",
  },
  {
    speakername: 'Jason Mayes',
    title: 'Web AI Lead at Google',
    image: '/images/speakers/Jason-trans.png',
    linkedin: 'https://www.linkedin.com/in/webai',
    bio: "Web AI Lead, Google (15 years)  Jason is Google's Web AI lead, representing teams such as LiteRT.js, DeepMind (Gemma web models), Chrome, TensorFlow.js, and MediaPipe, helping developers globally apply machine learning in JavaScript to the industries that they work within. Jason is the author of the first Web AI courses on Google Developers and EdX, that have enabled over 100,000 developers start their journey with Machine Learning in the browser and is also the creator of the world's first Web AI Summit bringing together top minds in the field. Jason combines his knowledge of the technical and creative worlds to develop innovative prototypes for Google's largest customers and internal teams with 20+ years experience working at the intersection of web engineering and emerging technologies.  He holds an MEng in Computer Science, is a member of the British Computing Society, and is a certified information privacy technologist. Jason loves sharing knowledge online which has attracted a global following.",
    talkTitle: 'Vibing with Antigravity for custom Web AI solutions',
    talkLevel: 'L200 (Intermediate)',
    talkSummary:
      "Google's Gemini 3 offers a significant leap forward in its ability to create technically complex solutions when used in conjunction with traditional web engineering workflows. Join Jason Mayes, Web AI Lead at Google, as he shows you how you can maximize your potential using Antigravity with Gemini 3 when combined with your existing knowledge as a seasoned engineer to get the best of both worlds. Save time and turn 10x engineers into 100x. Jason will cover how he's able to create fully functional Web AI examples powered by LiteRT.js, to produce technically complex and functional demos powered by client side AI with minimal effort, while maintaining control, allowing him to focus on the problem he actually wants to solve without needing prior experience with a new library you may not have learnt yet.",
  },
  {
    speakername: 'Morgan Foster',
    title: 'Snr Principal Engineer',
    image: '/images/speakers/Mogan-trans.png',
    linkedin: 'https://www.linkedin.com/in/morgan-f-3151a7170/',
    bio: "Morgan Foster is a Senior Principal Software Engineer in Red Hat's Emerging Technologies group, where she works on making AI agents first-class citizens on Kubernetes. She co-chairs the Kubernetes AI Gateway Working Group under the CNCF and is a core contributor to the Kagenti project. Before Red Hat, Morgan spent a decade in site reliability engineering at Google, Twitter, and Box, and cut her teeth on SpiderMonkey at Mozilla. She lives not far south in Bellingham, WA with her husband and daughter.",
    talkTitle: 'The Illustrated Primer to GenAI Networking',
    talkLevel: 'L200 (Intermediate)',
    talkSummary:
      "AI Gateways are popping up like weeds in the world of distributed computing, but what are they? Why do they exist? Didn't we already have API Gateways? From GuardRails to Semantic Caching, in this talk I'll use my work co-chairing a working group tasked with designing an \"AI Gateway\" specification for the Kubernetes ecosystem as a way of demonstrating why this new type of network application is necessary, why they're hard to build, and how you might put them to use in your own clusters.",
  },
  {
    speakername: 'Adina Gray',
    title: 'Founder',
    image: '/images/speakers/Adina-trans.png',
    linkedin: 'https://www.linkedin.com/in/adinagray/',
    bio: 'Adina Gray is the founder of PurpleOwl AI and an international speaker on artificial intelligence, education, and the future of work. Drawing on 20 years of experience in higher education and leadership, she helps organizations build AI literacy and respond strategically to the opportunities and challenges of AI adoption. She has led institutional AI initiatives, organized major AI events, and delivered speaking and training engagements across Canada and internationally. Adina is also the founder of the AI in Education Network of British Columbia, a province wide initiative advancing practical and responsible AI use.',
    talkTitle: 'Who Adopts AI First and Who Struggles to Keep Up',
    talkLevel: 'L100 (Beginner)',
    talkSummary:
      'AI is spreading quickly, but adoption is uneven across industries, organizations, and groups. This session looks at why some people and institutions are able to integrate AI into their work while others struggle to keep up, and what this may mean for the future workforce.',
  },
  {
    speakername: 'Egina Malaj',
    title: 'AI Lead',
    image: '/images/speakers/Egina-trans.png',
    linkedin: 'https://www.linkedin.com/in/eginamalaj/',
    bio: 'Based in Vancouver, Egina is an AI Architect and a Microsoft AI MVP. She holds a PhD at the intersection of engineering and statistics and brings a strong foundation in machine learning and AI system design.\n\nShe focuses on building scalable, production-ready AI solutions, including agentic architectures, and works closely with organizations to turn complex problems into practical AI applications. Egina is also actively involved in the AI community across Vancouver, contributing through events, mentoring, and knowledge sharing.',
    talkTitle:
      'Simplifying the design and deployment of Agentic AI systems at scale',
    talkLevel: 'L200 (Intermediate)',
    talkSummary:
      'As AI systems evolve from single-model applications to agentic architectures, managing orchestration, state, and workflows becomes increasingly complex. Cloud-based agentic frameworks such as Azure’s Agent Framework for multi-agent handoff orchestration and agentic retrieval capabilities for search systems extend traditional RAG with dynamic, context-aware retrieval and structured coordination between components.\n\nThis talk will walk you through how these frameworks simplify building and deploying agentic systems in the cloud. It will show how built-in orchestration, tool execution, and state management reduce custom infrastructure, making solutions easier to scale, maintain, and move to production.',
  },
  {
    speakername: 'Niko Smeds',
    title: 'Staff Software Engineer',
    image: '/images/speakers/Niko-trans.png',
    linkedin: 'https://www.linkedin.com/in/nikosmeds/',
    bio: 'Niko is a staff software engineer at Grafana Labs, where he helps build and monitor the Kubernetes and cloud platforms. From OpenStack to K8s, he has experience with both private and public cloud infrastructure.',
    talkTitle: 'The Cloud Bill Nobody Could Explain',
    talkLevel: 'L200 (Intermediate)',
    talkSummary:
      "At Grafana Labs, our finance team noticed cloud costs steadily increasing in ways our cost metrics couldn't explain. We declared an incident and started digging. Billing consoles told us NAT gateways and audit logs were expensive, but not why. This talk walks through how we made the invisible visible across AWS and GCP, systematically identifying traffic patterns we didn't need to be paying for. By the end, we'd significantly improved our cloud margin and could finally explain where the money was going.",
  },
  {
    speakername: 'Nitin Gandhi',
    title: 'Cloud & FinOps Consultant',
    image: '/images/speakers/nitin-trans.png',
    linkedin: 'https://www.linkedin.com/in/nlgandhi/',
    bio: 'Experienced technology leader with 25 years experience focused on cloud FinOps and technology strategy. I have completed all FinOps certifications and have 3+ years of hands-on experience improving workload efficiency and reducing cloud spend. I also organize the FinOps Vancouver meetup and regularly create and deliver FinOps talks and content to help engineering and finance teams operationalize cloud financial management.',
    talkTitle: 'Maximizing Cloud Value: Cost Engineering Playbooks',
    talkLevel: 'L200 (Intermediate)',
    talkSummary:
      'Public cloud end-user spending is forecast to reach $880 billion in 2026 and several reports estimate more than 30% will be wasted ($264 Billion wasted). 84% of organizations say cloud spend management is their top cloud challenge.\n\nThis session introduces a series of practical Cost Engineering Playbooks targeting the biggest drivers of cloud waste. From egress and compute to AI token usage and infrastructure defaults, we break down complex billing areas into simple, high-impact strategies that engineers can apply immediately.\n\nThe focus is on design decisions that engineers actually own: moving less data, right-sizing compute and eliminating wasteful data scans. Small adjustments at these points yield massive results—like using materialized views to instantly cut dashboard query costs by 90%.',
  },
  {
    speakername: 'Kerrie Murray',
    title: 'AWS Enterprise Sales Leader',
    image: '/images/speakers/kerrie-trans.png',
    linkedin: 'https://www.linkedin.com/in/kerrie-murray-b3257731/',
    bio: 'Accomplished, passionate and highly effective business development and sales professional with 23+ years of experience in global account management, professional services, consulting and achieving market leadership with enterprise customers. I have a results based track record for creating revenue growth through strategic and well developed customer relationships, sharp negotiation skills and driving overall sales excellence through focus, discipline and execution. I have a specific passion for bringing customers the most relevant and experienced professionals to support their most complex business opportunities facing them today.',
    talkTitle: 'Panel: Women Shaping the Future of Cloud & AI',
    talkLevel: 'L100 (Beginner)',
    talkSummary:
      'Join us for an exciting panel on Shaping the Future of Cloud & AI, featuring an exceptional group of women in senior leadership roles at some of the industry’s most impressive companies. This conversation will explore how cloud and AI are reshaping technology, business, and leadership itself, including how leadership is changing today compared with five years ago as AI transforms decision-making, team structures, speed of execution, and the skills organizations value most. Expect a thoughtful, forward-looking discussion with candid insights from leaders who are not just responding to change, but helping define what comes next.',
  },
  {
    speakername: 'Mency Woo',
    title: 'Practice CTO',
    image: '/images/speakers/mency-trans.png',
    linkedin: 'https://www.linkedin.com/in/mencywoo/',
    bio: 'As a hands-on Practice CTO certified in AWS, Microsoft Azure and Google Cloud, I build the products and delivery models that turn technical expertise into client success. My passion lies in creating scalable and profitable service offerings by embedding the principles of trustworthy, ethical AI and equitable data into the core of their design.',
    talkTitle: 'Panel: Women Shaping the Future of Cloud & AI',
    talkLevel: 'L100 (Beginner)',
    talkSummary:
      'Join us for an exciting panel on Shaping the Future of Cloud & AI, featuring an exceptional group of women in senior leadership roles at some of the industry’s most impressive companies. This conversation will explore how cloud and AI are reshaping technology, business, and leadership itself, including how leadership is changing today compared with five years ago as AI transforms decision-making, team structures, speed of execution, and the skills organizations value most. Expect a thoughtful, forward-looking discussion with candid insights from leaders who are not just responding to change, but helping define what comes next.',
  },
  {
    speakername: 'Inga Seelemann',
    title: 'Principal Director, Tech Strategy & Advisory Lead',
    image: '/images/speakers/inga-trans.png',
    linkedin: 'https://www.linkedin.com/in/ingaseelemann/',
    bio: 'Inga is the Principal Director, Tech Strategy & Advisory at Accenture, with more than 28 years of experience leading technology programs across energy, mining, pharmaceuticals, and the public sector. She specializes in helping organizations turn digital transformation from strategy into real-world execution, with a focus on building scalable, governed, production-ready outcomes. Her work spans GenAI at scale, cloud governance and FinOps, and IT/OT integration in complex industrial environments where data is critical not just for business value, but for safety and operational resilience. Having worked on both the client side and the vendor side, she brings a practical operator mindset to every engagement, focused on building solutions that are effective, well-governed, and built to last.',
    talkTitle: 'Panel: Women Shaping the Future of Cloud & AI',
    talkLevel: 'L100 (Beginner)',
    talkSummary:
      'Join us for an exciting panel on Shaping the Future of Cloud & AI, featuring an exceptional group of women in senior leadership roles at some of the industry’s most impressive companies. This conversation will explore how cloud and AI are reshaping technology, business, and leadership itself, including how leadership is changing today compared with five years ago as AI transforms decision-making, team structures, speed of execution, and the skills organizations value most. Expect a thoughtful, forward-looking discussion with candid insights from leaders who are not just responding to change, but helping define what comes next.',
  },
  {
    speakername: 'Devon Dander',
    title: 'Technology Director at Lululemon',
    image: '/images/speakers/devon-trans.png',
    linkedin: 'https://www.linkedin.com/in/devondander/',
    bio: 'Dynamic leader with experience in operational analysis and implementing creative strategies. Proven record of quickly understanding and adapting to business and technology problems, and collaborating cross functionally to achieve timely results. Frequently represents senior leaders to recommend, prioritize, and achieve effective solutions.',
    talkTitle: 'Panel: Women Shaping the Future of Cloud & AI',
    talkLevel: 'L100 (Beginner)',
    talkSummary:
      'Join us for an exciting panel on Shaping the Future of Cloud & AI, featuring an exceptional group of women in senior leadership roles at some of the industry’s most impressive companies. This conversation will explore how cloud and AI are reshaping technology, business, and leadership itself, including how leadership is changing today compared with five years ago as AI transforms decision-making, team structures, speed of execution, and the skills organizations value most. Expect a thoughtful, forward-looking discussion with candid insights from leaders who are not just responding to change, but helping define what comes next.',
  },
  {
    speakername: 'Warren Lyne',
    title: 'Cloud Business Development Manager',
    image: '/images/speakers/warren-trans.png',
    linkedin: 'https://www.linkedin.com/in/warrenlyne/',
    bio: 'Warren brings more than 20 years of experience across enterprise technology, technical sales, and business strategy. He has built and led high-performing teams serving Fortune 500 customers, helping organizations adopt cloud and digital solutions that drive innovation, efficiency, and long-term growth. With expertise spanning cloud, AI, enterprise architecture, and digital transformation, Warren is skilled at turning complex business challenges into practical technology strategies. His background across engineering, pre-sales, account management, and leadership gives him a well-rounded perspective on how to deliver solutions that create real value at scale.',
    talkTitle: 'Emcee (Main Stage)',
    talkLevel: 'L100 (Beginner)',
  },
  {
    speakername: 'Ntokozo Yende',
    title: 'Enterprise Solutions Manager',
    image: '/images/speakers/ntokozo-trans.png',
    linkedin: 'https://www.linkedin.com/in/ntokozo-y-09b928114/',
    bio: 'Ntokozo is an Enterprise Solutions Manager at KPMG with deep experience in cloud strategy, application modernization, and digital transformation. Prior to relocating to Vancouver, she spent five years at Microsoft in Belgium as a Cloud Solutions Architect, helping organizations adopt and scale modern cloud solutions. She is especially passionate about GenAI, Copilot, app modernization, and cloud economics, and brings a practical perspective on how enterprises can turn emerging technology into meaningful business outcomes. With experience across both Microsoft and KPMG, she offers a strong mix of technical insight, strategic thinking, and real-world execution.',
    talkTitle: 'Emcee (Community Stage)',
    talkLevel: 'L100 (Beginner)',
  },
  {
    speakername: 'Andrey Barkov',
    title: 'Senior Software Engineer',
    image: '/images/speakers/andrey-trans.png',
    linkedin: 'https://www.linkedin.com/in/andreybarkov/',
    bio: 'Andrey is an experienced software engineer with a background in building modern web applications and cloud solutions. Skilled in Angular, React, C#, Node.js, Azure, AWS, and microservices, He brings a practical, hands-on perspective to developing scalable and reliable software. A certified Scrum Master and Azure Developer, Andrey combines strong technical expertise with a focus on modern engineering practices and cloud innovation.',
    talkTitle: 'Emcee (HackerRivals)',
    talkLevel: 'L100 (Beginner)',
  },
  {
    speakername: 'Gillian Cai',
    title: 'Enterprise Account Executive',
    image: '/images/speakers/gillian-trans.png',
    linkedin: 'https://www.linkedin.com/in/gilliancai/',
    bio: 'Complex transformations stall when vision, people, and execution drift apart. My work closes that gap. At AWS, I partner with enterprise leaders to map strategy to action: build an adoption plan, align governance and security, and sequence wins that prove value early. My background blends BD, PR, and program leadership—I’ve led large CSR initiatives, delivered white-paper campaigns, and built industry partnerships—so I’m comfortable navigating stakeholders from the boardroom to delivery teams. I’m also passionate about inclusive culture (co-founder of Asians@Amazon ERG initiative) because sustainable change is a team sport. If you’re modernizing workloads, rethinking data foundations, or moving from pilots to scale, I’m happy to share playbooks that work in the real world.',
    talkTitle: 'Panel Moderator',
    talkLevel: 'L100 (Beginner)',
  },
  {
    speakername: 'Derek Liu',
    title: 'AWS Senior Solution Architect',
    image: '/images/speakers/derek-trans.png',
    linkedin: 'https://www.linkedin.com/in/derek-liu-winghin/',
    bio: 'Derek is a Senior Solutions Architect at AWS with expertise in big data, analytics, and agentic AI. He helps organizations design efficient, resilient, and scalable cloud solutions that deliver strong performance while staying cost-conscious. His background includes supporting AWS enterprise customers across services such as Amazon EMR, Glue, Athena, DynamoDB, Lake Formation, and MWAA, with a focus on data lakes, data warehouses, and large-scale analytics workloads. Prior to AWS, he also worked as an SAP HANA database specialist, giving him deep experience in performance, high availability, and enterprise data platforms.',
    talkTitle: 'Workshop Facilitator',
    talkLevel: 'L100 (Beginner)',
  },
  {
    speakername: 'Daniel Kwok',
    title: 'AWS Senior Solution Architect',
    image: '/images/speakers/daniel-trans.png',
    linkedin: 'https://www.linkedin.com/in/dkwok604/',
    bio: 'Daniel is a Senior Cloud Solutions Architect at AWS, partnering with customers and cross-functional teams across account management, business development, engineering, and product to design scalable, flexible, and resilient cloud architectures. His work focuses on helping organizations solve complex business problems and accelerate cloud adoption with solutions that are practical, effective, and built to last. He brings a strong mix of technical depth and customer focus, with a passion for helping businesses turn cloud strategy into real-world outcomes.',
    talkTitle: 'Workshop Facilitator',
    talkLevel: 'L100 (Beginner)',
  },
  {
    speakername: 'Neumann Lim',
    title: 'Manager, Infrastructure and Cybersecurity',
    image: '/images/speakers/neumann-trans.png', // Placeholder
    linkedin: 'https://www.linkedin.com/in/neumannlim/',
    bio: 'Cybersecurity Professional with 15 years of security experience in information security and incident response. Forever learner, emergency responder, servant leader, vCISO, pentester, forensic examiner, crypto-investigator, mentor.',
    talkTitle:
      'Panel: AI Beyond the Buzz: Real Use Cases, Real Concerns, Real Conversations',
    talkLevel: 'LX00 (Everyone)',
    talkSummary:
      'AI is everywhere in the headlines, but what does it actually mean for teams building, securing, and operating modern technology? This panel cuts through the hype to explore practical AI use cases, the risks organizations need to take seriously, and the hard questions leaders should be asking before rushing into adoption. Expect a grounded conversation on where AI is creating real value today, where caution is needed, and how businesses can move forward responsibly.',
  },
  {
    speakername: 'Lakshmi VP',
    title: 'Cloud Solutions Architect',
    image: '/images/speakers/lakshmi-trans.png', // Placeholder
    linkedin: 'https://www.linkedin.com/in/lakshmivp/',
    bio: 'Lakshmi has overall 16+ years of working experience in pre-sales technical roles influencing technology adoption to create impactful solutions across global customers. She holds SA professional, AWS Security Speciality and AWS AI Practitioner certifications along with GIAC industry certification in cybersecurity. Lakshmi leads with customer first consultative approach and as a subject matter expert drives outcomes that align with organizational goals. With her core values as Integrity, collaboration, and continuous learning she aims to translate technology into meaningful business value.',
    talkTitle:
      'Panel: AI Beyond the Buzz: Real Use Cases, Real Concerns, Real Conversations',
    talkLevel: 'LX00 (Everyone)',
    talkSummary:
      'AI is everywhere in the headlines, but what does it actually mean for teams building, securing, and operating modern technology? This panel cuts through the hype to explore practical AI use cases, the risks organizations need to take seriously, and the hard questions leaders should be asking before rushing into adoption. Expect a grounded conversation on where AI is creating real value today, where caution is needed, and how businesses can move forward responsibly.',
  },
];

export const committeeContent: Committee[] = [
  {
    name: 'Matt Carolan',
    title: 'Event Director',
    link: 'https://www.linkedin.com/in/matthewcarolan/',
    bio: 'Matt Carolan is the founder of Cloud Summit and a cloud and security leader with deep experience in platform engineering, enterprise architecture, and cloud transformation. He helps organizations make clear, practical decisions across security, cost, resilience, and operational complexity, combining hands-on technical depth with a global perspective shaped by living and working across Australia, Dubai, Seattle, and Vancouver.',
    image: '/images/committee/matt-trans.png',
  },
  {
    name: 'Bibi Souza',
    title: 'Mentor',
    link: 'https://www.linkedin.com/in/bibschan/',
    bio: 'Bibi is a community builder and strategic leader with experience across software engineering, project management, and advocacy. She is passionate about bringing people together and helping them grow, with a strong track record of turning fragmented audiences into thriving communities. As an exited founder, she brings an experimental mindset, a bias toward action, and thoughtful risk-taking to everything she builds. At Cloud Summit, she helps shape community with intention, energy, and purpose.',
    image: '/images/committee/bibi-trans.png',
  },
  {
    name: 'Andrey Barkov',
    title: 'Emcee',
    link: 'https://www.linkedin.com/in/andreybarkov/',
    bio: 'Andrey is one of the emcees for Cloud Summit Vancouver. He is an experienced software engineer with a background in web applications, cloud infrastructure, and microservices, with expertise across Angular, React, C#, Node.js, Azure, and AWS. He brings strong technical knowledge and an agile mindset to the Cloud Summit community.',
    image: '/images/committee/andrey-trans.png',
  },
  {
    name: 'Warren Lyne',
    title: 'Emcee',
    link: 'https://www.linkedin.com/in/warrenlyne/',
    bio: 'Warren is one of the emcees for Cloud Summit Vancouver. He brings over 20 years of experience across cloud, technical sales, and business development, helping enterprise customers use technology to drive innovation and growth. With deep knowledge of cloud strategy, enterprise solutions, and digital transformation, he combines technical credibility with strong leadership and communication skills.',
    image: '/images/committee/warren-trans.png',
  },
  {
    name: 'Fabio Simka Coutinho',
    title: 'Venue and Logistics Co-Lead',
    link: 'https://www.linkedin.com/in/fabio-simka/',
    bio: 'Fabio is the Venue and Logistics Co-Lead for Cloud Summit Vancouver. After 10 years working in healthcare leadership, he transitioned into tech and is now focused on data engineering across AWS, Azure, and Databricks. With experience in high-pressure environments where communication, accountability, and clarity were essential, he brings a thoughtful, dependable approach to building systems and solving problems. His background gives him a strong focus on reliability, real-world impact, and the people behind the data.',
    image: '/images/committee/fabio-trans.png',
  },
  {
    name: 'Jhan (Shanky) Silva',
    title: 'Sponsorship Lead',
    link: 'https://www.linkedin.com/in/shankyjs/',
    bio: 'Shanky is the Sponsorship Lead for Cloud Summit Vancouver. With a strong background in DevOps, automation, and modern development and deployment practices, he brings a practical, goal-oriented approach to building and improving technical processes. A self-driven learner who enjoys creating agile products, Shanky is passionate about continuous improvement, innovation, and helping great ideas gain momentum.',
    image: '/images/committee/shanky-trans.png',
  },
  {
    name: 'Michael Carlos',
    title: 'Speaker and Community Lead',
    link: 'https://www.linkedin.com/in/mcarlos/',
    bio: 'Michael Carlos is the Speaker and Community Lead for Cloud Summit Vancouver. He brings over 30 years of software engineering experience, including two decades leading development teams, along with a deep interest in AI, robotics, game technology, physics, and evolutionary algorithms. His mix of technical depth and visionary thinking helps shape the ideas, conversations, and community that make Cloud Summit stand out.',
    image: '/images/committee/michael-trans.png',
  },
  {
    name: 'Nichanun Pong (Luck)',
    title: 'Developer Lead',
    link: 'https://www.linkedin.com/in/nichanun-pong/',
    bio: 'Luck is the Developer Lead for Cloud Summit Vancouver. A full-stack developer and product owner, she brings experience across e-commerce, gaming, insurance, and IT, with a focus on building user-centric, data-driven products that connect business goals with strong technical execution. Her background includes JavaScript, React, Node.js, PHP, Laravel, SQL, Python, AWS, and Docker.',
    image: '/images/committee/luck-trans.png',
  },
  {
    name: 'Fernando Stoelting',
    title: 'Venue and Logistics Co-Lead',
    link: 'https://www.linkedin.com/in/fstoelting/',
    bio: 'Fernando is the Venue and Logistics Co-Lead for Cloud Summit Vancouver. He brings 8 years of tech leadership experience across Canada, the US, and Latin America, with a focus on delivering meaningful projects, aligning technology with business goals, and building collaborative, high-performing teams.',
    image: '/images/committee/fernando-trans.png',
  },
  {
    name: 'Philip Mak',
    title: 'Volunteer Lead',
    link: 'https://www.linkedin.com/in/philip-mak-b2b92823a/',
    bio: 'Philip is the Volunteer Lead for Cloud Summit Vancouver. He is a project management professional with experience leading data-driven technical projects across AI, education technology, and community-focused platforms. With a strong background in collaboration, analytics, and user-centered problem solving, he brings an organized and thoughtful approach to supporting volunteers and helping teams succeed.',
    image: '/images/committee/philip-trans.png',
  },
];

export const communityPartners: CommunityPartner[] = [
  {
    name: 'AWS Day',
    logo: '/images/community-partners/aws-day-logo.png',
    url: 'https://www.awsday.ca/',
  },
  {
    name: 'OpenBao',
    logo: '/images/partners/OpenBao-black.png',
    url: 'https://www.openbao.org/',
  },
  {
    name: 'VanLUG',
    logo: '/images/community-partners/vanlug.png',
    url: 'https://vanlug.ca/',
  },
  {
    name: 'Hacker Rivals',
    logo: '/images/community-partners/Logo-Oct25-Black.png',
    url: 'https://hackerrivals.com/',
  },
  {
    name: 'ISACA',
    logo: '/images/community-partners/ISACA.png',
    url: 'https://engage.isaca.org/vancouverchapter/home',
  },
  {
    name: 'Northeastern University',
    logo: '/images/partners/northeastern.png',
    url: 'https://www.northeastern.edu/',
  },
  {
    name: 'Women in Cyber',
    logo: '/images/community-partners/womenincyber.png',
    url: 'https://www.wicys.org/',
  },
  {
    name: 'Microsoft',
    logo: '/images/community-partners/Microsoft_logo.png',
    url: 'https://microsoft.com/',
  },
  {
    name: 'Google Developer Group',
    logo: '/images/community-partners/gdg-logo.png',
    url: 'https://gdg.community.dev/',
  },
  {
    name: 'VanRuby',
    logo: '/images/community-partners/vanruby-black.png',
    url: 'https://vanruby.ca',
  },
  {
    name: 'ASIS International',
    logo: '/images/community-partners/asis-trans.png',
    url: 'https://www.asisonline.org/',
  },
];

export const partners: Sponsor[] = [
  {
    ranking: 'Gold',
    name: 'Habilelabs',
    logo: '/images/partners/habilelabs%20logo.svg',
    url: 'https://www.habilelabs.io/',
  },
  {
    ranking: 'Gold',
    name: 'Defang',
    logo: '/images/partners/defang.svg',
    url: 'https://www.defang.io/',
  },
  {
    ranking: 'Gold',
    name: 'Secretz',
    logo: '/images/partners/secretz.svg',
    url: 'https://www.secretz.io/',
  },
  {
    ranking: 'Gold',
    name: 'Elastic',
    logo: '/images/partners/logo-elastic-horizontal-color-reverse.png',
    url: 'https://www.elastic.co/',
  },
  {
    ranking: 'Platinum',
    name: 'AWS',
    logo: '/images/partners/aws-white.svg',
    url: 'https://aws.amazon.com/',
  },
  {
    ranking: 'Diamond',
    name: 'Fortinet',
    logo: '/images/partners/Fortinet_Logo.png',
    url: 'https://www.fortinet.com/',
  },
];

export const faqContent: FAQ[] = [
  {
    question: 'What is Cloud Summit?',
    answer:
      'Cloud Summit is a community-led tech event bringing together cloud practitioners, developers, architects, security professionals, data teams, and technology leaders for a day of learning, networking, and inspiration.',
  },
  {
    question: 'When is Cloud Summit?',
    answer:
      'For Cloud Summit Vancouver it takes place on May 1, 2026.\nFor Cloud Summit Toronto it takes place on August 29, 2026.',
  },
  {
    question: 'Where is the event being held?',
    answer:
      'For Vancouver the event is being held at Science World in Vancouver, BC.\nFor Toronto the event is being held at Northeastern University in Toronto, ON.',
  },
  {
    question: 'Who should attend?',
    answer: `Cloud Summit is designed for anyone working in or around modern technology, including:
Cloud engineers and architects
Developers
Security professionals
DevOps and platform teams
IT leaders
Students and aspiring technologists

Whether you're deeply technical or just looking to better understand where cloud and AI are heading, there will be something for you.`,
  },
  {
    question: 'What can I expect at the event?',
    answer:
      'You can expect a day of technical talks, community connection, community and sponsor booths, networking, interactive experiences, and great conversations with people from across the local tech community.',
  },
  {
    question: 'Is this a vendor event?',
    answer:
      'No. Cloud Summit is community-led and built to be valuable first. Sponsors help make the event possible, but the goal is to create a genuinely useful and enjoyable experience for attendees.',
  },
  {
    question: 'Will there be technical talks?',
    answer:
      'Yes. The event features technical and community-focused sessions from experienced speakers across cloud, AI, security, infrastructure, development, operations, and leadership.',
  },
  {
    question: 'Is the event only for AWS users?',
    answer:
      'No. Cloud Summit is not limited to one platform. It is designed for the broader cloud and technology community.',
  },
  {
    question: 'Are tickets required?',
    answer:
      'Yes. Attendees need a ticket to attend. You can register through the official event page linked on CloudSummit.ca.',
  },
  {
    question: 'Are there early bird or discount tickets?',
    answer:
      'Ticket pricing may change over time, and discounted pricing may be available during certain periods. Check the event page for the latest ticket details.',
  },
  {
    question: 'What is included with my ticket?',
    answer:
      'Your ticket includes access to the event, sessions, sponsor area, and community experiences. Food, drinks, swag, or extras may vary depending on the final event plan and sponsors.',
  },
  {
    question: 'Is the event for beginners or only advanced attendees?',
    answer:
      'Both. Some sessions will be beginner-friendly, while others will go deeper technically. The event is designed to appeal to a broad range of experience levels.',
  },
  {
    question: 'Will the schedule be published in advance?',
    answer:
      'Yes. Speaker and schedule details will be released on the website as they are confirmed.',
  },
  {
    question: 'Can I apply to speak?',
    answer:
      'Yes. If the call for speakers is open, you can apply through the speaker submission link on CloudSummit.ca.',
  },
  {
    question: 'Can my company sponsor the event?',
    answer:
      'Yes. Cloud Summit works with sponsors who want to support the local tech community and be part of the event experience. Sponsorship details are available on the website.',
  },
  {
    question: 'Can I volunteer?',
    answer:
      'Yes. Volunteers are a big part of what makes Cloud Summit possible. If volunteer applications are open, you can sign up through the website.',
  },
  {
    question: 'Is the venue accessible?',
    answer:
      'Both venues in Vancouver and Toronto were selected due to their accessibility. If you have a particular accessibility need, please contact the team in advance.',
  },
  {
    question: 'Is there parking at the venue?',
    answer:
      'There are parking options near very close to both venues, but availability and pricing may vary. Public transit is also a convenient option for many attendees.',
  },
  {
    question: 'What is the best way to get there?',
    answer: `For Vancouver, Cloud Summit is held at Science World, 1455 Quebec Street. The venue is easy to reach by car, rideshare, public transit, or on foot. The scenic False Creek seawall runs right by Science World, the Main Street–Science World SkyTrain station is directly across the road, and there are two paid parking lots immediately outside the building off Quebec Street.

For Toronto, Cloud Summit is held at Northeastern University, 375 Queen Street West in downtown Toronto. The venue is easy to reach by public transit or on foot, with Osgoode Station about a five-minute walk away and the 501 Queen streetcar stopping nearby in both directions.`,
  },
  {
    question: 'Will food and drinks be available?',
    answer:
      'Food and drinks will be available during the event with a food court lounge on the ground floor and a snack bar on the second floor.',
  },
  {
    question: 'Will sessions be recorded?',
    answer: 'Some sessions or event content will be photographed or recorded.',
  },
  {
    question: 'Can I transfer my ticket if I can’t attend?',
    answer: 'We do not offer refunds or exchanges.',
  },
  {
    question: 'Is Cloud Summit a nonprofit event?',
    answer:
      'Yes. Cloud Summit is community-led, and supporting the local community is a core part of the event. Event profits are directed towards the nominated charity and no one from the organizing group, is paid anything. That includes directors to volunteers.',
  },
  {
    question: 'Is there a code of conduct?',
    answer:
      'Yes. We want Cloud Summit to be welcoming, inclusive, and respectful for everyone attending. Attendees, speakers, volunteers, and sponsors are all expected to behave professionally and respectfully.',
  },
  {
    question: 'How do I stay updated?',
    answer:
      'The best way is to check CloudSummit.ca regularly and follow the event’s social channels for speaker announcements, schedule updates, and new event details.',
  },
];
