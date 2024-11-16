import Button from "@mui/material/Button";

export function SecondaryButton(props) {
    return (
        <Button variant="outlined" {...props}>{props.children}</Button>
    )
}

export function PrimaryButton(props) {
    return (
        <Button variant="contained" {...props}>{props.children}</Button>
    )
}