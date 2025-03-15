import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import BrowserPage from "./BrowserPage";
import { Suspense } from "react";

export default function Page() {
    return <Suspense><BrowserPage /></Suspense>
}

export async function generateMetadata({ searchParams }) {
    const { text, tag } = await searchParams;
    return metadataGenerator({
        title: text ?? tag ?? "Browsing",
    })
}