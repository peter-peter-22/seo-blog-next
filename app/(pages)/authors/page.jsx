import AuthorsLayout from './AuthorsLayout';
import getFilteredUsers from './getFilteredUsers';
import { BrowseAuthorsSchema } from '@/app/ui/forms/schemas/BrowseAuthorsSchema';

export default async function Page({ searchParams }) {
    searchParams = BrowseAuthorsSchema.parse((await searchParams));
    const query = await getFilteredUsers(searchParams);
    return <AuthorsLayout {...{ searchParams, query }} />;
}