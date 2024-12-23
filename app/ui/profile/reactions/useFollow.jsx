"use client";

import { followAction } from '@/app/actions/followActions';
import { useSnackbar } from 'notistack';
import { useCallback, useState, useTransition } from 'react';

export default function useFollow({ user }) {
    const isFollowed = !!user.Followers?.[0];
    const [isFollowing, setFollowing] = useState(!!user.Followers?.[0]);
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
                        userId: user.id,
                        setFollowing: newValue
                    });
                    enqueueSnackbar(
                        newValue ? `Followed ${user.name}` : `Unfollowed ${user.name}`,
                        { variant: newValue ? "success" : "default" }
                    )
                    setFollowing(newValue);
                }
                catch (err) {
                    enqueueSnackbar(err.toString(), { variant: "error" });
                }
            }
        )
    }, [isFollowing, pending, user, enqueueSnackbar]);

    let localCount = user.followerCount;
    if (isFollowing && !isFollowed)
        localCount++;
    else if (!isFollowing && isFollowed)
        localCount--;

    return { localCount, toggleFollow, isFollowing }
}