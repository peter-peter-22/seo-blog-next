import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Footer from './footer/Footer';
import Header from './header/Header';
import Toolbar from '@mui/material/Toolbar';
import { blueGrey } from '@mui/material/colors';

export default function Root({ children }) {
    return (
        <Stack sx={{ minHeight: "100dvh", bgcolor: blueGrey[50] }}>
            <Header />
            <Container component="main" maxWidth="lg" sx={{ flexGrow: 1 }}>
                <Toolbar />
                {children}
                <Toolbar />
                <Footer />
                <Toolbar />
            </Container>
        </Stack>
    )
}