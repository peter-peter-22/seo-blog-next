import AuthorsLayout from './AuthorsLayout';
import getFilteredUsers from './getFilteredUsers';
import { BrowseAuthorsSchema } from '@/app/ui/forms/schemas/BrowseAuthorsSchema';
import NoSsr from "@mui/material/NoSsr";
import { PageLoading } from "@/app/ui/layout/PageLoading";

export default async function Page({ searchParams }) {
    searchParams = BrowseAuthorsSchema.parse((await searchParams));
    const query = await getFilteredUsers(searchParams);
    return <NoSsr fallback={<PageLoading />}><AuthorsLayout {...{ searchParams, query }} /></NoSsr>;
}