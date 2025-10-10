# Giveaway Gameplan — Scrapers

This directory contains the MLB and NHL web scrapers for Giveaway Gameplan — a TypeScript-based project that collects sports team giveaway data and pushes it to the Giveaway Gameplan API.

Each scraper uses Puppeteer to navigate official team websites, extract giveaway/event data, format it, and send it to a centralized API endpoint.

## Features

• TypeScript support for static typing and safer async logic

• Puppeteer automation for consistent, headless scraping

• Per-league scrapers: separate entry points for MLB and NHL

• Config-driven: each scraper references team-specific selectors from local config files

• Batch API posting via fetch

• Fast local development with ts-node and optional compiled builds

## Setup

1. Install Dependencies
   1. From the scrapers directory:
   2. `pnpm install`
   3. (You can also use npm or yarn, but pnpm is recommended.)
2. Approve Puppeteer’s build script
   1. Puppeteer requires permission to download Chromium:
   2. `pnpm approve-builds puppeteer`

## Development

Run scrapers directly with TypeScript:

`pnpm run mlb`

`pnpm run nhl`

These commands execute .ts files via ts-node — no build step required.

## Build and Run Compiled Code

To compile TypeScript → JavaScript:

`pnpm run build`

Then run the compiled output:

`pnpm run start:mlb`

`pnpm run start:nhl`

This runs the built files in /dist/.

## TypeScript Configuration

The compiler is set up with:

```json
"rootDir": ".",

"outDir": "./dist",

"module": "commonjs",

"target": "es2020",

"lib": ["ES2020", "DOM"],

"types": ["node"],

"strict": true
```

This ensures modern JavaScript support, Node typings, and strict static analysis.

## API Endpoint

Each scraper posts its results to:

POST http://localhost:4000/api/v1/events/batch

The payload is an array of event objects formatted with:

```js
{
  league: string;
  teamName: string;
  eventName: string;
  startDate: string;
  endDate: string;
  description: string;
  timeAndZone: string;
  location: string;
  offerURL: string;
  dayOfWeek: string;
}
```

## Example Run

`pnpm run mlb`

Output:

```
Scraping New York Yankees...
Data posted successfully: { inserted: 81, updated: 0 }
Total scraping time: 01m 12s
```

## Dependencies

• TypeScript

• Puppeteer

• Cheerio

• puppeteer-extra

• puppeteer-extra-plugin-stealth

• puppeteer-extra-plugin-adblocker

## Notes

• Both scrapers currently assume local API access (localhost:4000).

• If deploying remotely, update the URL constant in each scraper file.

• To add more leagues, follow the existing directory and config pattern.
