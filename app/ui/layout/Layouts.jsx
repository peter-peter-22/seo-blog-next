import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export function SingleColumn({ Main }) {
    return (
        <MainContainer>
            {Main}
        </MainContainer>
    )
}

function SideColumn({ children }) {
    return (
        <Container component={"nav"} sx={{ flex: 1 }} >{children}</Container>
    )
}

export function MultipleColumns({ Left, Main, Right }) {
    return (
        <Stack direction="row" justifyContent={"center"}>
            <SideColumn  >
                <Box sx={{ width: "fit-content", ml: "auto" }}>
                    {Left}
                </Box>
            </SideColumn>
            <Divider orientation="vertical" flexItem />
            <MainContainer sx={{ flexShrink: 0, display: "flex", flexDirection: "column", m: 0 }}>
                {Main}
            </MainContainer>
            <Divider orientation="vertical" flexItem />
            <SideColumn  >
                <Box sx={{ width: "fit-content", mr: "auto" }}>
                    {Right}
                </Box>
            </SideColumn>
        </Stack>
    )
}

export function MainContainer({ children, ...props }) {
    return (
        <Container component="main" maxWidth="md" {...props}>
            {children}
        </Container>
    )
}