import { BrowseSchema } from "@/app/ui/forms/schemas/BrowseSchema";
import BrowserLayout from "./BrowserLayout";
import getFilteredArticles from './getFilteredArticles';
import metadataGenerator from "@/app/lib/seo/metadataGenerator";

export default async function Page({ searchParams }) {
    searchParams = BrowseSchema.parse((await searchParams));
    const query = await getFilteredArticles(searchParams);
    return <BrowserLayout {...{ searchParams, query }} />;
}

export async function generateMetadata({ searchParams }) {
    const { text, tag } = await searchParams;
    return metadataGenerator({
        title: text ?? tag ?? "Browsing",
    })
}