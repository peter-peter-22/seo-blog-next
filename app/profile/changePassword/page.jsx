"use client";

import { changePasswordAction } from "@/app/actions/profileActions";
import FieldContainer from "@/app/ui/forms/components/FieldContainer";
import { PrimaryButton, SecondaryButton } from "@/app/ui/forms/components/FormButtons";
import FormPasswordField from "@/app/ui/forms/components/FormPasswordField";
import { ChangePasswordSchema } from "@/app/ui/forms/schemas/ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from 'react-hook-form';

export default function Page() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const methods = useForm({
        resolver: zodResolver(ChangePasswordSchema), // Apply the zodResolver
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        try {
            const error = await changePasswordAction(data);
            if (error) throw new Error(error);
            enqueueSnackbar("Password changed", { variant: "success" });
            router.push("/profile");
        }
        catch (err) {
            return enqueueSnackbar(err.message, { variant: "error" });
        }
    }

    return (
        <Container maxWidth="sm" sx={{ mx: "auto", p: 0 }}>
            <Card component="form" onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <FormProvider {...methods}>
                        <Typography variant="h5">
                            Change password
                        </Typography>
                        <Divider />
                        <FieldContainer margin>
                            <FormPasswordField name="password" label="New password" fullWidth />
                            <FormPasswordField name="confirmPassword" label="Confirm new password" fullWidth />
                        </FieldContainer>
                    </FormProvider>
                </CardContent>
                <CardActions>
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                        Change
                    </PrimaryButton>
                    <SecondaryButton href="/profile">
                        Cancel
                    </SecondaryButton>
                </CardActions>
            </Card>
        </Container >
    )
}