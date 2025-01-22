import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import { logCaching } from "@/app/lib/serverInfo";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import ProfilePage from "@/app/ui/profile/ProfilePage";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import { getUserProfile } from "./getUserProfile";

export const dynamic = 'force-static'

export async function generateStaticParams() {
    //pre-render the top X profiles during build time
    const topUserIds = await prisma.user.findMany({
        select: {
            id: true
        },
        orderBy: [{ articleCount: "desc" }],
        take: 100
    });
    if (logCaching)
        console.log(`pre-rendering ${topUserIds.length} profiles`)
    return topUserIds;
}

export default async function Page({ params }) {
    const { id } = await params;
    if(logCaching)
        console.log(`rebuilding profile ${id}`)
    const user = await getUserProfile({ userId: id })
    if (!user)
        notFound();
    return (
        <SingleColumn>
            <ProfilePage user={user} />
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
        console.log(`fetching metadata for user ${id}`)

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