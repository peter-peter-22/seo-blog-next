import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';

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

export function PrimaryLoadingButton(props) {
    return (
        <LoadingButton variant="contained" {...props}>{props.children}</LoadingButton>
    )
}