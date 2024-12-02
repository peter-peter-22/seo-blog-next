import  Button  from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';

export default function People() {
    return (
        <Card sx={{maxWidth:300}}>
            <CardContent>
                <Typography variant="h4">
                    Relevant authors
                </Typography>
                <Divider />
                ...
            </CardContent>
            <CardActions>
                <Button>
                    Show more
                </Button>
            </CardActions>
        </Card>
    )
}