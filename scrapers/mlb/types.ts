import { Page } from "puppeteer";

export interface TeamConfig {
  url: string;
  url2?: string;
  url3?: string;
  giveawayList: string;
  giveawayListItem: string;
  giveawaylistItemHeading: string;
  giveawayScript: string;
  league: string;
  timeZone: string;
}

export interface TeamList {
  [teamName: string]: TeamConfig;
}

export interface RawEvent {
  rawName: string;
  matchup?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  timeAndZone?: string;
  location?: string;
  offerURL?: string;
}

export interface FormattedEvent extends RawEvent {
  league: string;
  teamName: string;
  eventName: string;
  dayOfWeek: string;
}

export type PuppeteerPage = Page;
