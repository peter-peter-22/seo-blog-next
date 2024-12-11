"use client";

import useFollow from '@/app/ui/profile/reactions/useFollow';
import formatNumber from '@/app/ui/utilities/formatNumber';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function FollowProfile(props) {
    const { localCount, toggleFollow, isFollowing } = useFollow(props);
    return (
        <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" color="text.secondary">{formatNumber(localCount)} followers</Typography>
            <IconButton onClick={toggleFollow} size="small">
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
        </Stack>
    )
}