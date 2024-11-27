"use client";

import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import UpdateProfile from "@/app/ui/profile/update/UpdateProfile";
import useProfileEditorForm from '@/app/ui/profile/update/useProfileEditorForm';
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FormProvider } from 'react-hook-form';

export default function Page() {
    const router = useRouter()
    const onSuccess=useCallback(()=>{router.push("/profile")},[]);
    const { onSubmit, methods } = useProfileEditorForm(onSuccess);
    const { handleSubmit, formState: { isSubmitting } } = methods;

    return (
        <Card component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <CardContent>
                    <Typography variant="h4">
                        Editing profile
                    </Typography>
                    <Divider />
                        <FieldContainer  margin>
                            < UpdateProfile />
                        </FieldContainer>
                </CardContent>
                <CardActions>
                    <PrimaryButton type={"submit"} disabled={isSubmitting}>
                        Update
                    </PrimaryButton>
                    <SecondaryButton href={"/profile"}>
                        Cancel
                    </SecondaryButton>
                </CardActions>
            </FormProvider>
        </Card>
    )
}