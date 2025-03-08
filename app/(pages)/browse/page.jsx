import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import BrowserPage from "./BrowserPage";

export default function Page() {
    return <BrowserPage/>
}

export async function generateMetadata({ searchParams }) {
    const { text, tag } = await searchParams;
    return metadataGenerator({
        title: text ?? tag ?? "Browsing",
    })
}