import prisma from "@/utils/db";
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Card from '@mui/material/Card';
import ArticleViewer from "@/app/ui/editor/ArticleViewer";

export default async function Page(props) {
    const { id } = await props.params;
    const article = await prisma.article.findUniqueOrThrow({ where: { id: id } });
    return (
        <>
            <Toolbar />
            <Typography variant="h4">
                {article.title}
            </Typography>
            <Typography >
                {article.desc}
            </Typography>
            <Toolbar />
            <ArticleViewer article={article.content} />
        </>
    );
}
