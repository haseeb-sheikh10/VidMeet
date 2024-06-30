import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(dateString: string, endDateString = null) {
  // Parse the input date string
  const date = new Date(dateString);

  // Format the date
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  // Format the time
  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}${period}`;
  };

  const formattedTime = formatTime(date);

  // Handle end date if provided
  let formattedEndTime = "";
  if (endDateString) {
    const endDate = new Date(endDateString);
    formattedEndTime = ` - ${formatTime(endDate)}`;
  }

  // Combine all parts
  return `${formattedDate} - ${formattedTime}${formattedEndTime}`;
}
