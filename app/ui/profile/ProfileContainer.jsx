import ProfilePage from "./ProfilePage";
import prisma from "@/utils/db"

export default async function ProfileContainer({ userId, isMe }) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            username: true,
            created: true
        }
    });
    return <ProfilePage user={user} isMe={isMe}/>
}
