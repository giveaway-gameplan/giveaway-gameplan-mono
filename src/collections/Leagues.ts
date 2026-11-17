import type { CollectionConfig, TextField } from 'payload'

import { anyone, isAdmin, isLoggedIn } from '@/access'
import { formatSlug } from '@/lib/slug'
import { normalizeHexColor, validateHexColor } from '@/lib/theme'

const colorField = (name: string, label: string, description: string): TextField => ({
  name,
  type: 'text',
  label,
  validate: validateHexColor,
  hooks: { beforeValidate: [({ value }) => normalizeHexColor(value)] },
  admin: {
    width: '50%',
    description,
    components: { Field: '/components/admin/ColorField' },
  },
})

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
      name: 'theme',
      type: 'group',
      label: 'Page colors',
      admin: {
        description:
          'Optional colors for this league’s pages (and its teams’ pages). The site can be viewed in a light or a dark mode, so each has its own pair. Anything left empty keeps the site’s usual color.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            colorField(
              'lightAccent',
              'Light mode accent',
              'Highlights such as dates, links and the selected team. Pick something dark enough to read on a light page.',
            ),
            colorField(
              'lightBackground',
              'Light mode background',
              'The page behind everything. Text, cards and borders adjust to stay readable.',
            ),
          ],
        },
        {
          type: 'row',
          fields: [
            colorField(
              'darkAccent',
              'Dark mode accent',
              'Highlights in dark mode. Pick something bright enough to read on a dark page.',
            ),
            colorField(
              'darkBackground',
              'Dark mode background',
              'The page behind everything in dark mode.',
            ),
          ],
        },
      ],
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
