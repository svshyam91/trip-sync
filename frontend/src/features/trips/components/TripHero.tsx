import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Icon } from '@/components/ui/Icon';

interface TripHeroProps {
  onPlanTrip: () => void;
  onJoinTrip: () => void;
}

const TripHero = ({ onPlanTrip, onJoinTrip }: TripHeroProps) => (
  <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 to-brand-800 p-5 text-primary-foreground shadow-glow sm:p-6">
    <Stack spacing={4} className="relative z-10">
      <Typography
        variant="overline"
        component="span"
        className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-foreground/20 px-2.5 py-0.5 backdrop-blur-md"
      >
        <Icon name="compass" className="text-warning" />
        Ready to Explore
      </Typography>

      <Typography variant="h1" component="h2" color="inherit">
        Where is your next adventure heading?
      </Typography>

      <Typography variant="body2" className="max-w-xs text-brand-100">
        Plan custom multi-stop road trips, share itineraries, and invite friends
        to join.
      </Typography>

      <Stack direction="row" spacing={2} className="items-center">
        <Button
          variant="subtle"
          startIcon={<Icon name="plus" />}
          onClick={onPlanTrip}
          className="h-11 flex-1 rounded-2xl bg-primary-foreground text-brand-700 hover:bg-primary-foreground/90 sm:flex-none"
        >
          Plan New Trip
        </Button>
        <Button
          variant="subtle"
          startIcon={<Icon name="rightToBracket" />}
          onClick={onJoinTrip}
          className="h-11 rounded-2xl bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
          sx={{ '& .MuiButton-startIcon': { color: 'inherit' } }}
        >
          Join
        </Button>
      </Stack>
    </Stack>

    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-primary-foreground/10"
    />
  </section>
);

export default TripHero;
