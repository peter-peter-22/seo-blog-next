import ProfilePage from "./ProfilePage";
import prisma from "@/utils/db"
import { getTagsAction } from "@/app/actions/browseActions";
import { notFound } from "next/navigation";

export default async function ProfileContainer({ userId, isMe }) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            name: true,
            createdAt: true,
            image: true,
            description: true
        }
    });
    if (!user)
        notFound();
    const tags = await getTagsAction("");
    user.tags = tags;
    return <ProfilePage user={user} isMe={isMe} />
}
