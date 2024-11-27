"use client";

import { updateProfileAction } from '@/app/actions/profileActions';
import { useSuccessUrl } from '@/app/auth/authUtilities';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { UpdateProfileSchema } from '@/app/ui/forms/schemas/ProfileSchema';
import UpdateProfile from "@/app/ui/profile/update/UpdateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

export default function Page() {
    const session = useSession();
    const user = session.data.user;
    const { enqueueSnackbar } = useSnackbar();
    const successUrl = useSuccessUrl();

    const methods = useForm({
        resolver: zodResolver(UpdateProfileSchema), // Apply the zodResolver
        defaultValues: user
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        try {
            const { error, updatedUser } = await updateProfileAction(data);
            if (error) throw new Error(error);
            await session.update(updatedUser);
        }
        catch(err)
        {
            return enqueueSnackbar(err.message, { variant: "error" });
        }
        return enqueueSnackbar("Profile updated", { variant: "success" });
    }

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
                    <Box sx={{ my: 2 }}>
                        <FieldContainer  >
                            < UpdateProfile />
                        </FieldContainer>
                    </Box>
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