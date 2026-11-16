import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import {
  DAYS_OF_WEEK,
  dayOfWeekFor,
  dayToStoredDate,
  normalizeTime,
  storedDateToDay,
} from '@/lib/dates'
import { validateUrl } from '@/lib/validate'

const relationId = (value: unknown): number | undefined => {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value) return value.id as number
  return undefined
}

export const Events: CollectionConfig = {
  slug: 'events',
  defaultSort: 'date',
  labels: { singular: 'Event', plural: 'Events' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'team', 'date', 'time', 'league'],
    listSearchableFields: ['title'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        // League and day of week are derived so they can never disagree with
        // the team and date an editor picked.
        const teamId = relationId(data.team)
        if (teamId && (data.league === undefined || teamId !== relationId(originalDoc?.team))) {
          const team = await req.payload.findByID({
            collection: 'teams',
            id: teamId,
            depth: 0,
            req,
          })
          data.league = team.league
        }
        if (data.date) data.dayOfWeek = dayOfWeekFor(storedDateToDay(data.date))
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Giveaway or promotion',
      required: true,
      hooks: {
        beforeValidate: [({ value }) => (typeof value === 'string' ? value.trim() : value)],
      },
      admin: { description: 'What fans get or what the night is, e.g. "Bobblehead Night".' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'team',
          type: 'relationship',
          relationTo: 'teams',
          label: 'Home team',
          required: true,
          index: true,
          admin: { width: '50%' },
        },
        {
          name: 'opponent',
          type: 'relationship',
          relationTo: 'teams',
          admin: { width: '50%', description: 'The visiting team. Pick the home team first.' },
          filterOptions: async ({ siblingData, req }) => {
            const teamId = relationId((siblingData as { team?: unknown })?.team)
            if (!teamId) return true
            const team = await req.payload.findByID({
              collection: 'teams',
              id: teamId,
              depth: 0,
              req,
            })
            return { league: { equals: team.league }, id: { not_equals: teamId } }
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          index: true,
          hooks: {
            beforeValidate: [
              ({ value }) => (value ? dayToStoredDate(storedDateToDay(value)) : value),
            ],
          },
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'EEE, MMM d, yyyy' },
          },
        },
        {
          name: 'time',
          type: 'text',
          label: 'Start time',
          hooks: {
            beforeValidate: [
              ({ value }) => (typeof value === 'string' ? (normalizeTime(value) ?? value) : value),
            ],
          },
          validate: (value: string | null | undefined) =>
            !value || normalizeTime(value) ? true : 'Enter a time like "7:30 PM".',
          admin: {
            width: '50%',
            placeholder: '7:30 PM',
            description: 'Local time at the venue. Leave blank if not announced yet.',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Only if different from the team’s usual',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'venue',
          type: 'text',
          admin: { description: 'Leave blank to use the home team’s venue.' },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link',
          validate: validateUrl,
          admin: { description: 'Leave blank to link to the home team’s promotions page.' },
        },
      ],
    },
    {
      name: 'league',
      type: 'relationship',
      relationTo: 'leagues',
      index: true,
      admin: { position: 'sidebar', readOnly: true, description: 'Set from the home team.' },
    },
    {
      name: 'dayOfWeek',
      type: 'select',
      index: true,
      options: DAYS_OF_WEEK.map((day) => ({
        label: day[0].toUpperCase() + day.slice(1),
        value: day,
      })),
      admin: { position: 'sidebar', readOnly: true, description: 'Set from the date.' },
    },
  ],
}
