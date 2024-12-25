import metadataGenerator from "@/app/lib/seo/metadataGenerator"
import EditorUpdatePage from "./EditorUpdatePage"

export default function Page() {
    return <EditorUpdatePage />
}

export const metadata = metadataGenerator({
    title: "Update"
})