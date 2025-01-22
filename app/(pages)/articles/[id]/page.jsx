import metadataGenerator from "@/app/lib/seo/metadataGenerator";
import { logCaching } from "@/app/lib/serverInfo";
import { ArticleDynamicSection } from "@/app/ui/editor/ArticleDynamicSection";
import ArticleViewer from "@/app/ui/editor/ArticleViewer";
import { SingleColumn } from "@/app/ui/layout/Layouts";
import prisma from "@/utils/db";
import Toolbar from "@mui/material/Toolbar";
import { notFound } from "next/navigation";
import { ArticleOptions } from "./article options/ArticleOptions";
import ArticleComments from "./ArticleComments";
import { ArticleDynamicDataProvider } from "./ArticleDynamicDataProvider";

//export const articleCache = new LRUCache({
//    max: 1000,
//    ttl: 1000 * 60 * 60, //1 hour
//});

export const dynamic = 'force-static'

export async function generateStaticParams() {
    return [];
}

export default async function Page({ params }) {
    const { id } = await params;
    if (logCaching)
        console.log(`rebuilding article page ${id}`);

    const article = await getArticleStaticData(id);
    if (!article)
        notFound();

    return (
        <SingleColumn>
            <ArticleDynamicDataProvider article={article}>
                <ArticleViewer
                    article={article}
                    DynamicSection={<ArticleDynamicSection />}
                    Options={<ArticleOptions />}
                />
                <Toolbar />
                <ArticleComments />
            </ArticleDynamicDataProvider>
        </SingleColumn>
    );
}


export const getArticleStaticData = async (id) => {
    //if (articleCache.has(id))
    //    return articleCache.get(id)

    if (logCaching)
        console.log(`fetching article static data ${id}`)
    const result = await prisma.article.findUnique({
        where: { id },
    });
    //articleCache.set(id, result);

    return result;
}

export async function generateMetadata({ params }) {
    const { id } = await params;

    const article = await getArticleStaticData(id);

    if (!article)
        return { title: "Not found" }

    const { title, description, tags } = article;

    return metadataGenerator({
        title,
        description,
        keywords: tags,
    })
}