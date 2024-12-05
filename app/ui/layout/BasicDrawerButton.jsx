"use client"

import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

export default function BasicDrawerButton({ Icon, ...props }) {
    return ({ toggle, visible }) => (
        <Zoom in={visible}>
            <Fab onClick={toggle} sx={{ m: 1 }} {...props}>
                {Icon}
            </Fab>
        </Zoom>
    )
}