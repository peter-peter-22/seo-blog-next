import { BrowseSchema } from "@/app/ui/forms/schemas/BrowseSchema";
import BrowserLayout from "./BrowserLayout";
import getFilteredArticles from './getFilteredArticles';
import metadataGenerator from "@/app/lib/seo/metadataGenerator";

export default async function Page({ searchParams }) {
    searchParams = BrowseSchema.parse(searchParams);
    const query = await getFilteredArticles(searchParams);
    return <BrowserLayout {...{ searchParams, query }} />;
}

export function generateMetadata({ searchParams }) {
    return metadataGenerator({
        title: searchParams.text ?? searchParams.tag ?? "Browsing",
    })
}