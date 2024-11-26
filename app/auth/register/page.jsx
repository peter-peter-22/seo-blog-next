"use client";

import { crendentialsRegisterAction } from '@/app/actions/emailActions';
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
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useSuccessUrl } from '../authUtilities';

export default function Page() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    const successUrl = useSuccessUrl();

    const methods = useForm({
        resolver: zodResolver(RegisterSchema), // Apply the zodResolver
        defaultValues: {
            username: "new user",
            email: "gfdifgjiugfdjiudfgjjiu@gmail.com",
            password: "123456",
            confirmPassword: "123456"
        }
    });
    const { handleSubmit, formState: { isSubmitting, errors } } = methods;

    const onSubmit = async (data) => {
        const error = await crendentialsRegisterAction(data,successUrl);
        if (error) {
            return enqueueSnackbar(error, { variant: "error" });
        }
        router.push("/auth/register/emailSent");
    }

    return (
        <Container maxWidth="sm" sx={{ p: 0 }}>
            <Card sx={{ my: "auto" }}>
                <CardContent>
                    <FormProvider {...methods}>
                        <FieldContainer component="form" onSubmit={handleSubmit(onSubmit)} >
                            <Typography variant='h5'>Register</Typography>
                            <FormTextField name="username" label="Username" fullWidth />
                            <FormTextField name="email" label="Email" fullWidth />
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