import { type Trip } from './types';

const DAY_MS = 86_400_000;
const START_LABEL = 'SF';
// Rough per-stop detour until real routing is available.
const MILES_PER_STOP = 35;
const MINUTES_PER_STOP = 40;

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

export const getTripTiming = (arriveBy: string, now = new Date()) => {
  const arrival = new Date(arriveBy);
  const days = Math.round((startOfDay(arrival) - startOfDay(now)) / DAY_MS);
  const past = arrival.getTime() < now.getTime();

  if (past) {
    return {
      past,
      label: days === 0 ? 'Ended today' : `Ended ${plural(-days, 'day')} ago`,
    };
  }

  if (days === 0) {
    return { past, label: 'Today' };
  }

  if (days === 1) {
    return { past, label: 'Tomorrow' };
  }

  return { past, label: `In ${days} days` };
};

export const isUpcoming = (trip: Trip) => !getTripTiming(trip.arriveBy).past;

export const sortByArrival = (trips: Trip[]) =>
  [...trips].sort(
    (a, b) => new Date(a.arriveBy).getTime() - new Date(b.arriveBy).getTime(),
  );

export const getTripStops = (trip: Trip) => [
  ...trip.commonStops,
  ...trip.myStops,
];

const shortName = (name: string) => name.split(',')[0].split('(')[0].trim();

export const getRouteSummary = (trip: Trip) =>
  [
    START_LABEL,
    ...getTripStops(trip).map((s) => shortName(s.name)),
    shortName(trip.destination.name),
  ].join(' → ');

/** Parses strings like "3h 30m" or "20m" into minutes. */
const parseDrive = (drive: string) => {
  const hours = /(\d+)\s*h/.exec(drive)?.[1] ?? '0';
  const minutes = /(\d+)\s*m/.exec(drive)?.[1] ?? '0';

  return Number(hours) * 60 + Number(minutes);
};

export const formatMinutes = (total: number) =>
  total >= 60 ? `${Math.floor(total / 60)}h ${total % 60}m` : `${total}m`;

export const getTripMetrics = (trip: Trip) => {
  const stops = getTripStops(trip).length;

  return {
    miles: (parseInt(trip.destination.dist, 10) || 0) + stops * MILES_PER_STOP,
    minutes: parseDrive(trip.destination.drive) + stops * MINUTES_PER_STOP,
    waypoints: stops + 1,
  };
};

export const formatArrival = (arriveBy: string) =>
  new Date(arriveBy).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
