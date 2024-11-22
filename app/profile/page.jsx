import ProfileContainer from "@/app/ui/profile/ProfileContainer";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();
    return <ProfileContainer userId={session.user.id} isMe={true}/>
}