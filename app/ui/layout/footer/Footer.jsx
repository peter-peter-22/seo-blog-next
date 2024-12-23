import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

function NamedLink(name, url) {
    this.name = name;
    this.url = url;
}

export const footerLinks = [
    new NamedLink("Privacy policy", "/privacyPolicy"),
    new NamedLink("Terms of service", "/termsOfService"),
];

export default function Footer(props) {
    return (
        <Card {...props}>
            <CardContent>
                <Stack direction="row" spacing={1} sx={{ flexWrap: true, justifyContent: "center" }}>
                    {footerLinks.map((link, i) => (
                        <Link key={i} href={link.url} color="text.secondary">
                            {link.name}
                        </Link>
                    ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography color="text.secondary" sx={{ textAlign: "center" }}>Created by Peter in 2024</Typography>
            </CardContent>
        </Card>
    )
}