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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SearchSyntaxLink from '@/app/ui/components/info pages/SearchSyntaxLink';

export default function AuthorFilters({ defaultValues }) {
    const router = useRouter();

    const methods = useForm({
        resolver: zodResolver(BrowseAuthorsSchema), // Apply the zodResolver
        defaultValues //the default values for sort and sortMode provided by zod
    });
    const { handleSubmit, formState: { isSubmitting }, reset } = methods;

    const handleReset = useCallback(() => { reset(BrowseAuthorsSchema.parse({})) }, [ reset]);

    const onSubmit = async (data) => {
        const searchParams = FormatQuery(data)
        searchParams.delete("page");//reset the pagination when a new search happens
        router.push(`?${searchParams.toString()}`);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: 240 }}>
            <nav>
                <FormProvider {...methods}>
                    <CardContent>
                        <Typography variant="h5">
                            Search
                        </Typography>
                        <Divider />
                    </CardContent>
                    <List>
                        <ListItem>
                            <FormTextField name={"text"} label={"Text"} fullWidth />
                        </ListItem>
                        <ListItem>
                            <Typography variant="body2" color="text.secondary">
                                The search calculates with various factors, like the weight of the title, the follower count and article count.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body2" color="text.secondary">
                                It also supports filtering syntaxes.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <SearchSyntaxLink />
                        </ListItem>
                    </List>
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