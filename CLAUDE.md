# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based website project for Cloud Summit 2026. The project uses Astro v5.15.9 with TypeScript in strict mode.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `src/pages/` - Astro pages (file-based routing)
- `public/` - Static assets served as-is
- `astro.config.mjs` - Astro configuration (currently using defaults)
- `tsconfig.json` - TypeScript configuration (extends astro/tsconfigs/strict)

## Architecture

This is a standard Astro project using:
- File-based routing in `src/pages/`
- TypeScript with strict mode enabled
- Default Astro configuration (no custom integrations or adapters)
