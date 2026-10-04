import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface TripMetricProps {
  label: string;
  value: string;
  className?: string;
}

const TripMetric = ({ label, value, className }: TripMetricProps) => (
  <Grid size={1} className={className}>
    <Typography
      variant="overline"
      component="div"
      color="text.disabled"
      className="text-center text-2xs"
    >
      {label}
    </Typography>
    <Typography variant="body2" className="text-center font-extrabold">
      {value}
    </Typography>
  </Grid>
);

export default TripMetric;
