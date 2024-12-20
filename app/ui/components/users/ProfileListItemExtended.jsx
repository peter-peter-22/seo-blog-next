import HybridAvatar from '@/app/ui/profile/HybridAvatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import getProfileLink from '@/app/ui/components/users/getProfileLink';
import Link from '@mui/material/Link';
import TagContainer from '../articles/TagContainer';
import Chip from '@mui/material/Chip';
import formatNumber from '../../utilities/formatNumber';

import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';

export default function ProfileListItemExtended({ user }) {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <HybridAvatar user={user} />
            </ListItemAvatar>
            <ListItemText
                primary={<Link href={getProfileLink(user)} color="inherit">{user.name}</Link>}
                secondary={<>
                    {user.description}
                    <TagContainer sx={{mt:1}}>
                        <Chip
                            label={formatNumber(user.articleCount)}
                            icon={<ArticleIcon />}
                            size="small"
                        />
                        <Chip
                            label={formatNumber(user.followerCount)}
                            icon={<PersonIcon />}
                            size="small"
                        />
                    </TagContainer>
                </>}
            />
        </ListItem>
    )
}