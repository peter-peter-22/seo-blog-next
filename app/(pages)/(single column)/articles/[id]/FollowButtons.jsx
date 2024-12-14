"use client";

import formatNumber from '@/app/ui/utilities/formatNumber';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import useFollow from '@/app/ui/profile/reactions/useFollow';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function FollowButtons(props) {
    const { localCount, toggleFollow, isFollowing } = useFollow(props);
    return (
        <CardActions>
            <Typography>{formatNumber(localCount)}</Typography>
            <IconButton onClick={toggleFollow}>
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
        </CardActions>
    )
}