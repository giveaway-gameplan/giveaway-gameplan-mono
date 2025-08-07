export type Event = {
  id: number;
  league: string;
  team_name: string;
  event_name: string;
  raw_name: string;
  matchup: string;
  start_date: string; // use ISO string format: 'YYYY-MM-DD'
  end_date: string; // same as above
  description: string;
  time_and_zone: string;
  location: string;
  offer_url: string;
  day_of_week: string;
  created_at?: string; // ISO 8601 string (TIMESTAMPTZ)
  updated_at?: string;
};
