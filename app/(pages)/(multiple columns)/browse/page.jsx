import { BrowseSchema } from "@/app/ui/forms/schemas/BrowseSchema";
import BrowserLayout from "./BrowserLayout";
import getFilteredArticles from './getFilteredArticles';

export default async function Page({ searchParams }) {
    searchParams = BrowseSchema.parse(searchParams);
    const query = await getFilteredArticles(searchParams);
    return <BrowserLayout {...{ searchParams, query }} />;
}