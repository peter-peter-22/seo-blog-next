"use client";

import getProfileLink from '@/app/ui/components/users/getProfileLink';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryLoadingButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import UpdateProfile from "@/app/ui/profile/update/UpdateProfile";
import useProfileEditorForm from '@/app/ui/profile/update/useProfileEditorForm';
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FormProvider } from 'react-hook-form';

export default function ProfileEditorPage({ user }) {
    const router = useRouter()
    const session = useSession();
    const profileUrl = getProfileLink(session?.data?.user)
    const onSuccess = useCallback(() => { router.push(profileUrl) }, [router,profileUrl]);
    const { onSubmit, methods } = useProfileEditorForm({ onSuccess, user });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    return (
        <Card component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <CardContent>
                    <Typography variant="h4">
                        Editing profile
                    </Typography>
                    <Divider />
                    <FieldContainer margin>
                        < UpdateProfile />
                    </FieldContainer>
                </CardContent>
                <CardActions>
                    <PrimaryLoadingButton type={"submit"} loading={isSubmitting}>
                        Update
                    </PrimaryLoadingButton>
                    <SecondaryButton href={profileUrl}>
                        Cancel
                    </SecondaryButton>
                </CardActions>
            </FormProvider>
        </Card>
    )
}