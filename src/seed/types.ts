/** Shape of the hand-entered 2025-26 records under ./data, from before the CMS. */
export type LegacyEvent = {
  league: string
  teamName: string
  eventName: string
  rawName: string
  matchup: string
  startDate: string
  endDate: string
  description: string
  timeAndZone: string
  location: string
  offerURL: string
  dayOfWeek: string
}
