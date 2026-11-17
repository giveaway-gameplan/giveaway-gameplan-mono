import type { CollectionConfig } from 'payload'

import { anyone, isAdmin, isLoggedIn } from '@/access'
import { REGIONS } from '@/lib/regions'
import { formatSlug } from '@/lib/slug'
import { validateUrl } from '@/lib/validate'

export const Teams: CollectionConfig = {
  slug: 'teams',
  defaultSort: 'name',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'league', 'city', 'state', 'venue'],
    listSearchableFields: ['name', 'slug'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  // Team nicknames repeat across leagues (NBA Kings, NHL Kings), so a slug only
  // has to be unique inside its own league.
  indexes: [{ fields: ['league', 'slug'], unique: true }],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Events carry a copy of their team's league for filtering; keep it in step.
        if (operation === 'update' && previousDoc && previousDoc.league !== doc.league) {
          await req.payload.update({
            collection: 'events',
            where: { team: { equals: doc.id } },
            data: { league: doc.league },
            req,
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Full team name, e.g. "Atlanta Hawks".' },
    },
    {
      name: 'league',
      type: 'relationship',
      relationTo: 'leagues',
      required: true,
      index: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      hooks: { beforeValidate: [formatSlug('name')] },
      admin: {
        description:
          'Used in the web address, e.g. "hawks" gives /nba/hawks. Leave blank to create it from the name.',
      },
    },
    {
      name: 'venue',
      type: 'text',
      admin: {
        description:
          'Home arena or stadium. Used for every home event unless the event says otherwise.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          hooks: {
            beforeValidate: [({ value }) => (typeof value === 'string' ? value.trim() : value)],
          },
          admin: {
            width: '50%',
            description: 'City the home venue is in. Fans can filter events by it.',
          },
        },
        {
          name: 'state',
          type: 'select',
          label: 'State or province',
          options: Object.entries(REGIONS).map(([value, label]) => ({ label, value })),
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'promotionsUrl',
      type: 'text',
      label: 'Promotions page',
      validate: validateUrl,
      admin: {
        description:
          "Link to the team's official promotions page. Events link here unless they have their own link.",
      },
    },
    {
      name: 'events',
      type: 'join',
      collection: 'events',
      on: 'team',
      defaultSort: '-date',
      admin: { defaultColumns: ['title', 'date', 'time'] },
    },
  ],
}
