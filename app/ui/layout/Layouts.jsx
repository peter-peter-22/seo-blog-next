import Container from '@mui/material/Container';

export function SingleColumn({ Main, ...props }) {
    return (
        <MainContainer {...props}>
            {Main}
        </MainContainer>
    )
}

export function MainContainer({ children, ...props }) {
    return (
        <Container component="main" maxWidth="md" {...props}>
            {children}
        </Container>
    )
}