import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Footer from './footer/Footer';
import Header from './header/Header';
import Toolbar from '@mui/material/Toolbar';
import { blueGrey } from '@mui/material/colors';
import Box from '@mui/material/Box';

export default function Root({ children }) {
    return (
        <Stack sx={{ minHeight: "100dvh", bgcolor: blueGrey[50] }}>
            <Header />
            <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Stack sx={{ flexGrow: 1 }}>
                    <Toolbar />
                    <Box sx={{ flexGrow: 1 }}>
                        {children}
                    </Box>
                    <Toolbar />
                </Stack>
                <Box sx={{ marginTop: "auto" }}>
                    <Footer />
                    <Toolbar />
                </Box>
            </Container>
        </Stack>
    )
}