import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';

export default function FormPasswordField({ name, ...props }) {
    const { register, formState: { errors } } = useFormContext();
    const myError = errors[name]?.message;
    const [visible, setVisible] = useState(false);
    const toggleVisibility = useCallback(() => {
        setVisible(prev => !prev);
    }, []);
    return (
        <>
            <TextField
                type={visible ? 'text' : 'password'}
                error={!!myError}
                helperText={myError}
                {...register(name)}
                {...props}

                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        visible ? 'hide the password' : 'display the password'
                                    }
                                    onClick={toggleVisibility}
                                    edge="end"
                                >
                                    {visible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
        </>
    );
}