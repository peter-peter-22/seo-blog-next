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
import metadataGenerator from './lib/seo/metadataGenerator';
import { baseUrl } from './lib/serverInfo';
import "@/app/css/globals.css";
import { Suspense } from 'react';

export const roboto = Roboto({
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
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback="authentication">
              <AuthProvider>
                <NotificationProvider>
                  <SnackbarProviderClient maxSnack={3}>
                    <Root>
                      <Suspense fallback="loading page">
                        {children}
                      </Suspense>
                    </Root>
                  </SnackbarProviderClient>
                </NotificationProvider>
              </AuthProvider>
            </Suspense>
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