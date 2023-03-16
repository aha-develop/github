/**
 * Calculate Elapsed Time
 */
export function calcTimeElapsed(inputDate: Date | string) {
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (Number.isNaN(diff)) return "";

  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (seconds < 45) {
    return "a few seconds ago";
  } else if (years >= 1) {
    const roundedYears = Math.round(years);
    return `${roundedYears} year${roundedYears !== 1 ? "s" : ""} ago`;
  } else if (months >= 1) {
    const roundedMonths = Math.round(months);
    return `${roundedMonths} month${roundedMonths !== 1 ? "s" : ""} ago`;
  } else if (weeks >= 1) {
    const roundedWeeks = Math.round(weeks);
    return `${roundedWeeks} week${roundedWeeks !== 1 ? "s" : ""} ago`;
  } else if (days >= 1) {
    const roundedDays = Math.round(days);
    return `${roundedDays} day${roundedDays !== 1 ? "s" : ""} ago`;
  } else if (hours >= 1) {
    const roundedHours = Math.round(hours);
    return `${roundedHours} hour${roundedHours !== 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    const roundedMinutes = Math.round(minutes);
    return `${roundedMinutes} minute${roundedMinutes !== 1 ? "s" : ""} ago`;
  } else {
    const roundedSeconds = Math.round(seconds);
    return `${roundedSeconds} second${roundedSeconds !== 1 ? "s" : ""} ago`;
  }
}
