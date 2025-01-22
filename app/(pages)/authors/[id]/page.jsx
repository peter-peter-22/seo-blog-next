import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import { logCaching } from "@/app/lib/serverInfo";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import ProfileContainer from "@/app/ui/profile/ProfileContainer";
import { auth } from "@/auth";
import prisma from "@/utils/db";

export default async function Page({ params }) {
    const { id } = await params;
    const session = await auth();
    const isMe = session?.user?.id === id;
    return (
        <SingleColumn>
            <ProfileContainer userId={id} isMe={isMe} me={session?.user} />
        </SingleColumn>
    )
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const user = await getUser(id);
    if (!user)
        return { title: "Not found" }

    const { name, description } = user;

    return metadataGenerator({
        title: name,
        description,
    })
}

async function getUser(id) {
    if (logCaching)
        console.log("fetching metadata user")

    return await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            description: true,
        }
    })
}