import LogoSvg from "@/public/react svgs/LogoSvg"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { MainContainer } from "../ui/layout/Layouts"

export default function Page() {
    return (
        <MainContainer sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <LogoSvg sx={{ flexGrow: 1,width:"100%" }} />
        </MainContainer>
    )
}