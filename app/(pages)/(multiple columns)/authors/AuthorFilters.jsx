"use client";

import FormatQuery from '@/app/lib/FormatQuery';
import FieldContainer from '@/app/ui/forms/components/FieldContainer';
import { PrimaryButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import FormSelect from '@/app/ui/forms/components/FormSelect';
import FormTagsOnline from '@/app/ui/forms/components/FormTagsOnline';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { BrowseSchema } from '@/app/ui/forms/schemas/BrowseSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Box from '@mui/material/Box';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FormProvider, useForm, } from 'react-hook-form';
import { BrowseAuthorsSchema } from '@/app/ui/forms/schemas/BrowseAuthorsSchema';

export default function AuthorFilters({ defaultValues }) {
    const router = useRouter();

    const methods = useForm({
        resolver: zodResolver(BrowseAuthorsSchema), // Apply the zodResolver
        defaultValues //the default values for sort and sortMode provided by zod
    });
    const { handleSubmit, formState: { isSubmitting }, reset } = methods;

    const handleReset = useCallback(() => { reset(BrowseAuthorsSchema.parse({})) }, [defaultValues]);

    const onSubmit = async (data) => {
        const searchParams = FormatQuery(data)
        searchParams.delete("page");//reset the pagination when a new search happens
        router.push(`?${searchParams.toString()}`);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <nav>
                <FormProvider {...methods}>
                    <CardContent>
                        <Typography variant="h5">
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
            </nav>
        </Box>
    )
}