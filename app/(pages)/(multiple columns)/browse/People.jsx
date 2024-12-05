import ProfileListItem from '@/app/ui/components/users/ProfileListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

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

            <List>
                {users.map((user, key) => (
                    <Fragment key={key}>
                        <ProfileListItem user={user} />
                        <Divider variant="inset" component="li" />
                    </Fragment>
                ))}
            </List>

            <CardActions>
                <Button>
                    Show more
                </Button>
            </CardActions>
        </Box>
    )
}