import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import ProfilePage from "./ProfilePage";

export default async function ProfileContainer({ userId, isMe }) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            createdAt: true,
            image: true,
            description: true,
            AuthorTag:true
        }
    });
    if (!user)
        notFound();
    return <ProfilePage user={user} isMe={isMe} />
}
