"use client";

import { crendentialsRegisterAction } from '@/app/actions/emailActions';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryLoadingButton } from '@/app/ui/forms/components/FormButtons';
import FormPasswordField from '@/app/ui/forms/components/FormPasswordField';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { RegisterSchema } from '@/app/ui/forms/schemas/AuthSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { getSuccessUrl } from '../authUtilities';
import ForgotPasswordButton from '../ForgotPasswordButton';

export default function RegisterPage() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    const successUrl = getSuccessUrl()

    const methods = useForm({
        resolver: zodResolver(RegisterSchema), // Apply the zodResolver
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        const error = await crendentialsRegisterAction(data, successUrl);
        if (error) {
            return enqueueSnackbar(error, { variant: "error" });
        }
        router.push("/auth/register/emailSent");
    }

    return (
        <Container maxWidth="sm" component={"main"}>
            <Card sx={{ my: "auto" }} component="form" onSubmit={handleSubmit(onSubmit)} >
                <CardContent>
                    <FormProvider {...methods}>
                        <FieldContainer >
                            <Typography variant='h5'>Register</Typography>
                            <FormTextField name="username" label="Username" fullWidth />
                            <FormTextField name="email" label="Email" fullWidth />
                            <FormPasswordField name="password" label="Password" fullWidth />
                            <FormPasswordField name="confirmPassword" label="Confirm Password" fullWidth />
                            <ForgotPasswordButton />
                        </FieldContainer>
                    </FormProvider>
                </CardContent>
                <CardActions>
                    <PrimaryLoadingButton type={"submit"} loading={isSubmitting}>
                        Register
                    </PrimaryLoadingButton>
                </CardActions>
            </Card>
        </Container>
    );
}