import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import SignInPage from "./SignInPage";

export default function Page() {
    return <SignInPage />
}

export const metadata = metadataGenerator({
    title: "Authentication"
})