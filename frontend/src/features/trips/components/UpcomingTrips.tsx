import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Icon } from '@/components/ui/Icon';

import { isUpcoming, sortByArrival } from '../tripUtils';
import { type Trip } from '../types';
import TripCard from './TripCard';

interface UpcomingTripsProps {
  trips: Trip[];
  /** How many trips to show before "See all". */
  limit?: number;
}

const UpcomingTrips = ({ trips, limit = 2 }: UpcomingTripsProps) => {
  const upcoming = sortByArrival(trips.filter(isUpcoming));

  return (
    <Stack component="section" spacing={3} aria-labelledby="upcoming-trips">
      <Stack direction="row" className="items-center justify-between">
        <Typography
          id="upcoming-trips"
          variant="overline"
          component="h2"
          color="text.secondary"
          className="flex items-center gap-1.5"
        >
          <Icon name="suitcaseRolling" className="text-brand-500" />
          Upcoming Trips
        </Typography>
        <Button
          variant="text"
          size="small"
          endIcon={<Icon name="angleRight" />}
          className="text-primary"
        >
          See all ({trips.length})
        </Button>
      </Stack>

      {upcoming.length === 0 ? (
        <Typography
          variant="body2"
          color="text.disabled"
          className="rounded-3xl border-2 border-dashed border-border p-6 text-center"
        >
          No upcoming trips yet. Plan one or join with a code.
        </Typography>
      ) : (
        upcoming
          .slice(0, limit)
          .map((trip) => <TripCard key={trip.id} trip={trip} />)
      )}
    </Stack>
  );
};

export default UpcomingTrips;
