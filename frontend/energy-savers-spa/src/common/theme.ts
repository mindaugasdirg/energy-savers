import { createTheme } from '@mui/material';

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#4FC168',
    },
    secondary: {
      main: '#C1694F',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiTooltip: {
      arrow: true,
    },
    MuiAppBar: {
      color: 'inherit',
    },
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
};

export const theme = createTheme(themeOptions);