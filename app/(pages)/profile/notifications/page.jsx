import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import NotificationsPageHandler from "./NotificationsPageHandler";

export default async function Page() {
    return <NotificationsPageHandler />
}

export const metadata = metadataGenerator({
    title: "Notifications"
})