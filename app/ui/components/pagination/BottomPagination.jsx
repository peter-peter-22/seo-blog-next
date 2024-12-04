import Toolbar from "@mui/material/Toolbar";
import NextPagination from "./NextPagination";

export default function BottomPagination(props) {
    return (
        <>
            <Toolbar />
            <NextPagination {...props} sx={{ mx: "auto" }} />
        </>
    )
}