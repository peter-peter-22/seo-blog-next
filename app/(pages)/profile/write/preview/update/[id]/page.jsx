import metadataGenerator from "@/app/lib/seo/metadataGenerator"
import PreviewUpdatePage from "./PreviewUpdatePage"

export default function Page() {
    return <PreviewUpdatePage />
}

export const metadata = metadataGenerator({
    title: "Preview"
})