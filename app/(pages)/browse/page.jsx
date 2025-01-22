import { BrowseSchema } from "@/app/ui/forms/schemas/BrowseSchema";
import BrowserLayout from "./BrowserLayout";
import getFilteredArticles from './getFilteredArticles';
import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import  NoSsr  from "@mui/material/NoSsr";
import { PageLoading } from "@/app/ui/layout/PageLoading";

export default async function Page({ searchParams }) {
    searchParams = BrowseSchema.parse((await searchParams));
    const query = await getFilteredArticles(searchParams);
    return <NoSsr fallback={<PageLoading />}><BrowserLayout {...{ searchParams, query }} /></NoSsr>;
}

export async function generateMetadata({ searchParams }) {
    const { text, tag } = await searchParams;
    return metadataGenerator({
        title: text ?? tag ?? "Browsing",
    })
}