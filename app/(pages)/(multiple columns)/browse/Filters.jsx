"use client";

import ParamsWithArray from '@/app/lib/ParamsWithArray';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import FormSelect from '@/app/ui/forms/components/FormSelect';
import FormTags from '@/app/ui/forms/components/FormTags';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { BrowseSchema } from '@/app/ui/forms/schemas/BrowseSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FormProvider, useForm, } from 'react-hook-form';

export default function Filters({ defaultValues }) {
    const router = useRouter();

    const methods = useForm({
        resolver: zodResolver(BrowseSchema), // Apply the zodResolver
        defaultValues //the default values for sort and sortMode provided by zod
    });
    const { handleSubmit, formState: { isSubmitting }, reset } = methods;

    const handleReset = useCallback(() => { reset(BrowseSchema.parse({})) }, [defaultValues]);

    const onSubmit = async (data) => {
        const searchParams = ParamsWithArray(data)
        router.push(`?${searchParams.toString()}`);
    }

    return (
        <Card component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: 240 }}>
            <FormProvider {...methods}>
                <CardContent>
                    <Typography variant="h4">
                        Filters
                    </Typography>
                    <Divider />
                    <FieldContainer margin>

                        <FormTextField name={"text"} label={"Text"} fullWidth />

                        <FormSelect name="sort" label="Sorting">
                            <MenuItem value={"createdAt"}>Date of creation</MenuItem>
                            <MenuItem value={"viewCount"}>Views</MenuItem>
                        </FormSelect>

                        <FormSelect name="sortMode" label="Direction">
                            <MenuItem value={"desc"}>Descending</MenuItem>
                            <MenuItem value={"asc"}>Ascending</MenuItem>
                        </FormSelect>

                        <FormTags name="tags" label="Tags" fullWidth />

                    </FieldContainer>
                </CardContent>
                <CardActions>
                    <PrimaryButton type={"submit"} disabled={isSubmitting}>
                        Search
                    </PrimaryButton>
                    <SecondaryButton onClick={handleReset}>
                        Clear
                    </SecondaryButton>
                </CardActions>
            </FormProvider>
        </Card>
    )
}