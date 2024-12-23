"use client";

import FormatQuery from '@/app/lib/FormatQuery';
import SearchSyntaxLink from '@/app/ui/components/info pages/SearchSyntaxLink';
import { PrimaryButton, SecondaryButton } from '@/app/ui/forms/components/FormButtons';
import FormTextField from '@/app/ui/forms/components/FormTextField';
import { BrowseSchema } from '@/app/ui/forms/schemas/BrowseSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Box from '@mui/material/Box';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
        const searchParams = new URLSearchParams({ text: data.text });
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
                    <List >
                        <ListItem>
                            <FormTextField name={"text"} label={"Text"} fullWidth />
                        </ListItem>
                        <ListItem>
                            <Typography variant="body2" color="text.secondary">
                                The search calculates with various factors, like the weight of the title, the like count and view count.
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