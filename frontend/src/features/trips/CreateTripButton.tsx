import Button, { type ButtonProps } from '@mui/material/Button';

import { Icon } from '@/components/ui/Icon';

const CreateTripButton = (props: ButtonProps) => (
  <Button variant="contained" startIcon={<Icon name="plus" />} {...props}>
    Create Trip
  </Button>
);

export default CreateTripButton;
