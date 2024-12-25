import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/ui/theme';
import Root from "@/app/ui/layout/Root";
import "@/app/css/body.css";
import { SnackbarProviderClient } from './ui/layout/SnackbarProviderClient';
import ScrollToTop from '@/app/ui/components/pagination/ScrollToTop';
import CssBaseline from "@mui/material/CssBaseline";
import AuthProvider from './ui/layout/AuthProvider';
import NotificationProvider from './ui/layout/NotificationProvider';
import NextTopLoader from 'nextjs-toploader';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ScrollToTop />
        <NextTopLoader color="white" shadow={false} showSpinner={false} />
        <AppRouterCacheProvider>
          <AuthProvider>
            <NotificationProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProviderClient maxSnack={3}>
                  <Root>
                    {children}
                  </Root>
                </SnackbarProviderClient>
              </ThemeProvider>
            </NotificationProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    template: '%s - Textmine',
    default: 'Textmine'
  },
  description: 'A site where anybody can be a journalist. Read or write articles.',
  icons: [
    {
      url: '/icon-light.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/icon-dark.png',
      media: '(prefers-color-scheme: dark)',
    },
  ],
}
