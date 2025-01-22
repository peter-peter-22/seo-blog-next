"use client"

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Popover from '@mui/material/Popover';
import { useCallback, useState } from 'react';
import { useArticleDynamicData } from '../ArticleDynamicDataProvider';
import { ArticleCopyButton } from './ArticleCopyButton';
import { ArticleFollowButton } from './ArticleFollowButton';
import ArticleEditButton from './ArticleEditButton';
import ArticleDeleteButton from './ArticleDeleteButton';

export function ArticleOptions() {
    const [anchor, setAnchor] = useState(false);
    const handleOpen = useCallback((e) => { setAnchor(e.currentTarget) }, []);
    const handleClose = useCallback(() => { setAnchor(null) }, []);
    const id = "manage article";
    const { loading } = useArticleDynamicData();

    return (
        <>
            <div>
                <IconButton size="small" onClick={handleOpen} aria-describedby={id} >
                    <MoreHorizIcon />
                </IconButton>
            </div>
            {!loading &&
                <Popover
                    open={!!anchor}
                    onClose={handleClose}
                    id={id}
                    anchorEl={anchor}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted={true}//necessary for the follow button
                    onClick={handleClose}
                >
                    <List >
                        <ArticleCopyButton />
                        <ArticleFollowButton />
                        <ArticleEditButton />
                        <ArticleDeleteButton />
                    </List>
                </Popover>
            }
        </>
    )
}