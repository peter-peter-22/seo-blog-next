import ArticleViewer from "@/app/ui/editor/ArticleViewer";
import prisma from "@/utils/db";

export default async function Page(props) {
    const { id } = await props.params;
    const article = await prisma.article.findUnique({
        where: { id: id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image:true
                }
            }
        }
    });
    return (
        <ArticleViewer article={article} />
    );
}
