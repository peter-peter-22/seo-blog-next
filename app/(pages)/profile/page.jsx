import { getUserProfile } from "@/app/(pages)/authors/[id]/getUserProfile";
import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import { PageLoading } from "@/app/ui/layout/PageLoading";
import ProfilePage from "@/app/ui/profile/ProfilePage";
import { auth } from "@/auth";
import NoSsr from "@mui/material/NoSsr";
import { notFound } from "next/navigation";

export default async function Page() {
    const session = await auth();
    const user = await getUserProfile({ userId: session.user.id});
    if (!user)
        notFound();
    return (
        <NoSsr fallback={<PageLoading />}>
            <SingleColumn>
                <ProfilePage user={user} />
            </SingleColumn>
        </NoSsr>
    )
}

export const metadata = metadataGenerator({
    title: "Profile"
})