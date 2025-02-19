"use client";

import { getSuccessUrl } from '@/app/(pages)/auth/authUtilities';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { SingleColumn } from '@/app/ui/layout/Layouts';
import UpdateProfile from "@/app/ui/profile/update/UpdateProfile";
import useProfileEditorForm from '@/app/ui/profile/update/useProfileEditorForm';
import LoadingButton from '@mui/lab/LoadingButton';
import NoSsr from '@mui/material/NoSsr';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';
import { PageLoading } from '@/app/ui/layout/PageLoading';

export default function Page() {
    return <NoSsr fallback={<PageLoading />}><Content /></NoSsr>
}

function Content() {
    const session = useSession();
    const user = session.data.user;
    const { onSubmit, methods } = useProfileEditorForm({ user });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    return (
        <SingleColumn>
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
                        <LoadingButton type={"submit"} loading={isSubmitting}>
                            Update
                        </LoadingButton>
                        <Button href={getSuccessUrl()}>
                            Finish
                        </Button>
                    </CardActions>
                </FormProvider>
            </Card>
        </SingleColumn>
    )
}