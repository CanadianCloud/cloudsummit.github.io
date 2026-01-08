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
	ctaText: string;
	ctaHref: string;
}

export type City = 'vancouver' | 'toronto';

export const defaultCity: City = 'vancouver';

// Shared content across all cities
export const sharedHeroContent = {
	title: 'Cloud Summit 2026',
	subtitle: 'Sponsor Canada\'s Largest Multi-Cloud Conference',
	primaryCta: {
		text: 'Become a Sponsor',
		href: 'https://tally.so/r/wLqXvO',
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
	};
}

// For backwards compatibility
export const heroContent: Record<City, HeroContent> = {
	vancouver: getHeroContent('vancouver'),
	toronto: getHeroContent('toronto'),
};

// Helper function to get navigation content with city-specific ticket URL
export function getNavigationContent(city: City): NavigationContent {
	return {
		links: [
			{ text: 'About Cloud Summit', href: '/about-cloud-summit' },
			// { text: 'Our Event Team', href: '/our-team' },
			{ text: 'Call for Speakers', href: '/our-speakers' },
			{ text: 'Sponsorship Info', href: '/our-sponsors' },
			{ text: 'Get Earlybird Tickets', href: citySpecificContent[city].ticketUrl },
		],
		ctaText: 'Become a Sponsor',
		ctaHref: 'https://tally.so/r/wLqXvO',
	};
}

// Default navigation content (for backwards compatibility)
export const navigationContent: NavigationContent = getNavigationContent(defaultCity);

export const aboutCPCAContent = {
	description: 'As a non-profit organization, our purpose is to bring together & educate the local tech community about the cloud and support our local community through charity.',
	ctaText: 'Learn More About CPCA',
	ctaHref: 'https://canadiancloud.org',
};

export const whatIsCloudSummitContent = {
	heading: 'Cloud Summit?',
	description: 'Canada\'s premier multi-cloud conference bringing together 1,000+ cloud professionals, industry leaders, and decision-makers from AWS, Azure, Google Cloud, and IBM Cloud ecosystems. Connect, learn, and shape the future of cloud computing.',
};

export const cloudSummitActivitiesContent = {
	activities: [
		{
			title: 'Expand Your Network',
			description: 'Connect with industry leaders, decision-makers, and cloud professionals from across the country and beyond.',
			image: '/images/activities/networking.svg',
		},
		{
			title: 'Watch Presentations',
			description: 'Learn from expert speakers sharing the latest trends, best practices, and cloud innovations that are shaping the industry.',
			image: '/images/activities/presentations.svg',
		},
		{
			title: 'Meet Tech Companies',
			description: 'Discover cutting-edge solutions and services from leading cloud technology providers, sponsors, and innovative startups.',
			image: '/images/activities/tech_companies.svg',
		},
		{
			title: 'High-Pressure Live Cloud Builds',
			description: 'Watch top teams race the clock in live cloud showdowns, shipping under pressure as the crowd votes and shapes the action.',
			image: '/images/activities/laptop.svg',
		},
		{
			title: 'Discover Communities',
			description: 'Connect with local user groups, developer communities, and professional cloud organizations that drive innovation.',
			image: '/images/activities/communities.svg',
		},
		{
			title: 'Participate in Workshops',
			description: 'Get hands-on experience through interactive sessions on cloud platforms, tools, and practical implementations that matter.',
			image: '/images/activities/workshops.svg',
		},
	],
};

export const eventHighlightsContent = {
	heading: 'Event Highlights',
	description: 'Explore what makes Cloud Summit an unforgettable experience for cloud professionals.',
};

export const tickerContent = {
	title: 'Cloud Providers',
	prefix: 'Explore',
};

// Helper function to get footer content with city-specific ticket URL
export function getFooterContent(city: City) {
	return {
		copyright: 'Cloud Summit. All rights reserved.',
		links: [
			{ text: 'About Cloud Summit', href: '/about-cloud-summit' },
			{ text: 'Our Event Team', href: '/our-team' },
			{ text: 'Call for Speakers', href: '/our-speakers' },
			{ text: 'Sponsorship Info', href: '/our-sponsors' },
			{ text: 'Get Earlybird Tickets', href: citySpecificContent[city].ticketUrl },
		],
		social: [
			{ name: 'Instagram', url: 'https://www.instagram.com/canadiancloudninja/' },
			{ name: 'LinkedIn', url: 'https://www.linkedin.com/showcase/vancouvercloudsummit' },
		],
		pressReleases: [
			{ text: '2025 Press Release', href: 'https://cloudsummit.ca/press' },
		],
		previousYears: [
			{ text: '2025', href: 'https://2025.cloudsummit.ca' },
			{ text: '2024', href: 'https://2024.cloudsummit.ca' },
			{ text: '2023', href: 'https://2023.cloudsummit.ca' },
		],
	};
}

// Default footer content (for backwards compatibility)
export const footerContent = getFooterContent(defaultCity);

export const pastSponsorsContent = {
	prefix: 'Thank You',
	heading: 'Past Sponsors',
	description: 'We are grateful to our past sponsors who have supported Cloud Summit and helped make our events successful.',
};

export const sponsorshipSponsorsContent = {
	prefix: 'Our',
	heading: 'Past Sponsors',
	description: 'We are grateful to our sponsors who have supported Cloud Summit and helped make our events successful.',
};

export const newsletterContent = {
	prefix: 'Stay',
	heading: 'Connected',
	description: 'Subscribe to our newsletter to receive the latest updates about Cloud Summit 2026, speaker announcements, and exclusive content.',
	ctaText: 'Subscribe to Newsletter',
	ctaHref: 'https://tally.so/r/mR6RBl',
};
