import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type FormEvent, useState } from 'react';

import FormField from '@/components/ui/FormField';
import { Icon, type IconName } from '@/components/ui/Icon';
import PresetChips from '@/components/ui/PresetChips';

import { getArrivalPresets } from '../arrivalPresets';
import { type CreateTripValues } from '../types';

interface CreateTripFormProps {
  onBack: () => void;
  onSubmit: (values: CreateTripValues) => void;
}

type Errors = Partial<Record<keyof CreateTripValues, string>>;

const emptyValues: CreateTripValues = {
  tripName: '',
  arriveBy: '',
  destination: '',
};

const validate = ({ tripName, arriveBy, destination }: CreateTripValues) => {
  const errors: Errors = {};

  if (!tripName.trim()) {
    errors.tripName = 'Enter a trip name';
  }

  if (!arriveBy) {
    errors.arriveBy = 'Pick an arrival date and time';
  } else if (new Date(arriveBy).getTime() <= Date.now()) {
    errors.arriveBy = 'Arrival must be in the future';
  }

  if (!destination.trim()) {
    errors.destination = 'Enter a final destination';
  }

  return errors;
};

const iconAdornment = (name: IconName) => ({
  startAdornment: (
    <InputAdornment position="start" className="text-muted-foreground">
      <Icon name={name} />
    </InputAdornment>
  ),
});

const CreateTripForm = ({ onBack, onSubmit }: CreateTripFormProps) => {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<Errors>({});

  const setField = (field: keyof CreateTripValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const reset = () => {
    setValues(emptyValues);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={6}>
        <Stack
          direction="row"
          className="items-end justify-between border-b border-border pb-3"
        >
          <Stack spacing={1} className="items-start">
            <Button
              variant="text"
              size="small"
              startIcon={<Icon name="arrowLeft" />}
              onClick={onBack}
              className="-ml-2 text-primary"
            >
              Home
            </Button>
            <Typography variant="h1" component="h1">
              Plan New Journey
            </Typography>
          </Stack>
          <Button
            variant="subtle"
            startIcon={<Icon name="rotateRight" />}
            onClick={reset}
            className="border border-border bg-card"
          >
            Reset
          </Button>
        </Stack>

        <Stack spacing={2}>
          <FormField label="1. Trip Name" htmlFor="trip-name" required>
            <TextField
              id="trip-name"
              placeholder="e.g., Summer Coast Road Trip"
              value={values.tripName}
              onChange={(e) => setField('tripName', e.target.value)}
              error={!!errors.tripName}
              helperText={errors.tripName}
              slotProps={{ input: iconAdornment('penNib') }}
              fullWidth
            />
          </FormField>
        </Stack>

        <Stack spacing={2}>
          <FormField
            label="2. Target Arrival Date & Time"
            htmlFor="arrive-by"
            required
          >
            <TextField
              id="arrive-by"
              type="datetime-local"
              value={values.arriveBy}
              onChange={(e) => setField('arriveBy', e.target.value)}
              error={!!errors.arriveBy}
              helperText={errors.arriveBy}
              slotProps={{ input: iconAdornment('clock') }}
              fullWidth
            />
          </FormField>
          <PresetChips
            title="Fast Presets:"
            options={getArrivalPresets()}
            onSelect={(v) => setField('arriveBy', v)}
          />
        </Stack>

        <FormField label="3. Final Destination" htmlFor="destination" required>
          <TextField
            id="destination"
            placeholder="Search city, airport, landmark..."
            value={values.destination}
            onChange={(e) => setField('destination', e.target.value)}
            error={!!errors.destination}
            helperText={errors.destination}
            slotProps={{ input: iconAdornment('locationDot') }}
            autoComplete="off"
            fullWidth
          />
        </FormField>

        <Button
          type="submit"
          variant="contained"
          startIcon={<Icon name="paperPlane" />}
          fullWidth
          className="h-12 rounded-2xl"
        >
          Save & Create Trip
        </Button>
      </Stack>
    </form>
  );
};

export default CreateTripForm;
