import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import HybridAvatar from '@/app/ui/profile/HybridAvatar';

export default function UserProfile({ user }) {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <HybridAvatar user={user} />
            </ListItemAvatar>
            <ListItemText
                primary={user.name}
                secondary={"Journalist"}
            />
        </ListItem>
    )
}