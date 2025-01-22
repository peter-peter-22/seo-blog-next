import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function PageLoading() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </Box>
    )
}