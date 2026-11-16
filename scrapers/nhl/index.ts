import puppeteer from "puppeteer";
import type { Page } from "puppeteer";
import { pushEvents, ScrapedEvent } from "../lib/payload";
import nhlTeams from "./teams";

type TeamConfig = (typeof nhlTeams)[keyof typeof nhlTeams];

const scrapeNHL = async (
  page: Page,
  teamConfig: TeamConfig,
  teamName: string,
  currYear: number,
  currentMonth: number
): Promise<ScrapedEvent[]> => {
  try {
    await page.goto(teamConfig.url);
    await page.waitForSelector(teamConfig.giveawayList);

    const data = await page.evaluate(
      // Runs inside the browser page, so it is left untyped.
      ({
        teamName,
        giveawayList,
        giveawayListItem,
        giveawaylistItemLink,
        giveawaylistItemHeading,
        giveawaylistItemDetails,
        location,
        currYear,
        alternativeEventLink,
        currentMonth,
      }) => {
        try {
          const list = document.querySelector(giveawayList);
          if (!list) return [];

          const listItems = Array.from(list.querySelectorAll(giveawayListItem));
          const events = [];

          for (const listItem of listItems) {
            try {
              const linkEl =
                !alternativeEventLink && giveawaylistItemLink
                  ? listItem.querySelector<HTMLAnchorElement>(giveawaylistItemLink)
                  : null;
              const headingEl = listItem.querySelector<HTMLElement>(giveawaylistItemHeading);
              const headingText = headingEl?.innerText?.trim() || "";

              let eventDetails = listItem.querySelector(
                giveawaylistItemDetails
              )?.textContent;
              if (!eventDetails) {
                continue;
              }

              if (!eventDetails.includes("vs")) {
                continue;
              }
              if (eventDetails.includes("\n")) {
                eventDetails = eventDetails.split("\n")[1] || "";
              }

              if (!/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/.test(eventDetails))
                continue;

              let fullDate, time, vs, matchupAndTime, matchup, timeSegment;

              if (eventDetails.includes(" • ")) {
                [fullDate, time, vs] = eventDetails.split(" • ");
                matchup = (vs.split("vs")[1] || "").trim();
              } else {
                [fullDate, matchupAndTime] = eventDetails.split("vs");
                [matchup, timeSegment] = (matchupAndTime.trim() || "").split(
                  " ("
                );
                time = (timeSegment || "")
                  .replace(")", "")
                  .split(" - Presented")[0];
              }

              const [, date] = (fullDate.trim() || "").split(", ");
              const safeDate = (date || "").trim();
              const monthName = safeDate.split(" ")[0].replace(".", "") || "";
              const eventMonthIndex = monthName
                ? new Date(`${monthName} 1, ${currYear}`).getMonth()
                : currentMonth;
              const yearForEvent =
                eventMonthIndex < currentMonth ? currYear + 1 : currYear;

              const eventDate = new Date(`${safeDate}, ${yearForEvent}`);
              const formattedDate = isNaN(eventDate.getTime())
                ? ""
                : eventDate.toISOString().split("T")[0];

              events.push({
                team: teamName,
                title: headingText,
                opponent: matchup.replace(". ", ""),
                date: formattedDate,
                time: (time || "").trim(),
                venue: location,
                url: linkEl?.href || alternativeEventLink || "",
              });
            } catch {
              continue;
            }
          }
          return events;
        } catch {
          return [];
        }
      },
      {
        teamName: teamName,
        giveawayList: teamConfig.giveawayList,
        giveawayListItem: teamConfig.giveawayListItem,
        giveawaylistItemLink: teamConfig.giveawaylistItemLink,
        giveawaylistItemHeading: teamConfig.giveawaylistItemHeading,
        giveawaylistItemDetails: teamConfig.giveawaylistItemDetails,
        location: teamConfig.location,
        currYear: currYear,
        alternativeEventLink: teamConfig.alternativeEventLink,
        currentMonth: currentMonth,
      }
    );

    return data as ScrapedEvent[];
  } catch (error) {
    console.error(`Error scraping ${teamConfig.url}`, error);
    return [];
  }
};

(async () => {
  console.time("Total scraping time");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const now = new Date();
  const currYear = now.getFullYear();
  const currentMonth = now.getMonth();

  try {
    for (const [teamName, teamConfig] of Object.entries(nhlTeams)) {
      console.log(`\nScraping ${teamName}...\n`);

      try {
        const data = await scrapeNHL(
          page,
          teamConfig,
          teamName,
          currYear,
          currentMonth
        );

        await pushEvents("nhl", data);
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
