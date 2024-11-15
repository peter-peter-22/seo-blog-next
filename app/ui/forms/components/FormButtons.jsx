import Button from "@mui/material/Button";

export function CancelButton(props) {
    return (
        <Button variant="outlined" {...props}>{props.children}</Button>
    )
}

export function SubmitButton(props) {
    return (
        <Button variant="contained" type="submit" {...props}>{props.children}</Button>
    )
}