'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import { LinkNoPrefetch } from '../lib/LinkNoPrefetch';

let theme = createTheme({
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
    MuiLink: {
      defaultProps: {
        underline: "hover",
        component: LinkNoPrefetch,
        variant: "body1"
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkNoPrefetch
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      browserMax: 1400,
      xl: 1536,
    }
  },
  colorSchemes: {
    dark: true
  },
  palette: {
    mode: "light",
    background: {
      default: blueGrey[50],
      paper: "#fff"
    }
  },
  cssVariables: true
});

theme = responsiveFontSizes(theme)

export default theme;