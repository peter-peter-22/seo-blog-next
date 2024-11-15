import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export default function FormTextField({ name, ...props }) {
    const { register, formState: { errors } } = useFormContext();
    const myError = errors[name]?.message;
    return (
        <>
            <TextField
                error={!!myError}
                helperText={myError}
                {...register(name)}
                {...props}
            />
        </>
    );
}