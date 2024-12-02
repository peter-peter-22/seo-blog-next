import ProfileContainer from "@/app/ui/profile/ProfileContainer";
import { auth } from "@/auth";

export default async function Page(props) {
    const { id } = await props.params;
    const session = await auth();
    const isMe = session.user.id == id;
    return <ProfileContainer userId={id} isMe={isMe} />
}