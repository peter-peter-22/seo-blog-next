import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import formatNumber from '@/app/ui/utilities/formatNumber';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function FollowButtons() {
    return (
        <CardActions>
            <IconButton>
                <PersonAddIcon />
            </IconButton>
            <Typography>{formatNumber(9999)}</Typography>
            <IconButton>
                <PersonRemoveIcon />
            </IconButton>
        </CardActions>
    )
}