import metadataGenerator from "@/app/lib/seo/metadataGenerator"
import LoginPage from "./LoginPage"

export default function Page() {
    return <LoginPage />
}

export const metadata = metadataGenerator({
    title: "Sign-in"
})