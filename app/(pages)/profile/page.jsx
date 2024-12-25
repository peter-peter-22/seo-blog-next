import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import ProfileContainer from "@/app/ui/profile/ProfileContainer";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();
    return (
        <SingleColumn>
            <ProfileContainer userId={session.user.id} isMe={true} me={session?.user} />
        </SingleColumn>
    )
}

export const metadata = metadataGenerator({
    title: "Profile"
})