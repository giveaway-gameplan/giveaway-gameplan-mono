import type { League } from '@/payload-types'

export type LeagueTheme = League['theme']

const HEX_COLOR = /^#[0-9a-f]{6}$/

export const isHexColor = (value: unknown): value is string =>
  typeof value === 'string' && HEX_COLOR.test(value)

/** "FFB81C", "#ffb81c " and "#FB1" all become "#ffb81c" style values where possible. */
export const normalizeHexColor = (value: unknown): unknown => {
  if (typeof value !== 'string') return value
  const hex = value.trim().toLowerCase().replace(/^#/, '')
  if (!hex) return null
  if (/^[0-9a-f]{3}$/.test(hex)) return `#${[...hex].map((digit) => digit + digit).join('')}`
  return `#${hex}`
}

export const validateHexColor = (value: string | null | undefined) =>
  !value || isHexColor(value) ? true : 'Enter a color as six hex digits, like #1d428a.'

// The site's own text colours, so custom pages still read as part of it.
const DARK_TEXT = 'oklch(0.21 0.02 262)'
const LIGHT_TEXT = 'oklch(0.98 0.005 85)'

/** WCAG relative luminance, 0 (black) to 1 (white). */
const luminance = (hex: string): number => {
  const [red, green, blue] = [1, 3, 5].map((start) => {
    const channel = parseInt(hex.slice(start, start + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

/** Whichever of the site's dark and light text colours stands out more against a colour. */
const textOn = (hex: string) => (luminance(hex) > 0.179 ? DARK_TEXT : LIGHT_TEXT)

const mix = (color: string, share: number, into: string) =>
  `color-mix(in oklch, ${color} ${share}%, ${into})`

/**
 * The theme tokens (see globals.css) that one mode's colour choices replace.
 * An accent recolours highlights; a background recolours the whole page, with
 * text, cards and borders worked out from it so the page stays readable.
 */
const tokens = (accent: unknown, background: unknown): string[] => {
  const lines: string[] = []

  if (isHexColor(accent)) {
    lines.push(
      `--primary: ${accent}`,
      `--primary-foreground: ${textOn(accent)}`,
      `--ring: ${accent}`,
    )
  }

  if (isHexColor(background)) {
    const text = textOn(background)
    const raised = mix(background, 93, text)
    const subtle = mix(background, 87, text)
    lines.push(
      `--background: ${background}`,
      `--foreground: ${text}`,
      `--card: ${raised}`,
      `--card-foreground: ${text}`,
      `--popover: ${raised}`,
      `--popover-foreground: ${text}`,
      `--secondary: ${subtle}`,
      `--secondary-foreground: ${text}`,
      `--muted: ${subtle}`,
      `--muted-foreground: ${mix(text, 68, background)}`,
      `--accent: ${subtle}`,
      `--accent-foreground: ${text}`,
      `--border: ${mix(text, 14, background)}`,
      `--input: ${mix(text, 20, background)}`,
    )
  }

  return lines
}

/**
 * CSS that restyles the page with a league's colours, or null if it has none.
 * Only values that pass isHexColor reach the output, so it is safe to inline.
 */
export const leagueThemeCss = (theme: LeagueTheme): string | null => {
  const light = tokens(theme?.lightAccent, theme?.lightBackground)
  const dark = tokens(theme?.darkAccent, theme?.darkBackground)
  const rules = [
    light.length && `:root:not(.dark){${light.join(';')}}`,
    dark.length && `:root.dark{${dark.join(';')}}`,
  ].filter(Boolean)
  return rules.length ? rules.join('') : null
}
