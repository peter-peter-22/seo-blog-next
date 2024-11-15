'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 30
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard', 
      },
    },
  },
});

export default theme;