export type City = 'vancouver' | 'toronto';

export interface CityContent {
	name: string;
	displayName: string;
	title: string;
	subtitle: string;
	description: string;
	venue?: string;
	date?: string;
}

export const cityContent: Record<City, CityContent> = {
	vancouver: {
		name: 'vancouver',
		displayName: 'Vancouver',
		title: 'Cloud Summit 2026 - Vancouver',
		subtitle: 'Sponsor Canada\'s Largest Multi-Cloud Conference',
		description: 'Connect with over 1,000 cloud professionals and decision-makers. Showcase your brand at this premier gathering of AWS, Azure, Google Cloud, and IBM Cloud experts.',
		venue: 'Science World',
		date: 'Friday, May 1st, 2026 • 2pm-9pm',
	},
	toronto: {
		name: 'toronto',
		displayName: 'Toronto',
		title: 'Cloud Summit 2026 - Toronto',
		subtitle: 'Sponsor Canada\'s Largest Multi-Cloud Conference',
		description: 'Connect with over 1,500 cloud professionals and decision-makers. Showcase your brand at this premier gathering of AWS, Azure, Google Cloud, and IBM Cloud experts.',
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

