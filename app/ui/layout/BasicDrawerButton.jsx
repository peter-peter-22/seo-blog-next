"use client"

import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

export default function BasicDrawerButton({ Icon, ...props }) {
    const Component = ({ toggle, visible }) => (
        <Zoom in={visible} >
            <Fab onClick={toggle} sx={{ m: 1, }} {...props}>
                {Icon}
            </Fab>
        </Zoom>
    )
    return Component;
}