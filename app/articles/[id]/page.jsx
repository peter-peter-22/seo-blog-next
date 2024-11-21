import ArticleViewer from "@/app/ui/editor/ArticleViewer";
import prisma from "@/utils/db";

export default async function Page(props) {
    const { id } = await props.params;
    const article = await prisma.article.findUnique({
        where: { id: id },
        include: {
            author: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });
    return (
        <ArticleViewer article={article} />
    );
}
