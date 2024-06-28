import { format } from 'date-fns';

export function shortenAddress(address?: string): string {
  if (!address) return '';
  const start = address.slice(0, 2);
  const end = address.slice(-2);
  return `${start}...${end}`;
}

// sometime, date here is a string not Date
export function formatDate(date: Date, withTime = false, timeOnly = false, dateOnly = false) {
  const dateConverted = new Date(`${date}`);
  if (withTime) {
    return format(dateConverted, 'MMM d h:mm a');
  }
  if (timeOnly) {
    return format(dateConverted, 'h:mm a');
  }
  if (dateOnly) {
    return format(dateConverted, 'd');
  }

  return format(dateConverted, 'do MMM y');
}
