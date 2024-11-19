import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import StringAvatar from './StringAvatar';

export default function UserProfile({ user }) {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <StringAvatar name={user.username} />
            </ListItemAvatar>
            <ListItemText
                primary={user.username}
                secondary={"Journalist"}
            />
        </ListItem>
    )
}