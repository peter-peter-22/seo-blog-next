import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import { ArticleLikes } from './ArticleLikes';

export default function LikeMenu() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Rate this article
                </Typography>
                <Divider />
                <Typography color="textSecondary">
                    Authentication is <strong>not</strong> required
                </Typography>
            </CardContent>
            <ArticleLikes />
        </Card>
    )
}