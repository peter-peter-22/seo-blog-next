import LogoSvg from "@/public/react svgs/LogoSvg"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FooterAlternative from "../ui/layout/footer/FooterAlternative"
import { MainContainer } from "../ui/layout/Layouts"
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function Page() {
    return (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", bgcolor: "background.default" }} component="main">
            <Box sx={{ flexGrow: 1, position: "relative", justifyContent: "center", alignItems: "center", display: "flex" }}>
                <LogoSvg sx={{ opacity: 0.1, position: 'absolute', height: "100%", width: "auto", maxWidth: "100%", top: 0, right: 0 }} />
                <MainContainer sx={{ height: "100%" }}>
                    <Typography variant="h1">Textmine</Typography>
                    <Divider />
                    <Typography variant="h6" color="text.secondary">A place where anyone can be a journalist.</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                        <Button variant="contained" href={"/browse"} startIcon={<AutoStoriesIcon />}>Read</Button>
                        <Button variant="contained" href={"/profile/write"} startIcon={<CreateIcon />}>Write</Button>
                    </Stack>
                </MainContainer>
            </Box>
            <Divider />
            <FooterAlternative />
        </Box>
    )
}