import puppeteer from "puppeteer";
import mlbTeams from "./teams";
import { pushEvents, ScrapedEvent } from "../lib/payload";
import { TeamConfig, RawEvent, PuppeteerPage } from "./types";

/** Promotion headings look like "Presented by X // Bobblehead" or span several lines. */
const formatEventName = (text: string): string => {
  if (text.includes("//")) return (text.split("//")[1] ?? "").trim();
  return (text.split("\n")[0] ?? "").trim();
};

/** The calendar day at the ballpark for a start time given in any ISO form. */
const localDay = (startDate: string | undefined, timeZone: string): string => {
  if (!startDate) return "";
  // A date, or a date-time with no offset, is already the ballpark's wall clock.
  if (!/[zZ]|[+-]\d{2}:?\d{2}$/.test(startDate)) return startDate.slice(0, 10);
  const instant = new Date(startDate);
  if (Number.isNaN(instant.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(instant);
};

const scrapeMLB = async (
  page: PuppeteerPage,
  teamConfig: TeamConfig,
  teamName: string
): Promise<ScrapedEvent[]> => {
  try {
    await page.goto(teamConfig.url);
    await page.waitForSelector(teamConfig.giveawayList);

    const data: RawEvent[] = await page.evaluate(
      ({
        giveawayList,
        giveawayListItem,
        giveawaylistItemHeading,
        giveawayScript,
      }) => {
        const list = document.querySelector(giveawayList);
        if (!list) return [];

        const listItems = Array.from(
          list.querySelectorAll<HTMLElement>(giveawayListItem)
        );
        const events: RawEvent[] = [];

        for (const listItem of listItems) {
          const eventInfo: Partial<RawEvent> = {};

          try {
            const script =
              listItem.querySelector<HTMLScriptElement>(giveawayScript);

            if (script?.tagName === "SCRIPT" && script.textContent) {
              try {
                const json = JSON.parse(script.textContent);
                if (json["@type"] === "SportsEvent") {
                  eventInfo.matchup = json.name || "";
                  eventInfo.startDate = json.startDate || "";
                  eventInfo.endDate = json.endDate || "";
                  eventInfo.description =
                    (json.description?.trim() as string) || "";

                  const desc: string = eventInfo.description;
                  const onIndex = desc.indexOf(" on ");
                  const atIndex = desc.indexOf(" at ", onIndex);
                  if (onIndex !== -1 && atIndex !== -1) {
                    const timeAndZone = desc.substring(atIndex + 4).trim();
                    eventInfo.timeAndZone = timeAndZone;
                  }

                  eventInfo.location =
                    json.location?.name || json.location?.address || "";
                  eventInfo.offerURL = json.offers?.url || "";
                }
              } catch {
                // ignore JSON parse errors
              }
            }

            const headings = listItem.querySelectorAll<HTMLElement>(
              giveawaylistItemHeading
            );

            for (const heading of headings) {
              let headingText = heading.innerText.trim();
              events.push({
                rawName: headingText,
                ...eventInfo,
              });
            }
          } catch {
            // ignore
          }
        }
        return events;
      },
      {
        giveawayList: teamConfig.giveawayList,
        giveawayListItem: teamConfig.giveawayListItem,
        giveawaylistItemHeading: teamConfig.giveawaylistItemHeading,
        giveawayScript: teamConfig.giveawayScript,
      }
    );

    return data.map((event) => ({
      team: teamName,
      title: formatEventName(event.rawName),
      // Listings are named "Visitors at Home".
      opponent: event.matchup?.split(" at ")[0],
      date: localDay(event.startDate, teamConfig.timeZone),
      time: event.timeAndZone,
      venue: event.location,
      url: event.offerURL,
    }));
  } catch (error) {
    console.error(`Error scraping ${teamConfig.url}`, error);
    return [];
  }
};

(async () => {
  console.time("Total scraping time");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    for (const [teamName, teamConfig] of Object.entries(mlbTeams)) {
      console.log(`\nScraping ${teamName}...\n`);

      try {
        const data = await scrapeMLB(page, teamConfig, teamName);

        await pushEvents("mlb", data);
      } catch (err) {
        console.error(`Failed to scrape ${teamName}`, err);
      }
    }
  } finally {
    await page.close();
    await browser.close();
    console.timeEnd("Total scraping time");
  }
})();
