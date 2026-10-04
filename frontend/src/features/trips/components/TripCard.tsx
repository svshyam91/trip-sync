import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Icon } from '@/components/ui/Icon';

import {
  formatArrival,
  formatMinutes,
  getRouteSummary,
  getTripMetrics,
  getTripTiming,
} from '../tripUtils';
import { type Trip } from '../types';
import TripMetric from './TripMetric';

interface TripCardProps {
  trip: Trip;
  onView?: () => void;
  onEdit?: () => void;
}

const TripCard = ({ trip, onView, onEdit }: TripCardProps) => {
  const { past, label } = getTripTiming(trip.arriveBy);
  const isAdmin = trip.role === 'admin';
  const { miles, minutes, waypoints } = getTripMetrics(trip);

  return (
    <Paper
      variant="outlined"
      component="article"
      className="rounded-3xl p-4 transition-colors hover:border-brand-500"
    >
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            useFlexGap
            spacing={1.5}
            className="flex-wrap items-center"
          >
            <Chip
              size="small"
              label={`${past ? 'Completed' : 'Upcoming'} • ${label}`}
              className={
                past
                  ? 'bg-muted text-2xs font-bold tracking-wider text-muted-foreground uppercase'
                  : 'bg-success/10 text-2xs font-bold tracking-wider text-success uppercase'
              }
            />
            <Chip
              size="small"
              icon={<Icon name={isAdmin ? 'crown' : 'userGroup'} />}
              label={isAdmin ? 'Admin' : 'Participant'}
              className={
                isAdmin
                  ? 'bg-brand-100 text-2xs font-bold tracking-wider text-brand-700 uppercase dark:bg-brand-900 dark:text-brand-100'
                  : 'bg-muted text-2xs font-bold tracking-wider text-muted-foreground uppercase'
              }
            />
          </Stack>

          <Typography variant="subtitle1" component="h3" className="text-sm">
            {trip.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="truncate font-medium"
          >
            {getRouteSummary(trip)}
          </Typography>
          <Typography
            variant="caption"
            color="text.disabled"
            className="flex items-center gap-1.5 font-normal"
          >
            <Icon name="calendarCheck" />
            {formatArrival(trip.arriveBy)}
            {!isAdmin && <span>• Hosted by {trip.host}</span>}
          </Typography>
        </Stack>

        <Grid
          container
          columns={3}
          className="rounded-2xl border border-border bg-background p-2.5"
        >
          <TripMetric label="Distance" value={`${miles} mi`} />
          <TripMetric
            label="Est. Drive"
            value={formatMinutes(minutes)}
            className="border-x border-border"
          />
          <TripMetric
            label="Waypoints"
            value={`${waypoints} ${waypoints === 1 ? 'Stop' : 'Stops'}`}
          />
        </Grid>

        <Stack direction="row" spacing={2}>
          <Button
            variant="subtle"
            startIcon={<Icon name="eye" />}
            onClick={onView}
            className="h-10 flex-1 rounded-xl border border-border bg-card"
          >
            View
          </Button>
          {!past && (
            <Button
              variant="contained"
              startIcon={<Icon name="penToSquare" />}
              onClick={onEdit}
              className="h-10 flex-1 rounded-xl"
            >
              {isAdmin ? 'Edit Trip' : 'Edit My Stops'}
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TripCard;
