import Typography from "@mui/material/Typography";
import ArticleViewer from "../ui/editor/ArticleViewer";
import React from "react";
import Container from '@mui/material/Container';
import { Toolbar } from "@mui/material";

export default function Home() {
    return (
        <Container maxWidth="lg">
            <Toolbar />
            <Typography variant="h4">
                Article editor
            </Typography>
            <Typography>
                Images can be uploaded only via external url. To use your own images here, use a cloud service like google drive.
            </Typography>
            <ArticleViewer />
        </Container>
    );
}
