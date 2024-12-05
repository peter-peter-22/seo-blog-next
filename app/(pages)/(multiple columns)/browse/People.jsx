import ProfileList from '@/app/ui/components/users/ProfileList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';

export default function People({ articles }) {
    let users = articles.map(article => article.user);
    users = users.filter((user, index, self) =>
        index === self.findIndex((otherUser) => otherUser.id === user.id)
    );
    return (
        <Box sx={{ width: 240 }} component="nav">
            <CardContent>
                <Typography variant="h5">
                    Relevant authors
                </Typography>
                <Divider />
            </CardContent>

            <ProfileList items={users} />

            <CardActions>
                <Button>
                    Show more
                </Button>
            </CardActions>
        </Box>
    )
}