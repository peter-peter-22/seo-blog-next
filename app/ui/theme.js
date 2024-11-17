'use client';
import { createTheme } from '@mui/material/styles';
import NextLink from 'next/link';

const FixLink = props => <NextLink {...props} />;

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
    MuiLink: {
      defaultProps: {
        underline: "hover",
        component: FixLink
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: FixLink
      }
    }
  },
});

export default theme;