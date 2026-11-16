import type { FieldHook } from 'payload'

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Cleans a typed slug, or builds one from another field when left blank. */
export const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    const fallback = data?.[fallbackField]
    return typeof fallback === 'string' ? slugify(fallback) : value
  }
