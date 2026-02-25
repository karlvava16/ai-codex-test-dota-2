import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import type { ElementType } from 'react';

type AppButtonProps = ButtonProps & {
  component?: ElementType;
  to?: string;
};

export function AppButton(props: AppButtonProps) {
  return <Button {...props} />;
}
