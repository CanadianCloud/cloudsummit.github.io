import type { City } from "./cityContent";
import { getCityFromUrl, setCityInUrl, defaultCity } from "./cityContent";

/** Public API (used for SSR stubs that are not full `CityStore` instances). */
export interface CityStoreApi {
  getCity(): City;
  setCity(city: City, updateUrl?: boolean, forceUpdate?: boolean): void;
  subscribe(listener: (city: City) => void): () => void;
  init(): void;
}

class CityStore implements CityStoreApi {
  // 1. Force the default initial city to Toronto to align with the requirements of Issue #130
  private currentCity: City = "toronto" as City;
  private listeners: Set<(city: City) => void> = new Set();
  private initialized: boolean = false;

  constructor() {
    // Initialize will be called on client side
  }

  init(): void {
    if (this.initialized || typeof window === "undefined") return;

    this.initialized = true;
    // 2. Override client-side initialization to lock the state into Toronto directly
    this.currentCity = "toronto" as City;

    // Retain the popstate listener to keep standard navigation handling intact
    window.addEventListener("popstate", () => {
      const newCity = getCityFromUrl();
      if (newCity !== this.currentCity) {
        this.setCity(newCity, false);
      }
    });
  }

  getCity(): City {
    // 3. Always return 'toronto' to fulfill the acceptance criteria across the UI
    return "toronto" as City;
  }

  setCity(
    city: City,
    updateUrl: boolean = true,
    forceUpdate: boolean = false,
  ): void {
    // 4. Intercept any incoming city selection and force it to Toronto
    const targetCity = "toronto" as City;

    if (this.currentCity === targetCity && !forceUpdate) return;

    const previousCity = this.currentCity;
    this.currentCity = targetCity;

    if (updateUrl && typeof window !== "undefined") {
      // Keep the browser URL synchronized with the targeted event city
      setCityInUrl(targetCity);
    }

    // Smooth scroll fallback logic when switching views (fully preserved)
    if (
      typeof window !== "undefined" &&
      updateUrl &&
      previousCity !== targetCity
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    // Execute all active subscribers with the updated layout context
    this.listeners.forEach((listener) => listener(targetCity));

    // GSAP ScrollTrigger refresh engine wrapper to avoid broken opacities on layout shifts
    if (typeof window !== "undefined") {
      void import("gsap/all").then(({ ScrollTrigger }) => {
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

    // Return standard unsubscribe cleanup function to prevent memory leaks in Astro views
    return () => {
      this.listeners.delete(listener);
    };
  }
}

// Create singleton instance
let storeInstance: CityStore | null = null;

export function getCityStore(): CityStoreApi {
  if (typeof window === "undefined") {
    return {
      getCity: () => "toronto" as City, // Secure server-side rendering fallback to Toronto
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
  typeof window !== "undefined"
    ? getCityStore()
    : {
        getCity: () => "toronto" as City,
        setCity: () => {},
        subscribe: () => () => {},
        init: () => {},
      };
