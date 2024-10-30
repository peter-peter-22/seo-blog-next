import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import NavLinks from './NavLinks';

export default () => {
    return (
        <>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <NavLinks />
        </>
    )
}