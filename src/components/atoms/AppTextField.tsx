import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

export const AppTextField = forwardRef<HTMLDivElement, TextFieldProps>(function AppTextField(
  props,
  ref,
) {
  return <TextField ref={ref} size="small" {...props} />;
});
