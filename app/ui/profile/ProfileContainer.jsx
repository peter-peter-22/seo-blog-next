import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import ProfilePage from "./ProfilePage";
import NoSsr from "@mui/material/NoSsr";
import { PageLoading } from "../layout/PageLoading";

export default async function ProfileContainer({ userId, isMe, me }) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            createdAt: true,
            image: true,
            description: true,
            followerCount: true,
            AuthorTag: {
                orderBy: [
                    { count: "desc" }
                ]
            },
            ...me && {
                Followers: {
                    where: {
                        followerId: me.id
                    }
                }
            },
            articleCount: true
        }
    });

    if (!user)
        notFound();

    return <NoSsr fallback={<PageLoading />}><ProfilePage {...{ user, isMe }} /></NoSsr>
}