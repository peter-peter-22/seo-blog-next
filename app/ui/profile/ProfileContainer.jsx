import ProfilePage from "./ProfilePage";
import prisma from "@/utils/db"
import { getTagsAction } from "@/app/actions/browseActions";

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
    const tags=await getTagsAction("");
    user.tags=tags;
    return <ProfilePage user={user} isMe={isMe} />
}
