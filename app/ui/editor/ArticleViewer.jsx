import { PlateViewer } from '@/components/editor/plate-viewer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from "@mui/material/Chip";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TagContainer from "../components/articles/TagContainer";
import Stack from "@mui/material/Stack";

export default function ArticleViewer({ article, DynamicSection, Options }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant="h4" component="h1">
                            {article.title}
                        </Typography>
                    {Options}
                    </Stack>
                    <Divider />
                    <Typography component={"h2"}>
                        {article.description}
                    </Typography>

                    {DynamicSection}

                    {article.tags && article.tags.length > 0 ? (
                        <TagContainer>
                            {article.tags.map((tag, i) => (
                                <Chip
                                    key={i}
                                    label={tag}
                                    size="small"
                                    clickable
                                    component={Link}
                                    href={`/browse?${new URLSearchParams({ tag: tag }).toString()}`}
                                />
                            ))}
                        </TagContainer>
                    ) : (
                        <Typography color="text.secondary">Untagged</Typography>
                    )
                    }
                </CardContent>
            </Card>
            <Toolbar />
            <PlateViewer
                value={article.content}
            />
        </>
    );
}