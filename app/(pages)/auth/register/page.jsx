import metadataGenerator from "@/app/lib/seo/metadataGenerator"
import RegisterPage from "./RegisterPage"

export default function Page() {
    return <RegisterPage />
}

export const metadata = metadataGenerator({
    title: "Sign-up"
})