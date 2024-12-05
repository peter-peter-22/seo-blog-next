import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export function SingleColumn({ Main, ...props }) {
    return (
        <MainContainer {...props}>
            {Main}
        </MainContainer>
    )
}

function SideColumn({ children }) {
    return (
        <Container sx={{ flex: 1 }} >{children}</Container>
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
            <MainContainer sx={{ flexShrink: 1, display: "flex", flexDirection: "column", m: 0 }}>
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

export function MultipleColumnsAssymetric({ Left, Main, Right }) {
    return (
        <Stack direction="row" justifyContent={"center"}>
            {Left && <>
                <Container sx={{ width: "fit-content", m: 0 }}>
                    {Left}
                </Container>
                <Divider orientation="vertical" flexItem />
            </>}

            <MainContainer sx={{ flexShrink: 1, display: "flex", flexDirection: "column", m: 0 }} >
                {Main}
            </MainContainer>

            {Right && <>
                <Divider orientation="vertical" flexItem />
                <Container sx={{ width: "fit-content", m: 0 }}>
                    {Right}
                </Container>
            </>}
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