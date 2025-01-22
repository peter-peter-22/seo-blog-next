"use client"

import useFollow from '@/app/ui/profile/reactions/useFollow';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { ListItemIcon } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useArticleDynamicData } from '../ArticleDynamicDataProvider';

export function ArticleFollowButton() {
    const { article, isMine } = useArticleDynamicData();
    const { isFollowing, toggleFollow } = useFollow({ user: article.user });
    if (isMine)
        return;
    return (
        <ListItem disablePadding>
            <ListItemButton>
            <ListItemIcon>
                {isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
            </ListItemIcon>
                <ListItemText primary={isFollowing ? "Unfollow" : "Follow"} onClick={toggleFollow} />
            </ListItemButton>
        </ListItem>
    )
}