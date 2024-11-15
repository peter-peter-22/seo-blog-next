"use client";

import { SubmitButton } from '@/app/ui/forms/components/FormButtons';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { LoginSchema } from '@/app/ui/forms/schemas/AuthSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { loginAction } from '../lib/authActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormPasswordField from '../ui/forms/components/FormPasswordField';

export default function Page() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("callbackUrl") || "/profile";

    const methods = useForm({
        resolver: zodResolver(LoginSchema), // Apply the zodResolver
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        data.redirectTo = redirect;
        const error = await loginAction(data);
        if (error)
            alert(error);
    }

    return (
        <Container maxWidth="sm">
            <Card sx={{ my: "auto" }}>
                <CardContent>
                    <FormProvider {...methods}>
                        <FieldContainer component="form" onSubmit={handleSubmit(onSubmit)} >
                            <Typography variant='h5'>Login</Typography>
                            <FormTextField name="username" label="Username" fullWidth />
                            <FormPasswordField name="password" label="Password" fullWidth />
                            <SubmitButton disabled={isSubmitting}>
                                Submit
                            </SubmitButton>
                        </FieldContainer>
                    </FormProvider>
                </CardContent>
            </Card>
        </Container>
    );
}