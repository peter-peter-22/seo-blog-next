import Fab from '@mui/material/Fab';

export default function BasicDrawerButton({ Icon, ...props }) {
    return ({ toggle }) => (
        <Fab onClick={toggle} sx={{ m: 1 }} {...props}>
            {Icon}
        </Fab>
    )
}