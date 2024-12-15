import ProfileEditorPage from "./ProfileEditorPage";
import prisma from "@/utils/db";
import { auth } from "@/auth";
import { SingleColumn } from "@/app/ui/layout/Layouts";

export default async function Page() {
    const session = await auth();
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            image: true,
            description: true
        }
    });
    return (
        <SingleColumn>
            <ProfileEditorPage user={user} />
        </SingleColumn>
    )
}