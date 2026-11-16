import type { CollectionConfig } from 'payload'

import { anyone, isAdmin, isLoggedIn } from '@/access'
import { formatSlug } from '@/lib/slug'

export const Leagues: CollectionConfig = {
  slug: 'leagues',
  // Drag rows in the list view to change the order leagues appear on the site.
  orderable: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'sport'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Shown in the site navigation, e.g. "NBA" or "NBA G League".' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [formatSlug('name')] },
      admin: {
        description:
          'Used in the web address, e.g. "nba" gives /nba. Leave blank to create it from the name.',
      },
    },
    {
      name: 'sport',
      type: 'select',
      required: true,
      options: [
        { label: 'Baseball', value: 'baseball' },
        { label: 'Basketball', value: 'basketball' },
        { label: 'Football', value: 'football' },
        { label: 'Hockey', value: 'hockey' },
      ],
      admin: { description: 'Decides which icon is shown for this league.' },
    },
    {
      name: 'teams',
      type: 'join',
      collection: 'teams',
      on: 'league',
      defaultSort: 'name',
      admin: { defaultColumns: ['name', 'slug', 'venue'] },
    },
  ],
}
