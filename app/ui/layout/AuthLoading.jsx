import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function AuthLoading() {
    return (
        <Box sx={{ height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
        </Box>
    )
}