"use client";

import useFollow from '@/app/ui/profile/reactions/useFollow';
import formatNumber from '@/app/ui/utilities/formatNumber';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function FollowButtons(props) {
    const { localCount, toggleFollow, isFollowing } = useFollow(props);
    return (
        <ListItem disablePadding>
            <ListItemIcon>
                <IconButton onClick={toggleFollow} edge="start">
                    {isFollowing ? (
                        <Tooltip title="Click to unfollow this author">
                            <PersonRemoveIcon />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Click to follow this author">
                            <PersonAddIcon />
                        </Tooltip>
                    )}
                </IconButton>
            </ListItemIcon>
            <ListItemText >
                <Typography color="text.secondary">
                    {formatNumber(localCount)}
                </Typography>
            </ListItemText>
        </ListItem>
    )
}