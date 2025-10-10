import puppeteer from "puppeteer";
import nhlTeams from "./teams";

const URL = "http://localhost:4000/api/v1/events/batch";

const scrapeNHL = async (
  page,
  teamConfig,
  teamName,
  currYear,
  currentMonth
) => {
  try {
    await page.goto(teamConfig.url);
    await page.waitForSelector(teamConfig.giveawayList);

    const data = await page.evaluate(
      ({
        league,
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
          if (!list) {
            return { ok: false, error: "giveawayList not found", events: [] };
          }

          const listItems = Array.from(list.querySelectorAll(giveawayListItem));
          if (!listItems) {
            return {
              ok: false,
              error: "giveawayListItem not found",
              events: [],
            };
          }
          const events = [];

          for (const listItem of listItems) {
            try {
              let linkEl = "";
              if (!alternativeEventLink && giveawaylistItemLink)
                linkEl = listItem.querySelector(giveawaylistItemLink);
              const headingEl = listItem.querySelector(giveawaylistItemHeading);
              const headingText = headingEl?.innerText?.trim() || "";

              let eventDetails = listItem.querySelector(
                giveawaylistItemDetails
              )?.textContent;
              if (!eventDetails) {
                // events.push({
                //   error: "giveawaylistItemDetails element not found",
                // });
                continue;
              }

              if (!eventDetails.includes("vs")) {
                // events.push({ error: "eventDetails doesn't contain vs" });
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

              const [dayOfWeek, date] = (fullDate.trim() || "").split(", ");
              const safeDate = (date || "").trim();
              const monthName = safeDate.split(" ")[0].replace(".", "") || "";
              const eventMonthIndex = monthName
                ? new Date(`${monthName} 1, ${currYear}`).getMonth()
                : currentMonth;
              const yearForEvent =
                eventMonthIndex < currentMonth ? currYear + 1 : currYear;

              const eventDate = new Date(`${safeDate}, ${yearForEvent}`);
              // const formattedDate = eventDate.toISOString().split("T")[0];
              const formattedDate = isNaN(eventDate)
                ? ""
                : eventDate.toISOString().split("T")[0];

              events.push({
                league,
                teamName,
                eventName: headingText,
                rawName: headingText,
                matchup: `${matchup.replace(". ", "")} at ${teamName}`,
                startDate: formattedDate,
                endDate: formattedDate,
                description: ` on ${safeDate}, ${yearForEvent} at ${time}`,
                timeAndZone: (time || "").trim(),
                location,
                offerURL: linkEl?.href || alternativeEventLink || "",
                dayOfWeek: (dayOfWeek || "").trim().toLowerCase(),
              });
            } catch (e) {
              // events.push({
              //   error: `item parse failed: ${String((e && e.message) || e)}`,
              // });
              continue;
            }
          }
          return events;
        } catch (error) {
          return {
            ok: false,
            error: String((e && e.message) || e),
            events: [],
          };
        }
      },
      {
        league: teamConfig.league,
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

    return data;
  } catch (error) {
    console.error(`Error scraping ${teamConfig.url}`, error);
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

        // DB
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
        console.log(data.length);
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
