import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Link from 'next/link';

export default function EditorBottomMenu() {
    return (
        <>
            <Toolbar />
            <Typography>
                Publish the article to make it visible for the readers.
            </Typography>
            <Typography>
                The article remains editable after publishing.
            </Typography>
            <Stack spacing={2} direction="row">
                <Button variant="outlined" LinkComponent={Link} href="/">Cancel</Button>
                <Button variant="contained" type="submit">Publish</Button>
            </Stack>
        </>
    )
}