import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuNavLinks from './MenuNavLinks';

export default function MenuContents()  {
    return (
        <>
            <Typography variant="h6" sx={{ m: 2 }}>
                Menu
            </Typography>
            <Divider />
            <MenuNavLinks />
        </>
    )
}