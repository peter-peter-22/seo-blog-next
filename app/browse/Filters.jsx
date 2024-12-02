"use client";

import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import { UpdateProfileSchema } from '@/app/ui/forms/schemas/ProfileSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm, } from 'react-hook-form';
import FormSelect from '../ui/forms/components/FormSelect';
import FormTextField from '../ui/forms/components/FormTextField';

export default function Filters({ defaultValues }) {
    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
        resolver: zodResolver(UpdateProfileSchema), // Apply the zodResolver
        defaultValues: { ...defaultValues, sortMode: defaultValues?.sortMode ?? "desc" }//give a fallback value to sortMode
    });
    const { handleSubmit,watch, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <Card component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <CardContent>
                    <Typography variant="h4">
                        Filters
                    </Typography>
                    <Divider />
                    <FieldContainer margin>
                        <FormTextField name={"text"} label={"Text"} fullWidth />

                        <FormSelect name="sort" Label="Sorting" hasNone>
                            <MenuItem value={"createdAt"}>Date of creation</MenuItem>
                            <MenuItem value={"viewCount"}>Views</MenuItem>
                        </FormSelect>

                        <FormSelect name="sortMode" Label="Direction" disabled={!watch("sort")}>
                            <MenuItem value={"desc"}>Descending</MenuItem>
                            <MenuItem value={"asc"}>Ascending</MenuItem>
                        </FormSelect>

                    </FieldContainer>
                </CardContent>
                <CardActions>
                    <PrimaryButton type={"submit"} disabled={isSubmitting}>
                        Search
                    </PrimaryButton>
                    <SecondaryButton href={"/profile"}>
                        Clear
                    </SecondaryButton>
                </CardActions>
            </FormProvider>
        </Card>
    )
}