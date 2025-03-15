"use client";

import { useSuccessUrl } from '@/app/(pages)/auth/authUtilities';
import { formatAuthError } from '@/app/(pages)/auth/processAuthErrors';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryLoadingButton } from '@/app/ui/forms/components/FormButtons';
import FormPasswordField from '@/app/ui/forms/components/FormPasswordField';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { LoginSchema } from '@/app/ui/forms/schemas/AuthSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import ForgotPasswordButton from '../ForgotPasswordButton';

export default function LoginPage() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    const successUrl=useSuccessUrl();

    const methods = useForm({
        resolver: zodResolver(LoginSchema), // Apply the zodResolver
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        const { error } = await signIn("login", { ...data, redirect: false });
        if (error) {
            const formated = formatAuthError(error);
            return enqueueSnackbar(formated, { variant: "error" });
        }
        router.push(successUrl);
    }

    return (
        <Container maxWidth="sm" component="main">
            <Card sx={{ my: "auto" }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <FormProvider {...methods}>
                        <FieldContainer  >
                            <Typography variant='h5'>Login</Typography>
                            <FormTextField name="email" label="Email" fullWidth />
                            <FormPasswordField name="password" label="Password" fullWidth />
                            <ForgotPasswordButton />
                        </FieldContainer>
                    </FormProvider>
                </CardContent>
                <CardActions>
                    <PrimaryLoadingButton type={"submit"} loading={isSubmitting}>
                        Login
                    </PrimaryLoadingButton>
                </CardActions>
            </Card>
        </Container>
    );
}