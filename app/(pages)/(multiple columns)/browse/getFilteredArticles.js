import prisma from "@/utils/db";

export default async function getFilteredArticles(searchParams) {
    const itemsPerPage = 12;

    //getting the inputs
    const { text, author, tags, page, sort, sortMode } = searchParams;

    //limit max offset
    const offset = itemsPerPage * (page - 1);
    if (offset > 1000)
        throw new Error("Searching this deep in not permitted");

    //get the rows depending on the provided filters
    const { articles, count } = text ?
        await filtered({ text, offset, itemsPerPage })
        :
        await simpleFilter({ offset, itemsPerPage, tags, author, sort, sortMode });

    //calculate page count
    const pages = Math.ceil(count / itemsPerPage);

    return { page, pages, articles, count };
}

//get and sort the articles in a simple way what is not controlled by the user
async function simpleFilter({ tags, author, sort, sortMode, offset, itemsPerPage }) {
    //create the filter that will be used in the article selector and counter
    const where = {
        AND: [
            {
                //author filter
                ...author && {
                    userId: author
                }
            },
            {
                //tag filter
                ...tags && tags.length > 0 && {
                    tags: {
                        hasEvery: tags,
                    }
                }
            }
        ]
    }

    //fetch
    const [articles, count] = await Promise.all([
        //articles
        prisma.article.findMany({
            where,
            include:
            {
                user: {
                    select: {
                        name: true,
                        image: true,
                        id: true,
                        description: true
                    }
                }
            },
            orderBy: [
                { [sort]: sortMode },
                { id: "desc" }
            ],
            skip: offset,
            take: itemsPerPage
        }),

        //count
        prisma.article.count({
            where
        }),
    ]);
    return { count, articles };
}

//filter the articles based on a user defined text
async function filtered({ text, offset, itemsPerPage }) {
    const [articles, [{ count }]] = await Promise.all([
        //articles
        prisma.$queryRaw`
        SELECT 
	        title,
	        description,
	        content,
	        "likeCount",
	        "dislikeCount",
	        "viewCount",
            "createdAt",
            "tags",
            "userId",
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
 	            ts_rank(search, websearch_to_tsquery('english', ${text}))
                + log("likeCount"+1)*0.01
	            + log("dislikeCount"+1)*-0.01
	            + log("viewCount"+1)*0.005
	            as rank
        FROM "Article"
        WHERE search @@ websearch_to_tsquery('english',${text})
        ORDER BY rank DESC, "createdAt" DESC, id DESC
        OFFSET ${offset}
        LIMIT ${itemsPerPage}`,

        //count
        prisma.$queryRaw`
        SELECT COUNT(*)::INT FROM "Article"
        WHERE search @@ websearch_to_tsquery('english',${text})`
    ])
    return { articles, count };
}