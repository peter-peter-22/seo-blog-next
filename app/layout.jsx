import "@/app/css/body.css";
import "@/app/css/globals.css";
import ScrollToTop from '@/app/ui/components/pagination/ScrollToTop';
import Root from "@/app/ui/layout/Root";
import theme from '@/app/ui/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import metadataGenerator from './lib/seo/metadataGenerator';
import { baseUrl } from './lib/serverInfo';
import AuthProvider from './ui/layout/AuthProvider';
import NotificationProvider from './ui/layout/NotificationProvider';
import { SnackbarProviderClient } from './ui/layout/SnackbarProviderClient';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ScrollToTop />
        <NextTopLoader color="white" shadow={false} showSpinner={false} />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <NotificationProvider>
                <SnackbarProviderClient maxSnack={3}>
                  <Root>
                    {children}
                  </Root>
                </SnackbarProviderClient>
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export const metadata = metadataGenerator({
  title: {
    template: '%s - Textmine',
    default: 'Textmine'
  },
  metadataBase: baseUrl,
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
})