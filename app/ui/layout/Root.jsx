import Stack from '@mui/material/Stack';
import { blueGrey } from '@mui/material/colors';
import Header from './header/Header';

export default function Root({ children }) {
    return (
        <Stack sx={{ minHeight: "100dvh", bgcolor: blueGrey[50] }}>
            <Header />
            {children}
        </Stack>
    )
}