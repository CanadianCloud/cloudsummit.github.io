import { Group } from "lucide-astro";

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

export type City = "vancouver" | "toronto";

export const defaultCity: City = "vancouver";

// Shared content across all cities
export const sharedHeroContent = {
  title: "Cloud Summit 2026",
  subtitle: "Sponsor Canada's Largest Multi-Cloud Conference",
  primaryCta: {
    text: "Become a Volunteer",
    href: "https://tally.so/r/mBVZjA",
  },
  secondaryCta: {
    text: "Become a Speaker",
    href: "https://tally.so/r/rjBeN5",
  },
};

// City-specific content
export const citySpecificContent: Record<City, CitySpecificContent> = {
  vancouver: {
    cityName: "Vancouver",
    venue: "Science World",
    address: "1455 Quebec St, Vancouver, BC V6A 3Z7",
    addressUrl: "https://maps.app.goo.gl/DQbdiQLYB1qe1iZn7",
    date: "Friday, May 1st, 2026",
    time: "2pm - 9pm",
    callForSpeakers: "February 2026",
    ticketUrl: "https://luma.com/cloudsummit26",
  },
  toronto: {
    cityName: "Toronto",
    venue: "Northeastern University",
    address: "375 Queen St W, Toronto, ON M5V 2A5",
    addressUrl: "https://maps.app.goo.gl/tqLCm7Z6r1ctT4Db8",
    date: "Saturday, August 29th, 2026",
    time: "12pm - 6pm",
    callForSpeakers: "April 2026",
    ticketUrl: "https://luma.com/0xpa2rxj",
  },
};

// Helper function to combine shared and city-specific content
export function getHeroContent(city: City): HeroContent {
  return {
    ...sharedHeroContent,
    ...citySpecificContent[city],
    // Added as part of Issue #3 (Header & Navigation)
    primaryCta: {
      text: "Get Your Ticket",
      href: citySpecificContent[city].ticketUrl,
    },
    secondaryCta: {
      text: "",
      href: "",
    },
  };
}

// For backwards compatibility
export const heroContent: Record<City, HeroContent> = {
  vancouver: getHeroContent("vancouver"),
  toronto: getHeroContent("toronto"),
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
      { text: "Get Tickets", href: citySpecificContent[city].ticketUrl },
      { text: "Apply to Volunteer", href: sharedHeroContent.primaryCta.href },
    ],
  };
}

// Default navigation content (for backwards compatibility)
export const navigationContent: NavigationContent =
  getNavigationContent(defaultCity);

export const aboutCPCAContent = {
  description:
    "As a non-profit organization, our purpose is to bring together & educate the local tech community about the cloud and support our local community through charity.",
  ctaText: "Learn More About CPCA",
  ctaHref: "https://canadiancloud.org",
};

export const whatIsCloudSummitContent = {
  heading: "Cloud Summit?",
  description:
    "Canada's premier multi-cloud conference bringing together 1,000+ cloud professionals, industry leaders, and decision-makers from AWS, Azure, Google Cloud, and IBM Cloud ecosystems. Connect, learn, and shape the future of cloud computing.",
};

export const cloudSummitActivitiesContent = {
  activities: [
    {
      title: "Expand Your Network",
      description:
        "Connect with industry leaders, decision-makers, and cloud professionals from across the country and beyond.",
      image: "/images/activities/networking.svg",
    },
    {
      title: "Watch Presentations",
      description:
        "Learn from expert speakers sharing the latest trends, best practices, and cloud innovations that are shaping the industry.",
      image: "/images/activities/presentations.svg",
    },
    {
      title: "Meet Tech Companies",
      description:
        "Discover cutting-edge solutions and services from leading cloud technology providers, sponsors, and innovative startups.",
      image: "/images/activities/tech_companies.svg",
    },
    {
      title: "High-Pressure Live Cloud Builds",
      description:
        "Watch top teams race the clock in live cloud showdowns, shipping under pressure as the crowd votes and shapes the action.",
      image: "/images/activities/laptop.svg",
    },
    {
      title: "Discover Communities",
      description:
        "Connect with local user groups, developer communities, and professional cloud organizations that drive innovation.",
      image: "/images/activities/communities.svg",
    },
    {
      title: "Participate in Workshops",
      description:
        "Get hands-on experience through interactive sessions on cloud platforms, tools, and practical implementations that matter.",
      image: "/images/activities/workshops.svg",
    },
  ],
};

export const eventHighlightsContent = {
  heading: "Event Highlights",
  description:
    "Explore what makes Cloud Summit an unforgettable experience for cloud professionals.",
};

export const tickerContent = {
  title: "Cloud Providers",
  prefix: "Explore",
};

export const eventMapContent = {
  /** Vancouver venue (Science World) — swap images/PDF when final assets are ready */
  venueLabel: "Vancouver · Science World",
  pdfHref: "/images/event-map/cloud-summit-floorplan.pdf",
  floors: [
    {
      id: "floor-1",
      label: "Floor 1",
      imageSrc: "/images/event-map/floor-1.png",
      imageAlt:
        "Isometric floor plan for Science World Floor 1 with highlighted areas and wayfinding icons",
      legend: [
        {
          iconSrc: "/images/event-map/icons/volunteers-lounge-restricted.png",
          title: "Volunteers lounge",
          detail: "restricted access",
        },
        {
          iconSrc: "/images/event-map/icons/community-lounge-food-drinks.png",
          title: "Community lounge",
          detail: "food and drinks",
        },
        {
          iconSrc: "/images/event-map/icons/speakers-lounge-restricted.png",
          title: "Speakers lounge",
          detail: "restricted access",
        },
        {
          iconSrc: "/images/event-map/icons/water-refill-station.png",
          title: "Water refill station",
        },
        {
          iconSrc: "/images/event-map/icons/washrooms.png",
          title: "Washrooms",
        },
        {
          iconSrc: "/images/event-map/icons/registration-tickets.png",
          title: "Registration and tickets",
        },
        {
          iconSrc: "/images/event-map/icons/venue-map-schedule.png",
          title: "Venue map and schedule",
        },
        {
          iconSrc: "/images/event-map/icons/entrance-exit.png",
          title: "Entrance and exit",
        },
        {
          iconSrc: "/images/event-map/icons/lockers-1-dollar.png",
          title: "Lockers",
          detail: "$1",
        },
        {
          iconSrc: "/images/event-map/icons/community-stage.png",
          title: "Community stage",
        },
        {
          iconSrc: "/images/event-map/icons/elevator.png",
          title: "Elevator",
        },
      ],
    },
    {
      id: "floor-2",
      label: "Floor 2",
      imageSrc: "/images/event-map/floor-2.png",
      imageAlt:
        "Science World Floor 2 map with highlighted areas and wayfinding icons",
      legend: [
        {
          iconSrc: "/images/event-map/icons/ai-experience.png",
          title: "Artificial Intelligence",
          detail: "experience",
        },
        {
          iconSrc: "/images/event-map/icons/sound-visual-experience.png",
          title: "Sound and visual",
          detail: "experience",
        },
        {
          iconSrc: "/images/event-map/icons/no-food-drink-allowed.png",
          title: "No food or drink allowed",
        },
        {
          iconSrc: "/images/event-map/icons/hackathon-teams-room.png",
          title: "Hackathon teams room",
        },
        {
          iconSrc: "/images/event-map/icons/water-refill-station.png",
          title: "Water refill station",
        },
        {
          iconSrc: "/images/event-map/icons/venue-map-schedule.png",
          title: "Venue map and schedule",
        },
        {
          iconSrc: "/images/event-map/icons/lockers-1-dollar.png",
          title: "Lockers",
          detail: "$1",
        },
        {
          iconSrc: "/images/event-map/icons/quiet-area-phone-calls.png",
          title: "Quiet area to take",
          detail: "phone calls",
        },
        {
          iconSrc: "/images/event-map/icons/main-stage.png",
          title: "Main stage",
        },
        {
          iconSrc: "/images/event-map/icons/cloud-security-experience.png",
          title: "Cloud security",
          detail: "experience",
        },
        {
          iconSrc: "/images/event-map/icons/elevator.png",
          title: "Elevator",
        },
        {
          iconSrc: "/images/event-map/icons/after-party-entrance.png",
          title: "After party entrance",
          detail: "restricted access",
        },
        {
          iconSrc: "/images/event-map/icons/washrooms.png",
          title: "Washrooms",
        },
        {
          iconSrc: "/images/event-map/icons/cloud-chamber.png",
          title: "Cloud chamber",
        },
      ],
    },
  ],
} as const;

export type EventMapContent = typeof eventMapContent;

// Helper function to get footer content with city-specific ticket URL
export function getFooterContent(city: City) {
  return {
    copyright: "Cloud Summit. All rights reserved.",
    links: [
      {
        col: 1,
        text: "Get a Ticket",
        href: citySpecificContent[city].ticketUrl,
      },
      { col: 1, text: "Call for Speakers", href: "/our-speakers/" },
      { col: 1, text: "Become a Sponsor", href: "https://tally.so/r/wLqXvO" },
      { col: 1, text: "Apply to Volunteer", href: "https://tally.so/r/mBVZjA" },
      { col: 1, text: "Enter Hackathon", href: "https://hackerrivals.com/" },

      { col: 2, text: "Press Release", href: "/archive/2025/index.html" },
      { col: 2, text: "About Cloud Summit", href: "/about-cloud-summit/" },
      {
        col: 2,
        text: "Subscribe to Newsletter",
        href: "https://tally.so/r/mR6RBl",
      },
      // { col: 2, text: 'Our Event Team', href: '/our-team' },
      // { col: 2, text: 'Sponsorship Info', href: '/our-sponsors' },

      { col: 3, text: "2025", href: "/archive/2025/index.html" },
      { col: 3, text: "2024", href: "/archive/2024.html" },
    ],
    social: [
      {
        name: "Instagram",
        url: "https://www.instagram.com/canadiancloudninja/",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/showcase/vancouvercloudsummit",
      },
    ],
    // pressReleases: [
    //   { text: '2025 Press Release', href: '/archive/2025/index.html' },
    // ],
    previousYears: [
      { text: "2025", href: "/archive/2025/index.html" },
      { text: "2024", href: "/archive/2024.html" },
    ],

    newsletter: {
      prefix: "Stay",
      heading: "Connected",
      description:
        "Subscribe to our newsletter to receive the latest updates about Cloud Summit 2026, speaker announcements, and exclusive content.",
      ctaText: "Subscribe to Newsletter",
      ctaHref: "https://tally.so/r/mR6RBl",
    },
  };
}

// Default footer content (for backwards compatibility)
export const footerContent = getFooterContent(defaultCity);

export const pastSponsorsContent = {
  prefix: "Thank You",
  heading: "Past Sponsors",
  description:
    "We are grateful to our past sponsors who have supported Cloud Summit and helped make our events successful.",
};

export const sponsorshipSponsorsContent = {
  prefix: "Our",
  heading: "Past Sponsors",
  description:
    "We are grateful to our sponsors who have supported Cloud Summit and helped make our events successful.",
};

export const newsletterContent = {
  prefix: "Stay",
  heading: "Connected",
  description:
    "Subscribe to our newsletter to receive the latest updates about Cloud Summit 2026, speaker announcements, and exclusive content.",
  ctaText: "Subscribe to Newsletter",
  ctaHref: "https://tally.so/r/mR6RBl",
};

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
  /** Subtitle under the main heading, same pattern as Event Map (e.g. Vancouver · Science World) */
  venueLabel: string;
  section: VenueLogisticsBase[];
}

export const venueLogisticsContentNewVersion: Record<
  City,
  VenueLogisticsSectionNewVersion
> = {
  vancouver: {
    venueLabel: "This is Intro Of Vancouver Venue",
    section: [
      {
        title: "Getting Here",
        bullets: [
          "1455 Quebec Street",
          "Vancouver, BC, V6A 3Z7",
          "604.443.7440",
          "Science World is located in the heart of Vancouver along the False Creek Seawall, and is easily reached by almost any way you can travel. We offer rentable lockers for your belongings and a number of other amenities to make your visit easy and comfortable.",
        ],
        externalLink: [
          {
            url: "https://goo.gl/maps/BUgVAAx1xjzZxBHu6",
            text: "Open in Maps",
          },
        ],
      },
      {
        title: "Transit",
        bullets: [
          "We are located across the street from the Main Street-Science World Skytrain Station along the Expo line, and a short walk from bus stops at Main and Terminal.",
        ],
        externalLink: [
          {
            text: "Plan Your Trip with TransLink",
            url: "https://www.google.com/maps/dir//Science+World+at+TELUS+World+of+Science,+1455+Quebec+St,+Vancouver,+BC+V6A+3Z7/@49.2733548,-123.1738736,12z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x548671638bf0919d:0x218237371f987037!2m2!1d-123.103834!2d49.273376!3e3?hl=en",
          },
        ],
      },

      {
        title: "Bike",
        bullets: [
          "You’ll find ample racks for locking up your bike in the plaza at the front entrance. Ensure you bring your own secure lock!",
        ],
        externalLink: [],
      },

      {
        title: "Mobi Bike Share",
        bullets: [
          "A Mobi Bike Share station is located just across the seawall cycling path near the front entrance, just under the Skytrain overpass. For more information about using Mobi, please visit the Mobi website.",
        ],
        externalLink: [
          {
            url: "https://www.mobibikes.ca/",
            text: "Visit Mobi Bike Share",
          },
        ],
      },

      {
        title: "Ferry",
        bullets: [
          "The Aquabus and False Creek Ferries both stop nearby and are easy ways to get here from Granville Island, English Bay, Yaletown, and Kitsilano. Check their websites for more details about docking locations, fees, and schedules.",
        ],
        externalLink: [
          {
            url: "https://theaquabus.com/",
            text: "Aquabus Website",
          },
          {
            url: "https://granvilleislandferries.bc.ca/",
            text: "False Creek Ferries Website",
          },
        ],
      },

      {
        title: "Car Share",
        bullets: [
          "Designated parking for Evo and Share Now (formerly Car2Go) vehicles are available in the parking lot across Quebec St.",
        ],
        externalLink: [],
      },

      {
        title: "Parking",
        bullets: [
          "We encourage all visitors to take transit but for those visitors who decide to drive we do have limited pay parking spaces. Please note that we do not have bus parking available.",
          "Parking Rates",
          "1 Hour           $5.25",
          "2 Hours          $9.95",
          "4 Hours          $15.25",
          "Until 6:30PM     $20.95",
          "From 5pm-2am     $10.50",
          "Pay parking areas support payment by phone and credit card.",
          "During special events in the neighbourhood these parking rates may change. In these cases, please pay inside at admissions to get the regular parking rate.",
        ],
        externalLink: [],
      },
      {
        title: "Accessible Parking",
        bullets: [
          "There are six wheelchair-accessible spaces in the parking lots. These are available on a first-come, first-served basis, and are located in the lots to the north and south of Science World. Ramps are available to reach the sidewalk.",
        ],
        externalLink: [],
      },
      {
        title: "Automated Entry and Exit Doors",
        bullets: [
          "Science World has button-operated automated entry doors and exit doors.",
        ],
        externalLink: [],
      },

      {
        title: "Ramps and Elevators",
        bullets: [
          "Science World has ramps that allow access to the first- and second-floor galleries, as well as to the OMNIMAX®️ theatre on the fifth floor. There are also two elevators which run between the first and second floors. We recommend using the elevator in the Connection Zone (near the lobby) to access the Wonder gallery.",
        ],
        externalLink: [],
      },
      {
        title: "Service Animals",
        bullets: [
          "Service dogs must be on a leash and in the company of their owner at all times. For the safety and comfort of all guests, service dogs must be well-behaved during their visit. Staff reserve the right to ask non-compliant owners and their dogs to leave the premises.",
        ],
        externalLink: [],
      },
      {
        title: "Washrooms",
        bullets: [
          "All public washrooms at Science World are equipped with baby-change facilities. All washrooms except for those on the OMNIMAX®️ ramp are wheelchair-accessible.",
        ],
        externalLink: [],
      },
    ],
  },
  toronto: {
    venueLabel: "Toronto · Northeastern University",
    section: [],
  },
};

export const committeeContent: Committee[] = [
  {
    name: "Matt Carolan",
    title: "Event Director",
    link: "https://www.linkedin.com/in/matthewcarolan/",
    bio: "Matt Carolan is the founder of Cloud Summit and a cloud and security leader with deep experience in platform engineering, enterprise architecture, and cloud transformation. He helps organizations make clear, practical decisions across security, cost, resilience, and operational complexity, combining hands-on technical depth with a global perspective shaped by living and working across Australia, Dubai, Seattle, and Vancouver.",
    image: "/images/committee/matt-black.png",
  },
  {
    name: "Bibi Souza",
    title: "Mentor ",
    link: "https://www.linkedin.com/in/bibschan/",
    bio: "Bibi is a community builder and strategic leader with experience across software engineering, project management, and advocacy. She is passionate about bringing people together and helping them grow, with a strong track record of turning fragmented audiences into thriving communities. As an exited founder, she brings an experimental mindset, a bias toward action, and thoughtful risk-taking to everything she builds. At Cloud Summit, she helps shape community with intention, energy, and purpose.",
    image: "/images/committee/bibi-black.png",
  },
  {
    name: "Andrey Barkov",
    title: "Emcee",
    link: "https://www.linkedin.com/in/andreybarkov/",
    bio: "Andrey is one of the emcees for Cloud Summit Vancouver. He is an experienced software engineer with a background in web applications, cloud infrastructure, and microservices, with expertise across Angular, React, C#, Node.js, Azure, and AWS. He brings strong technical knowledge and an agile mindset to the Cloud Summit community.",
    image: "/images/committee/andrey-black.png",
  },
  {
    name: "Warren Lyne",
    title: "Emcee",
    link: "https://www.linkedin.com/in/warrenlyne/",
    bio: "Warren is one of the emcees for Cloud Summit Vancouver. He brings over 20 years of experience across cloud, technical sales, and business development, helping enterprise customers use technology to drive innovation and growth. With deep knowledge of cloud strategy, enterprise solutions, and digital transformation, he combines technical credibility with strong leadership and communication skills.",
    image: "/images/committee/warren-black.png",
  },
  {
    name: "Fabio Simka Coutinho",
    title: "Venue and Logistics Co-Lead",
    link: "https://www.linkedin.com/in/fabio-simka/",
    bio: "Fabio is the Venue and Logistics Co-Lead for Cloud Summit Vancouver. After 10 years working in healthcare leadership, he transitioned into tech and is now focused on data engineering across AWS, Azure, and Databricks. With experience in high-pressure environments where communication, accountability, and clarity were essential, he brings a thoughtful, dependable approach to building systems and solving problems. His background gives him a strong focus on reliability, real-world impact, and the people behind the data.",
    image: "/images/committee/fabio-black.png",
  },
  {
    name: "Jhan (Shanky) Silva",
    title: "Sponsorship Lead",
    link: "https://www.linkedin.com/in/shankyjs/",
    bio: "Shanky is the Sponsorship Lead for Cloud Summit Vancouver. With a strong background in DevOps, automation, and modern development and deployment practices, he brings a practical, goal-oriented approach to building and improving technical processes. A self-driven learner who enjoys creating agile products, Shanky is passionate about continuous improvement, innovation, and helping great ideas gain momentum.",
    image: "/images/committee/shanky-black.png",
  },
  {
    name: "Michael Carlos",
    title: "Speaker and Community Lead",
    link: "https://www.linkedin.com/in/mcarlos/",
    bio: "Shanky is the Sponsorship Lead for Cloud Summit Vancouver. With a strong background in DevOps, automation, and modern development and deployment practices, he brings a practical, goal-oriented approach to building and improving technical processes. A self-driven learner who enjoys creating agile products, Shanky is passionate about continuous improvement, innovation, and helping great ideas gain momentum.",
    image: "/images/committee/michael-black.png",
  },
  {
    name: "Nichanun Pong (Luck)",
    title: "Developer Lead",
    link: "https://www.linkedin.com/in/nichanun-pong/",
    bio: "Luck is the Developer Lead for Cloud Summit Vancouver. A full-stack developer and product owner, she brings experience across e-commerce, gaming, insurance, and IT, with a focus on building user-centric, data-driven products that connect business goals with strong technical execution. His background includes JavaScript, React, Node.js, PHP, Laravel, SQL, Python, AWS, and Docker.",
    image: "/images/committee/luck-black.png",
  },
  {
    name: "Fernando Stoelting",
    title: "Venue and Logistics Co-Lead ",
    link: "https://www.linkedin.com/in/fstoelting/",
    bio: "Shanky is the Sponsorship Lead for Cloud Summit Vancouver. With a strong background in DevOps, automation, and modern development and deployment practices, he brings a practical, goal-oriented approach to building and improving technical processes. A self-driven learner who enjoys creating agile products, Shanky is passionate about continuous improvement, innovation, and helping great ideas gain momentum.",
    image: "/images/committee/fernando-black.png",
  },
  {
    name: "Philip Mak",
    title: "Volunteer Lead",
    link: "https://www.linkedin.com/in/philip-mak-b2b92823a/",
    bio: "Philip is the Volunteer Lead for Cloud Summit Vancouver. He is a project management professional with experience leading data-driven technical projects across AI, education technology, and community-focused platforms. With a strong background in collaboration, analytics, and user-centered problem solving, he brings an organized and thoughtful approach to supporting volunteers and helping teams succeed.",
    image: "/images/committee/philip-black.png",
  },
];
