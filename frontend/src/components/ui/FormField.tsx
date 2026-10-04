import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}

/** Static uppercase label above a control, with an optional required mark. */
const FormField = ({ label, htmlFor, required, children }: FormFieldProps) => (
  <Stack spacing={2}>
    <Typography
      variant="overline"
      component="label"
      htmlFor={htmlFor}
      color="text.secondary"
    >
      {label}
      {required && (
        <span aria-hidden="true" className="ml-1 text-danger">
          *
        </span>
      )}
    </Typography>
    {children}
  </Stack>
);

export default FormField;
