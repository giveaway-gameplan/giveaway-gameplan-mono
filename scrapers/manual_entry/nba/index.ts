// pnpm run manual
// import events from "./temp_data";
import events from "./data";

const URL = "http://localhost:4000/api/v1/events/batch";

const pushToDB = async () => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(events),
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

const validateAndPushData = () => {
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
  } else {
    console.log("All events valid. Proceeding to push...");
    pushToDB();
  }
};

validateAndPushData();
