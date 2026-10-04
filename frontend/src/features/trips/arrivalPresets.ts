const pad = (n: number) => String(n).padStart(2, '0');

/** Formats a date as the `YYYY-MM-DDTHH:mm` string a datetime-local input expects. */
const toDateTimeLocal = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

const FRIDAY = 5;

export const getArrivalPresets = (now = new Date()) => {
  const tomorrow = new Date(now);

  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  const friday = new Date(now);

  friday.setDate(now.getDate() + ((FRIDAY - now.getDay() + 7) % 7));
  friday.setHours(17, 0, 0, 0);

  if (friday <= now) {
    friday.setDate(friday.getDate() + 7);
  }

  return [
    { label: 'Tomorrow 9:00 AM', value: toDateTimeLocal(tomorrow) },
    { label: 'Friday 5:00 PM', value: toDateTimeLocal(friday) },
  ];
};
