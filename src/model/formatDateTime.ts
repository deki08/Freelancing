
export default function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${hours < 12 ? "AM" : "PM"}`;
  const options: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return `${formattedTime}, ${formattedDate}`;
}