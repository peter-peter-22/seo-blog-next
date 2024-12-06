import ArticleViewer from "@/app/ui/editor/ArticleViewer";
import prisma from "@/utils/db";
import ArticleEditDialog from "./ArticleEditDialog";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Page(props) {
    const { id } = await props.params;
    const [article, session] = await Promise.all([
        prisma.article.findUnique({
            where: { id: id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        }),
        auth()
    ])

    if (!article)
        notFound();

    const isMine = article.user.id === session.user.id;

    return (
        <>
            {isMine && <ArticleEditDialog article={article}/>}
            <ArticleViewer article={article} />
        </>
    );
}
