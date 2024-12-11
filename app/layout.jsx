import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/ui/theme';
import Root from "@/app/ui/layout/Root";
import "@/app/css/body.css";
import { AuthProvider } from './ui/layout/AuthProvider';
import { auth } from '@/auth'
import { SnackbarProviderClient } from './ui/layout/SnackbarProviderClient';
import ScrollToTop from '@/app/ui/components/pagination/ScrollToTop';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ScrollToTop />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider session={session}>
              <SnackbarProviderClient maxSnack={3}>
                <Root>
                  {children}
                </Root>
              </SnackbarProviderClient>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
