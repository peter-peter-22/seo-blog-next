import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export function SingleColumn({ Main }) {
    return (
        <MainContainer>
            {Main}
        </MainContainer>
    )
}

export function MultipleColumns({ Left, Main, Right }) {
    return (
        <Stack direction="row" justifyContent={"center"}>
            <Box component={"nav"} sx={{ flexBasis: 1 }} >
                {Left}
            </Box>
            <MainContainer sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {Main}
            </MainContainer>
            <Box component={"nav"} sx={{ flexBasis: 1 }} >
                {Right}
            </Box>
        </Stack>
    )
}

export function MainContainer({ children,...props }) {
    return (
        <Container component="main" maxWidth="md" {...props}>
            {children}
        </Container>
    )
}