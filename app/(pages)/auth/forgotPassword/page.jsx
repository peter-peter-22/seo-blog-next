import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryButton } from '@/app/ui/forms/components/FormButtons';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function Page() {
    return (
        <Container maxWidth="sm" component="main">
            <Card   >
                <CardContent>
                    <FieldContainer >
                        <Typography variant='h5'>Forgot password</Typography>
                        <Divider />
                        <Typography >To set a new password, register with the same email address again.</Typography>
                    </FieldContainer>
                </CardContent>
                <CardActions>
                    <PrimaryButton href="/auth/register">
                        Register
                    </PrimaryButton>
                </CardActions>
            </Card>
        </Container>
    );
}