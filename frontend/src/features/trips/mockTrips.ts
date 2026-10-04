import { mockLocations } from './mockLocations';
import { type LocationOption, type Trip } from './types';

const loc = (id: string): LocationOption => {
  const found = mockLocations.find((l) => l.id === id);

  if (!found) {
    throw new Error(`Unknown mock location ${id}`);
  }

  return found;
};

const pad = (n: number) => String(n).padStart(2, '0');

/** A local datetime string `days` from now at the given hour. */
const at = (days: number, hour: number) => {
  const d = new Date();

  d.setDate(d.getDate() + days);

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hour)}:00`;
};

// Temporary data until trips come from the API.
export const mockTrips: Trip[] = [
  {
    id: 't1',
    name: '🌲 Yosemite Weekend Trek',
    arriveBy: at(3, 9),
    destination: loc('1'),
    commonStops: [loc('3')],
    myStops: [],
    role: 'admin',
    host: 'You',
  },
  {
    id: 't2',
    name: '🏔️ Lake Tahoe Alpine Retreat',
    arriveBy: at(12, 17),
    destination: loc('2'),
    commonStops: [loc('9')],
    myStops: [loc('7')],
    role: 'participant',
    host: 'Marcus Chen',
  },
  {
    id: 't3',
    name: '🌊 Pacific Coast Highway Drive',
    arriveBy: at(20, 8),
    destination: loc('9'),
    commonStops: [loc('7'), loc('4')],
    myStops: [],
    role: 'admin',
    host: 'You',
  },
];
