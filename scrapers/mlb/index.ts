import puppeteer from "puppeteer";
import mlbTeams from "./teams";
const { formatEventName, weekdayLowercaseFromStart } = require("./utils");
import { TeamConfig, RawEvent, FormattedEvent, PuppeteerPage } from "./types";

const URL = "http://localhost:4000/api/v1/events/batch";

const scrapeMLB = async (
  page: PuppeteerPage,
  teamConfig: TeamConfig,
  teamName: string
): Promise<FormattedEvent[]> => {
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

            // if (script?.tagName === "SCRIPT" && script.textContent) {
            //   let json = {};
            //   const jsonText = script?.textContent;
            //   if (jsonText) {
            //     try {
            //       json = JSON.parse(jsonText);
            //     } catch (e) {
            //       // ignore
            //     }
            //   }

            //   if (json["@type"] === "SportsEvent") {
            //     eventInfo.matchup = json.name || "";
            //     eventInfo.startDate = json.startDate || "";
            //     eventInfo.endDate = json.endDate || "";
            //     eventInfo.description = json.description?.trim() || "";

            //     const onIndex = eventInfo.description.indexOf(" on ");
            //     const atIndex = eventInfo.description.indexOf(" at ", onIndex);

            //     if (onIndex !== -1 && atIndex !== -1) {
            //       const timeAndZone = eventInfo.description
            //         .substring(atIndex + 4)
            //         .trim();

            //       eventInfo.timeAndZone = timeAndZone || "";
            //     }

            //     eventInfo.location =
            //       json.location?.name || json.location?.address || "";
            //     eventInfo.offerURL = json.offers?.url || "";
            //   }
            // }
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

    const formattedData: FormattedEvent[] = data.map((event) => {
      const dayOfWeek = weekdayLowercaseFromStart(
        event.startDate,
        teamConfig.timeZone
      );
      return {
        league: teamConfig.league || "",
        teamName,
        eventName: formatEventName(event.rawName),
        ...event,
        dayOfWeek,
      };
    });

    return formattedData;
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

        // DB;
        // try {
        //   const response = await fetch(URL, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(data),
        //   });
        //   if (!response.ok) {
        //     throw new Error(`Failed to post data: ${response.statusText}`);
        //   }
        //   const result = await response.json();
        //   console.log("Data posted successfully:", result);
        // } catch (err) {
        //   console.error("Error posting data:", err);
        // }

        console.log(data);
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
