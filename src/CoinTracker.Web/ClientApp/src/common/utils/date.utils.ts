import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getYear,
  startOfMonth,
  startOfYear,
} from "date-fns";

export const CURRENT_YEAR: number = getYear(Date.now());

export const getDatesForYear = (year = CURRENT_YEAR) => {
  const datesArray = [];

  // Start with the first day of the year
  const current_date = new Date(year, 0, 1);

  // Iterate through each day of the year
  while (current_date.getFullYear() === year) {
    datesArray.push(new Date(current_date));
    current_date.setDate(current_date.getDate() + 1);
  }

  return datesArray;
};

export const daysPerMonth = (): number[] => {
  const monthsPerYear = 12;
  const today = new Date();

  const dayList: number[] = [];

  for (let m = 0; m < monthsPerYear; m++) {
    const currentMonth = addMonths(startOfYear(today), m);
    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });

    dayList.push(days.length);
  }

  return dayList;
};

export const getRangeForValues = (startDate: Date, endDate: Date) => {
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  const startIndex =
    daysPerMonth()
      .slice(0, startMonth)
      .reduce((sum, days) => sum + days, 0) + startDay;

  const endIndex =
    daysPerMonth()
      .slice(0, endMonth)
      .reduce((sum, days) => sum + days, 0) + endDay;

  return { startIndex, endIndex };
};

export const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export const copyInClipPathCurrentView = () => {
  let enlace = window.location.href;

  navigator.clipboard
    .writeText(enlace)
    .then(function () {
      alert("Enlace copiado al portapapeles: " + enlace);
    })
    .catch(function (err) {
      console.error("Error al intentar copiar al portapapeles: ", err);
    });
};

export const formatDate = (date: Date, dateFormat: string = 'PP'): string => {
  return format(date, dateFormat);
};