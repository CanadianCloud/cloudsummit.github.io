import type { City } from './cityContent';
import { getCityFromUrl, setCityInUrl, defaultCity } from './cityContent';

class CityStore {
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
		
		this.currentCity = city;
		
		if (updateUrl && typeof window !== 'undefined') {
			setCityInUrl(city);
		}
		
		// Notify all listeners
		this.listeners.forEach(listener => listener(city));
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

export function getCityStore(): CityStore {
	if (typeof window === 'undefined') {
		return {
			getCity: () => defaultCity,
			setCity: () => {},
			subscribe: () => () => {},
			init: () => {},
		} as CityStore;
	}
	
	if (!storeInstance) {
		storeInstance = new CityStore();
	}
	
	return storeInstance;
}

export const cityStore = typeof window !== 'undefined' 
	? getCityStore()
	: { getCity: () => defaultCity, setCity: () => {}, subscribe: () => () => {}, init: () => {} } as CityStore;

