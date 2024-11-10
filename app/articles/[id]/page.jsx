import ArticleViewer from "@/app/ui/editor/ArticleViewer";
import prisma from "@/utils/db";
import { Toolbar } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

export default async function Page(props) {
    const { id } = await props.params;
    const article = await prisma.article.findUniqueOrThrow({ where: { id: id } });
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h4">
                        {article.title}
                    </Typography>
                    <Typography >
                        {article.desc}
                    </Typography>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText secondary="author" />
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemIcon>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText secondary="2020202020" />
                    </ListItem>
                </CardContent>
            </Card>
            <Toolbar />
            <Card>
                <CardContent>
                    <ArticleViewer article={article.content} />
                </CardContent>
            </Card>
        </>
    );
}
