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
import LikeMenu from "./LikeMenu";
import RelevantArticles from "./RelevantArticles";

export const dynamic = 'force-static'

export async function generateStaticParams() {
    //pre-render the top X articles during build time
    const topArticleIds = await prisma.article.findMany({
        select: {
            id: true
        },
        orderBy: [{ viewCount: "desc" }],
        take: 100
    });
    if (logCaching)
        console.log(`pre-rendering ${topArticleIds.length} articles`)
    return topArticleIds;
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
                <LikeMenu />
                <Toolbar />
                <ArticleComments />
                <Toolbar/>
                <RelevantArticles article={article}/>
            </ArticleDynamicDataProvider>
        </SingleColumn>
    );
}


export const getArticleStaticData = async (id) => {
    //the cache doesnt works, it still get fetched twice because it's pararrel

    if (logCaching)
        console.log(`fetching article static data ${id}`)
    const result = await prisma.article.findUnique({
        where: { id },
    });

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