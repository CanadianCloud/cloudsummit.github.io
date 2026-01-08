import type { City } from './cityContent';
import { getCityStore } from './cityStore';

/**
 * Hook to access and subscribe to city state
 * Use this in client-side components to reactively update based on city
 */
export function useCity() {
	const store = getCityStore();
	
	return {
		getCity: () => store.getCity(),
		setCity: (city: City) => store.setCity(city),
		subscribe: (callback: (city: City) => void) => store.subscribe(callback),
		init: () => store.init(),
	};
}

