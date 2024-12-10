"use client";

import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import formatNumber from '@/app/ui/utilities/formatNumber';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { followAction } from '@/app/actions/followActions';
import { useTransition } from 'react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function FollowButtons({ userId, isFollowed, originalCount=0 }) {
    const [isFollowing, setFollowing] = useState(isFollowed);
    const [pending, startFollowAction] = useTransition();
    const { enqueueSnackbar } = useSnackbar();

    const toggleFollow = useCallback(() => {
        if (pending)
            return;

        const newValue = !isFollowing;
        startFollowAction(
            async () => {
                try {
                    await followAction({
                        userId,
                        isFollowing
                    });
                    setFollowing(newValue);
                }
                catch (err) {
                    enqueueSnackbar(err.toString(), { variant: "error" });
                }
            }
        )
    }, [isFollowing, pending]);

    let localCount = originalCount;
    if (isFollowing && !isFollowed)
        localCount++;
    else if (!isFollowing && isFollowed)
        localCount--;

    return (
        <CardActions>
            <Typography>{formatNumber(localCount)}</Typography>
            <IconButton onClick={toggleFollow}>
                {isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
            </IconButton>
        </CardActions>
    )
}