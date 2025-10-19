// pnpm run manual:nba
import events from "./data";
import { NbaEvent } from "./types";

const URL = "http://localhost:4000/api/v1/events/batch";

const pushToDB = async (partialEventsArray: NbaEvent[]) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partialEventsArray),
    });
    if (!response.ok) {
      throw new Error(`Failed to post data: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("Data posted successfully:", result);
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

const chunkArray = (array: NbaEvent[], size: number): NbaEvent[][] => {
  const chunks: NbaEvent[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const validateAndPushData = async () => {
  console.log("Length of events array: ", events.length);
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const descriptionRegex =
    /^ on [A-Z][a-z]+ \d{1,2}, \d{4} at \d{1,2}:\d{2} (a|p)\.m\.$/;
  const urlRegex = /^(https:\/\/[^\s]+)$/i;

  const invalidEvents = events.filter((event, index) => {
    const errors: string[] = [];

    if (!isoDateRegex.test(event.startDate)) {
      errors.push(`Invalid startDate format: ${event.startDate}`);
    }
    if (!isoDateRegex.test(event.endDate)) {
      errors.push(`Invalid endDate format: ${event.endDate}`);
    }
    if (!descriptionRegex.test(event.description)) {
      errors.push(`Invalid description format: ${event.description}`);
    }
    if (!urlRegex.test(event.offerURL)) {
      errors.push(`Invalid URL: ${event.offerURL}`);
    }

    if (errors.length) {
      console.error(`Event ${index} (${event.teamName} - ${event.eventName}):`);
      errors.forEach((err) => console.error("  -", err));
      return true;
    }
    return false;
  });

  if (invalidEvents.length > 0) {
    console.error(
      `Validation failed for ${invalidEvents.length} of ${events.length} events.`
    );
    return;
  } else {
    console.log("All events valid. Proceeding to push...");
    const chunks = chunkArray(events, 30);
    for (const [index, chunk] of chunks.entries()) {
      console.log(`Pushing batch ${index + 1} of ${chunks.length}`);
      await pushToDB(chunk);
    }
  }
};

validateAndPushData();
