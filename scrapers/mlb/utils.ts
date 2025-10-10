const formatEventName = (text: string) => {
  let headingText = text;

  if (headingText.includes("//")) {
    headingText = headingText.split("//")[1].trim();
  } else if (headingText.includes("\n")) {
    headingText = headingText.split("\n")[0].trim();
  }

  return headingText;
};

const weekdayLowercaseFromStart = (startDate, timeZone) => {
  if (!startDate || !timeZone) return "";

  let d;
  if (/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    d = new Date(`${startDate}T12:00:00Z`);
  } else if (
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(startDate) &&
    !/[zZ]|[+\-]\d{2}:\d{2}$/.test(startDate)
  ) {
    d = new Date(`${startDate}Z`);
  } else {
    d = new Date(startDate);
  }

  if (Number.isNaN(d.getTime())) return "";

  try {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone })
      .format(d)
      .toLowerCase();
  } catch {
    return "";
  }
};

module.exports = {
  formatEventName,
  weekdayLowercaseFromStart,
};
