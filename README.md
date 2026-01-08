# Cloud Summit 2026

A modern website built with [Astro](https://astro.build) for Cloud Summit 2026.

## 🚀 Quick Start

```sh
npm install
npm run dev
```

Visit `http://localhost:4321` to see your site.

## 📁 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CitySelector.astro
│   │   ├── Hero.astro
│   │   └── Navigation.astro
│   ├── lib/
│   │   ├── cityContent.ts    # City-specific content data
│   │   ├── cityStore.ts      # State management for city selection
│   │   └── useCity.ts        # Helper hook for city state
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🏙️ City Management

This site supports two cities: **Vancouver** and **Toronto**. The city selection is managed through:

- **URL Parameters**: Use `?city=vancouver` or `?city=toronto` in the URL
- **City Selector**: Dropdown in the navigation bar
- **State Management**: Centralized store that syncs URL params with component state

### How It Works

1. **URL Parameter**: The city is read from the URL parameter on page load
2. **State Store**: A singleton store manages the current city state
3. **Reactive Updates**: Components subscribe to city changes and update automatically
4. **Browser Navigation**: Back/forward buttons work correctly with city state

### Adding City-Specific Content

Edit `src/lib/cityContent.ts` to add or modify city-specific content:

```typescript
export const cityContent: Record<City, CityContent> = {
  vancouver: {
    name: 'vancouver',
    displayName: 'Vancouver',
    title: 'Cloud Summit 2026 - Vancouver',
    // ... more content
  },
  toronto: {
    // ... toronto content
  },
};
```

### Using City State in Components

```typescript
import { getCityStore } from '../lib/cityStore';
import { cityContent } from '../lib/cityContent';

const cityStore = getCityStore();
cityStore.init();

// Get current city
const currentCity = cityStore.getCity();

// Subscribe to changes
cityStore.subscribe((city) => {
  const content = cityContent[city];
  // Update your component
});
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
