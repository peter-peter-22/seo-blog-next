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

    const [article] = await Promise.all([
        prisma.article.findUnique({
            where: { id },
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
        }),
        updateViews(id, session)
    ]);

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

async function updateViews(articleId, session) {
    //add the view entry if does not exists to the right table depending on the authentication
    try {
        if (session?.user) {
            await prisma.verifiedView.create({
                data: {
                    articleId,
                    userId: session.user.id
                }
            })
        }
        else {
            await prisma.unverifiedView.create({
                data: {
                    articleId,
                    ip: getIp()
                }
            })
        }
    }
    catch (err) {
        if (err.code === 'P2002') {
            //unique constraint error, this view entry already exists, do nothing
        }
        else throw err;
    }
} 