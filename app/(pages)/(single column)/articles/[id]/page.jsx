import ArticleViewer from "@/app/ui/editor/ArticleViewer";
import prisma from "@/utils/db";
import ArticleEditDialog from "./ArticleEditDialog";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import getIp from "@/app/actions/general/getIp";

export default async function Page(props) {
    const { id } = await props.params;
    const session = await auth();

    //create a prisma selector that will get if the user liked this post depending on the authentication
    const likedByUserQuery = session?.user ? {
        VerifiedLike: {
            where: {
                userId: session.user.id
            }
        }
    } : {
        UnverifiedLike: {
            where: {
                ip: getIp() ?? ""//if cannot get the ip, use an empty string to avoid error
            }
        }
    }

    const article = await prisma.article.findUnique({
        where: { id: id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            ...likedByUserQuery
        }
    });

    if (!article)
        notFound();

    const isMine = article.user.id === session?.user?.id;

    return (
        <>
            {isMine && <ArticleEditDialog article={article} />}
            <ArticleViewer article={article} />
        </>
    );
}
