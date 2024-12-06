"use client";

import { useSuccessUrl } from '@/app/auth/authUtilities';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import UpdateProfile from "@/app/ui/profile/update/UpdateProfile";
import useProfileEditorForm from '@/app/ui/profile/update/useProfileEditorForm';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';
import { FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';

export default function Page() {
    const session = useSession();
    const user = session.data.user;
    const successUrl = useSuccessUrl();
    const { onSubmit, methods } = useProfileEditorForm({ user });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    return (
        <Card component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <CardContent>
                    <Typography variant="h4">
                        Welcome!
                    </Typography>
                    <Divider />
                    <Typography >
                        Are you okay with this profile?
                    </Typography>
                    <Typography color="text.secondary">
                        The profile can be updated at any time.
                    </Typography>
                    <FieldContainer margin>
                        < UpdateProfile />
                    </FieldContainer>
                </CardContent>
                <CardActions>
                    <Button type={"submit"} disabled={isSubmitting}>
                        Update
                    </Button>
                    <Button href={successUrl}>
                        Finish
                    </Button>
                </CardActions>
            </FormProvider>
        </Card>
    )
}