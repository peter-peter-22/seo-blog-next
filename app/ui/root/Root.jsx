import Box from '@mui/material/Box';
import Footer from './footer/Footer';
import Header from './header/Header';
import Stack from '@mui/material/Stack';

export default function Root({ children }) {
    return (
        <Stack sx={{ minHeight: "100dvh" }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Stack>
    )
}