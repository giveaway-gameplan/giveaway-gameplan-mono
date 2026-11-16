# Giveaway Gameplan scrapers

Puppeteer scripts that read MLB and NHL team promotion pages and add what they find to the Giveaway Gameplan CMS. They are run by hand from your own machine and are not part of the Vercel deployment.

## Setup

```bash
cd scrapers
pnpm install
cp .env.example .env
```

In the CMS admin panel, open **Users**, pick your user, tick **Enable API Key** and save. Put the key in `.env` as `PAYLOAD_API_KEY`, and set `PAYLOAD_URL` to the site you want to write to.

## Running

```bash
pnpm mlb          # print what was found, change nothing
pnpm mlb --push   # add new events to the CMS
pnpm nhl
pnpm nhl --push
```

Pushing is safe to repeat: an event is skipped if the same team already has one with the same title on the same date. Each scraped team must already exist in the CMS with a matching slug (for example `ducks` in the `nhl` league).

## How it fits together

- `mlb/teams.ts` and `nhl/teams.ts` hold the page URL and CSS selectors for each team. Team sites change often, so expect to update selectors.
- `mlb/index.ts` and `nhl/index.ts` scrape each team and turn the results into `{ team, title, opponent, date, time, venue, url }`.
- `lib/payload.ts` matches teams and opponents to CMS records and creates the events.
