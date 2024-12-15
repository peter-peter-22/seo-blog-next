import Container from '@mui/material/Container';

export function SingleColumn({ children, ...props }) {
    return (
        <MainContainer component="main" {...props}>
            {children}
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