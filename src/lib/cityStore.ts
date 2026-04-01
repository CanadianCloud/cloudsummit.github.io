import type { City } from './cityContent';
import { getCityFromUrl, setCityInUrl, defaultCity } from './cityContent';

/** Public API (used for SSR stubs that are not full `CityStore` instances). */
export interface CityStoreApi {
	getCity(): City;
	setCity(city: City, updateUrl?: boolean, forceUpdate?: boolean): void;
	subscribe(listener: (city: City) => void): () => void;
	init(): void;
}

class CityStore implements CityStoreApi {
	private currentCity: City = defaultCity;
	private listeners: Set<(city: City) => void> = new Set();
	private initialized: boolean = false;

	constructor() {
		// Initialize will be called on client side
	}

	init(): void {
		if (this.initialized || typeof window === 'undefined') return;
		
		this.initialized = true;
		this.currentCity = getCityFromUrl();
		
		// Listen for browser back/forward navigation
		window.addEventListener('popstate', () => {
			const newCity = getCityFromUrl();
			if (newCity !== this.currentCity) {
				this.setCity(newCity, false);
			}
		});
	}

	getCity(): City {
		return this.currentCity;
	}

	setCity(city: City, updateUrl: boolean = true, forceUpdate: boolean = false): void {
		// Only skip if city is the same AND we're not forcing an update
		// This allows updating the URL even if the city value is the same
		if (this.currentCity === city && !forceUpdate) return;

		const previousCity = this.currentCity;
		this.currentCity = city;

		if (updateUrl && typeof window !== 'undefined') {
			setCityInUrl(city);
		}

		// Explicit city switch (dropdown/modal): jump to top. Skip for popstate (updateUrl false).
		if (
			typeof window !== 'undefined' &&
			updateUrl &&
			previousCity !== city
		) {
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
		}

		this.listeners.forEach((listener) => listener(city));

		// Toronto hides large sections (schedule, speakers, event map). Layout changes
		// after listeners run; GSAP ScrollTrigger must refresh or sections can stay opacity: 0.
		if (typeof window !== 'undefined') {
			void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						ScrollTrigger.refresh();
					});
				});
			});
		}
	}

	subscribe(listener: (city: City) => void): () => void {
		this.listeners.add(listener);
		
		// Return unsubscribe function
		return () => {
			this.listeners.delete(listener);
		};
	}
}

// Create singleton instance
let storeInstance: CityStore | null = null;

export function getCityStore(): CityStoreApi {
	if (typeof window === 'undefined') {
		return {
			getCity: () => defaultCity,
			setCity: () => {},
			subscribe: () => () => {},
			init: () => {},
		};
	}
	
	if (!storeInstance) {
		storeInstance = new CityStore();
	}
	
	return storeInstance;
}

export const cityStore: CityStoreApi =
	typeof window !== 'undefined'
		? getCityStore()
		: {
				getCity: () => defaultCity,
				setCity: () => {},
				subscribe: () => () => {},
				init: () => {},
			};

