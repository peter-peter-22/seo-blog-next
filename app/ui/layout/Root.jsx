import Stack from '@mui/material/Stack';
import Footer from './footer/Footer';
import Header from './header/Header';
import Toolbar from '@mui/material/Toolbar';
import { blueGrey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { MainContainer } from './Layouts';

export default function Root({ children }) {
    return (
        <Stack sx={{ minHeight: "100dvh", bgcolor: blueGrey[50] }}>
            <Header />
            <Toolbar />
            <Stack sx={{ flexGrow: 1 }}>
                <Box sx={{ my: "auto" }}>
                    {children}
                </Box>
            </Stack>
            <Toolbar />
            <MainContainer>
                <Footer />
            </MainContainer>
            <Toolbar />
        </Stack>
    )
}