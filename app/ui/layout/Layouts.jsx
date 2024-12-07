import Container from '@mui/material/Container';

export function SingleColumn({ Main, ...props }) {
    return (
        <MainContainer component="main" {...props}>
            {Main}
        </MainContainer>
    )
}

export function MainContainer({ children, ...props }) {
    return (
        <Container  maxWidth="md" {...props}>
            {children}
        </Container>
    )
}