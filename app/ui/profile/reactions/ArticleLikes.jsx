"use client";

import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import formatNumber from '@/app/ui/utilities/formatNumber';
import { useTransition, useCallback, useState } from 'react';
import { likeAction } from '@/app/actions/likeActions';
import { useSnackbar } from 'notistack';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function ArticleLikes({ article }) {
    const likeOfUser = article.VerifiedLike?.[0] || article.UnverifiedLike?.[0];
    const originalLikeState = likeOfUser ? !likeOfUser.isDislike : undefined;

    const originalLikes = article.likeCount;
    const originalDislikes = article.dislikeCount;
    const [localLikeState, setLocalLikeState] = useState(originalLikeState);
    const [pending, startLikeAction] = useTransition();
    const { enqueueSnackbar } = useSnackbar();

    const executeLikeAction = useCallback((value) => {
        startLikeAction(
            async () => {
                try {
                    await likeAction({
                        articleId: article.id,
                        isLike: value === true,
                        isDislike: value === false
                    });
                    setLocalLikeState(newValue);
                }
                catch (err) {
                    enqueueSnackbar(err.toString(), { variant: "error" });
                }
            }
        )
    }, [])

    //adjust the like count on the client according to the state of the like buttons
    let localLikes = originalLikes;
    let localDislikes = originalDislikes;
    if (localLikeState !== originalLikeState) {
        if (localLikeState === true && !originalLikeState)
            localLikes++;
        else if (!localLikeState && originalLikeState === true)
            localLikes--;
        if (localLikeState === false && (originalLikeState === undefined || originalLikeState === true))
            localDislikes++;
        else if ((localLikeState === undefined || localLikeState === true) && originalLikeState === false)
            localDislikes--;
    }

    const handleLike = useCallback((value) => () => {
        if (pending)
            return;
        const newValue = localLikeState === value ? undefined : value;
        executeLikeAction(newValue)
    }, [localLikeState, pending]);

    return (
        <CardActions>
            <IconButton
                color={localLikeState === true ? "primary" : "default"}
                onClick={handleLike(true)}
            >
                <ThumbUpIcon />
            </IconButton>
            <Typography>{formatNumber(localLikes)}</Typography>
            <Divider orientation='vertical' flexItem variant="middle" />
            <Typography>{formatNumber(localDislikes)}</Typography>
            <IconButton color={localLikeState === false ? "primary" : "default"} onClick={handleLike(false)}>
                <ThumbDownIcon />
            </IconButton>
        </CardActions>
    )
}