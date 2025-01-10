import { ArticleRowCSR } from "@/app/ui/components/articles/ArticleRowCSR";
import ArticleRowSkeleton from "@/app/ui/components/articles/ArticleRowSkeleton";
import prisma from "@/utils/db";
import { unstable_cacheLife } from "next/cache";
import { Suspense } from "react";

export default function RelevantArticles({ article }) {
    const title = "Relevant articles";
    return (
        <Suspense fallback={<ArticleRowSkeleton title={title} />}>
            <RelevantArticlesInner article={article} title={title} />
        </Suspense>
    )
}

async function RelevantArticlesInner({ article, title }) {
    "use cache"
    unstable_cacheLife("minutes")

    console.log(`rendering and fetching relevant articles ${article.id}`)

    const articles = await prisma.$queryRaw`
        SELECT             
            id,
            title,
            description,
            "createdAt",
            tags,
            "likeCount",
            "dislikeCount",
            "viewCount",
            "commentCount",
	        (
	        	SELECT ROW_TO_JSON(my_user) 
	        	FROM
	        	(
	        		SELECT 
	        			"User".id,
	        			"User".name,
	        			"User".image
	        		FROM 
	        			"User" 
	        		WHERE "User".id="Article"."userId"
	        	) 
	        	AS my_user
	        ) AS "user",
	        cardinality(array(SELECT UNNEST(tags) INTERSECT SELECT UNNEST(${article.tags}::text[]))) AS match_count
        FROM "Article"
        	WHERE tags && ${article.tags}::text[]
            AND id != ${article.id}
        ORDER BY match_count DESC, "viewCount" DESC
        LIMIT 6`

    return <ArticleRowCSR title={title} articles={articles} />
}