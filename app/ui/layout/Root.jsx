import Stack from '@mui/material/Stack';
import Header from './header/Header';

export default function Root({ children }) {
    return (
        <Stack sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
            <Header />
            {children}
        </Stack>
    )
}