"use client";

import { updateProfileAction } from '@/app/actions/profileActions';
import { UpdateProfileSchema } from '@/app/ui/forms/schemas/ProfileSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

//all hooks and values to handle the update profile form
export default function useProfileEditorForm({ onSuccess, user }) {
    const session = useSession();
    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
        resolver: zodResolver(UpdateProfileSchema), // Apply the zodResolver
        defaultValues: user
    });

    const onSubmit = async (data) => {
        try {
            const { error, updatedUser } = await updateProfileAction(data);
            if (error) throw new Error(error);
            await session.update(updatedUser);
            enqueueSnackbar("Profile updated", { variant: "success" });
            if (onSuccess)
                onSuccess();
        }
        catch (err) {
            return enqueueSnackbar(err.message, { variant: "error" });
        }
    }

    return { onSubmit, methods };
}