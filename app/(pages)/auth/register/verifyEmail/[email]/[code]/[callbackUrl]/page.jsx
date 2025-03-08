import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import VerifyPageHandler from "./VerifyPageHandler";

export default function Page() {
    return <VerifyPageHandler />
}

export const metadata = metadataGenerator({
    title: "Verify email"
})