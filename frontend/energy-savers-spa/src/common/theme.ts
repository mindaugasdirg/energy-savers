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
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: 38,
    },
    h2: {
      fontWeight: 700,
      fontSize: 25,
    },
    subtitle2: {
      fontSize: 14,
    },
    h6: {
      fontSize: 20,
    },
  },
};

export const theme = createTheme(themeOptions);