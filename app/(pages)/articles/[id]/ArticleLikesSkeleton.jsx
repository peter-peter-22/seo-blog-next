import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export  function ArticleLikesSkeleton() {
    return (
        <CardActions>
            <IconButton>
                <ThumbUpIcon />
            </IconButton>
            <Typography>...</Typography>
            <Divider orientation='vertical' flexItem variant="middle" />
            <Typography>...</Typography>
            <IconButton >
                <ThumbDownIcon />
            </IconButton>
        </CardActions>
    )
}