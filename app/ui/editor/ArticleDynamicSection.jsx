"use client"

import getProfileLink from '@/app/ui/components/users/getProfileLink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import HybridAvatar from '../profile/HybridAvatar';
import formatDate from '../utilities/formatDate';
import formatNumber from '../utilities/formatNumber';

import { useArticleDynamicData } from "@/app/(pages)/articles/[id]/ArticleDynamicDataProvider";

export function ArticleDynamicSection() {
    const { article, loading } = useArticleDynamicData();

    return (
        <List>
            <ListItem disablePadding>
                <ListItemAvatar>
                    {loading ? (
                        <Skeleton variant="circular" height={40} width={40}/>
                    ) : (
                        <HybridAvatar user={article.user} />
                    )}
                </ListItemAvatar>
                <ListItemText
                    primary={loading ? (
                        <Skeleton variant="text" />
                    ) : (
                        <Link href={getProfileLink(article.user)} color="inherit">{article.user.name}</Link>
                    )}
                    secondary={loading ? (
                        <Skeleton variant="text" />
                    ) : (
                        formatDate(article.createdAt)
                    )}
                />
            </ListItem>

            <ListItem disablePadding>
                <ListItemIcon>
                    <Tooltip title="View count">
                        <VisibilityIcon />
                    </Tooltip>
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography color="text.secondary">
                            {loading ? (
                                "..."
                            ) : (
                                formatNumber(article.viewCount)
                            )}
                        </Typography>
                    }
                />
            </ListItem>
        </List>
    )
}
