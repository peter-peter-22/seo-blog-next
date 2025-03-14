"use client";

import { loadMoreCommentsAction } from '@/app/actions/articleActions';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { Fragment, useCallback, useEffect, useState, useTransition } from 'react';
import { useArticleDynamicData } from './ArticleDynamicDataProvider';
import Comment from './Comment';
import CommentDialog from './CommentDialog';
import { CommentSectionSkeleton } from './CommentSectionSkeleton';
import CommentIcon from '@mui/icons-material/Comment';

export default function ArticleComments() {
    const { article, loading } = useArticleDynamicData();
    const [dialog, setDialog] = useState();
    const closeDialog = useCallback(() => { setDialog() }, [])
    const [comments, setComments] = useState([]);
    const [commentsMade, setCommentsMade] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const [isLastPage, setLastPage] = useState(false);

    //store the comments into a state when loaded
    useEffect(() => {
        if (!article)
            return;
        setComments(article.Comments);
    }, [loading, article])

    //add a new comment to the top of the list
    const addComment = useCallback((newComment) => {
        setComments(prev => [newComment, ...prev]);
        setCommentsMade(prev => prev + 1);
    }, [])

    //replace a comment at an id
    const updateComment = useCallback((updatedComment) => {
        setComments(prev => prev.map(comment => (
            comment.id === updatedComment.id ? updatedComment : comment
        )))
    }, [])

    //delete a comment at an id
    const deleteComment = useCallback((deletedId) => {
        setComments(prev => prev.filter(comment => (
            comment.id !== deletedId
        )))
        setCommentsMade(prev => prev - 1);
    }, [])

    const openCommentDialog = useCallback((options) => () => {
        setDialog(
            < CommentDialog
                {...options}
                articleId={article.id}
                onPublish={addComment}
                onUpdate={updateComment}
                close={closeDialog}
            />
        )
    }, [addComment, article, closeDialog, updateComment])

    const [isPending, startLoading] = useTransition();
    const loadMoreComments = useCallback(() => {
        startLoading(async () => {
            let { comments: loaded, lastPage, error } = await loadMoreCommentsAction({
                offset: comments.length,
                articleId: article.id
            });
            if (error)
                return enqueueSnackbar(error.toString(), { variant: "error" })
            setLastPage(lastPage);
            setComments(prev => mergeUniqueById(prev, loaded));
        })
    }, [article, comments, enqueueSnackbar])

    //update the comment count when a new comment is added
    //this counts all comments, not just the loaded ones
    const commentCount = article ? article.commentCount + commentsMade : 0;

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant='h5'>
                        Comments
                    </Typography>
                    <Divider />
                    <Typography color="text.secondary">
                        {loading ? "Loading..." : commentCount > 0 ? `${commentCount} comments` : "No comments yet"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={openCommentDialog()}>
                        Comment
                    </Button>
                </CardActions>
                <>
                    <Divider />
                    <Box sx={{
                        height: 500,
                        overflowY: "auto"
                    }}>
                        {
                            loading ? (
                                <CommentSectionSkeleton />
                            ) : commentCount === 0 ? (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
                                    <CommentIcon sx={{ color: "text.secondary", fontSize: 50 }} />
                                    <Typography color="textSecondary">Be the first commenter</Typography>
                                </Box>
                            ) : (
                                <>
                                    <List>
                                        {comments.map((comment, i, array) => (
                                            <Fragment key={comment.id}>
                                                <Comment
                                                    comment={comment}
                                                    openCommentDialog={openCommentDialog}
                                                    onDelete={deleteComment}
                                                />
                                                {i < array.length - 1 && <Divider variant="inset" component={"li"} />}
                                            </Fragment>
                                        ))}
                                    </List>
                                    {!isLastPage &&
                                        <CardActions>
                                            <LoadingButton loading={isPending} onClick={loadMoreComments}>
                                                Load more
                                            </LoadingButton>
                                        </CardActions>
                                    }
                                </>
                            )
                        }
                    </Box>
                </>
            </Card>
            <Dialog
                open={!!dialog}
                onClose={closeDialog}
                disableRestoreFocus
                maxWidth="sm"
                fullWidth
            >
                {dialog}
            </Dialog>
        </>
    )
}

function mergeUniqueById(array1, array2) {
    const mergedArray = array1.concat(array2);

    // Create a Map to store unique objects by `id`
    const uniqueById = new Map();

    mergedArray.forEach(item => {
        if (!uniqueById.has(item.id)) {
            uniqueById.set(item.id, item);
        }
    });

    // Convert Map back to array
    return Array.from(uniqueById.values());
}  