"use client";

import { useSuccessUrl } from '@/app/auth/authUtilities';
import { formatAuthError } from '@/app/auth/processAuthErrors';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryButton } from '@/app/ui/forms/components/FormButtons';
import FormPasswordField from '@/app/ui/forms/components/FormPasswordField';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { RegisterSchema } from '@/app/ui/forms/schemas/AuthSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

export default function Page() {
    const successUrl = useSuccessUrl();
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()

    const methods = useForm({
        resolver: zodResolver(RegisterSchema), // Apply the zodResolver
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        const { error } = await signIn("register", { ...data, redirect: false });
        if (error) {
            const formated = formatAuthError(error);
            return enqueueSnackbar(formated, { variant: "error" });
        }
        router.push(successUrl);
    }

    return (
        <Container maxWidth="sm" sx={{p:0}}>
            <Card sx={{ my: "auto" }}>
                <CardContent>
                    <FormProvider {...methods}>
                        <FieldContainer component="form" onSubmit={handleSubmit(onSubmit)} >
                            <Typography variant='h5'>Register</Typography>
                            <FormTextField name="username" label="Username" fullWidth />
                            <FormPasswordField name="password" label="Password" fullWidth />
                            <FormPasswordField name="confirmPassword" label="Confirm Password" fullWidth />
                            <PrimaryButton type={"submit"} disabled={isSubmitting}>
                                Register
                            </PrimaryButton>
                        </FieldContainer>
                    </FormProvider>
                </CardContent>
            </Card>
        </Container>
    );
}