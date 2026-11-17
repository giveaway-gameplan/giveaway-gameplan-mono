# Giveaway Gameplan

Giveaway Gameplan lists promotional giveaways (bobbleheads, jerseys, hats and more) at sports games, so fans can find them by league, team, city, state, date or day of the week.

It is a single [Next.js](https://nextjs.org/) app with [Payload CMS](https://payloadcms.com/) built in. Editors add leagues, teams and events in the admin panel at `/admin`; the public site reads the same database directly. It runs on Vercel with a Neon Postgres database.

## Project structure

```
src/
  app/(frontend)/   Public site (App Router, Tailwind CSS)
  app/(payload)/    Payload admin panel and REST/GraphQL API (generated, don't edit)
  collections/      Content model: Leagues, Teams, Events, Users
  access/           Who can read and change what
  lib/              Event queries, date helpers, validation
  migrations/       Database migrations
  seed/             One-time import of the pre-CMS data
scrapers/           Local-only Puppeteer scripts (separate package, not deployed)
```

## Content model

- **Leagues** have a name, a URL slug and a sport (which decides the icon), plus optional page colors: an accent and a background for light mode and for dark mode, applied to that league's pages. Drag them in the admin list to reorder the site navigation.
- **Teams** belong to a league and hold the home venue, its city and state (which power the site's city and state filters), and the link to the team's promotions page.
- **Events** are a giveaway at one home game: title, home team, opponent, date and start time, plus an optional link to a photo that is shown on the event's card. Venue and link come from the home team unless the event overrides them. League and day of week are filled in automatically.
- **Users** are either admins or editors. Editors manage leagues, teams and events; admins can also manage users and delete leagues and teams. The first account created becomes an admin.

Event dates are calendar days at the venue and times are local to the venue, so nothing shifts with the viewer's timezone.

## Getting started

Requires Node.js 24+ and pnpm.

```bash
pnpm install
cp .env.example .env   # then fill in DATABASE_URI and PAYLOAD_SECRET
pnpm migrate           # create the database tables
pnpm dev
```

Open http://localhost:3000/admin to create the first (admin) account, and http://localhost:3000 for the site.

To load every league and team plus the 2025-26 events that predate the CMS, run `pnpm seed` once. It skips anything that already exists.

For local development, point `DATABASE_URI` at a separate Neon branch rather than the production database.

## Changing the content model

After editing anything in `src/collections`:

```bash
pnpm generate:types           # refresh src/payload-types.ts
pnpm migrate:create my-change # write a migration for the schema change
pnpm migrate                  # apply it
```

Commit the migration. Vercel applies pending migrations on every deploy.

## Deploying to Vercel

1. Import the repository in Vercel (framework: Next.js, root directory: the repo root).
2. Set the environment variables `DATABASE_URI` (Neon pooled connection string; `DATABASE_URL` from Vercel's Neon integration also works) and `PAYLOAD_SECRET`.
3. Deploy. The build command in `vercel.json` runs `payload migrate` and then `next build`.

Preview deployments run migrations too, so give the Preview environment its own Neon branch if you plan to change the schema in pull requests.

## Scrapers

`scrapers/` holds the MLB and NHL promotion-page scrapers. They run on your own machine and add events through the CMS API. See [scrapers/README.md](scrapers/README.md).
