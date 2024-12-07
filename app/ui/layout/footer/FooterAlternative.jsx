import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { footerLinks } from './Footer';
import Toolbar from "@mui/material/Toolbar"

export default function FooterAlternative(props) {
    return (
        <Toolbar sx={{ display: "flex", alignItems: "center",flexDirection:"column", justifyContent: "center" }}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: true, justifyContent: "center" }}>
                {footerLinks.map((link, i) => (
                    <Link key={i} href={link.url} color="text.secondary">
                        {link.name}
                    </Link>
                ))}
            </Stack>
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>Created by Peter in 2024</Typography>
        </Toolbar>
    )
}