
export default function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit', year: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}