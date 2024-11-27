import ProfilePage from "./ProfilePage";
import prisma from "@/utils/db"

export default async function ProfileContainer({ userId, isMe }) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            name: true,
            createdAt: true,
            image:true,
            description:true
        }
    });
    return <ProfilePage user={user} isMe={isMe} />
}
