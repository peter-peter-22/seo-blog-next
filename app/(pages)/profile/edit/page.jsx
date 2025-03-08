import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import ProfileEditorPageHandler from "./ProfileEditorPageHandler";

export default function Page() {
    return (
        <SingleColumn>
            <ProfileEditorPageHandler />
        </SingleColumn>
    )
}

export const metadata = metadataGenerator({
    title: "Edit profile"
})