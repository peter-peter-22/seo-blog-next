import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { MainContainer } from '../ui/layout/Layouts';
import Footer from '../ui/layout/footer/Footer';
import { ZodCustomErrors } from '../lib/zodErrors';

export default function Layout({ children }) {
    return (
        <>
            <ZodCustomErrors />
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
        </>
    )
}