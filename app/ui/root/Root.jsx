import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Footer from './footer/Footer';
import Header from './header/Header';

export default function Root({ children }) {
    return (
        <Stack sx={{ minHeight: "100dvh" }}>
            <Header />
            <Container component="main" maxWidth="lg" sx={{ flexGrow: 1 }}>
                {children}
            </Container>
            <Footer />
        </Stack>
    )
}