import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import PreviewPage from "./PreviewPage";
export default function Page() {
    return (
        <PreviewPage />
    );
}

export const metadata = metadataGenerator({
    title: "Preview"
})