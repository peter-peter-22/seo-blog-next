import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import getProfileLink from '@/app/ui/components/users/getProfileLink';
import Link from '@mui/material/Link';

export default function ProfileListItem({ user }) {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <HybridAvatar user={user} />
            </ListItemAvatar>
            <ListItemText
                primary={<Link href={getProfileLink(user)} color="inherit">{user.name}</Link>}
                secondary={user.description}
            />
        </ListItem>
    )
}