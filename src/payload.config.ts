import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Events } from './collections/Events'
import { Leagues } from './collections/Leagues'
import { Teams } from './collections/Teams'
import { Users } from './collections/Users'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Giveaway Gameplan' },
  },
  collections: [Events, Teams, Leagues, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    // Vercel's Neon integration provides DATABASE_URL; local .env files use DATABASE_URI.
    pool: { connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema changes go through migrations (`pnpm migrate:create`) so that
    // local and production databases can never drift apart.
    push: false,
  }),
  sharp,
})
