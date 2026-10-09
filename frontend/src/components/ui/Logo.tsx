import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { Icon } from '@/components/ui/Icon';

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <ButtonBase
    onClick={onClick}
    aria-label="Wayfarer home"
    sx={{ gap: 2, borderRadius: 3, textAlign: 'left' }}
  >
    <span
      className="flex size-9 items-center justify-center rounded-xl text-white"
      style={{
        backgroundImage:
          'linear-gradient(to top right, var(--mui-palette-brand-600), var(--mui-palette-brand-400))',
      }}
    >
      <Icon name="route" className="text-lg" />
    </span>
    <span className="hidden sm:block">
      <Typography
        variant="subtitle1"
        component="span"
        sx={{ display: 'block' }}
      >
        Trip Sync
      </Typography>
      <Typography
        variant="overline"
        component="span"
        sx={{ display: 'block', color: 'text.secondary' }}
      >
        Trip Planner
      </Typography>
    </span>
  </ButtonBase>
);

export default Logo;
