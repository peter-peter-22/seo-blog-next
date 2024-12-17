import { GET as seedUsers } from "@/app/api/dev/seed/users/[count]/route";
import { GET as seedArticles } from "@/app/api/dev/seed/articles/[count]/route";
import { GET as seedComments } from "@/app/api/dev/seed/comments/[count]/route";
import { GET as seedLikes } from "@/app/api/dev/seed/likes/[count]/route";
import { GET as seedViews } from "@/app/api/dev/seed/views/[count]/route";

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return;

    const { count } = params;

    await seedUsers(_, { params: { count: 100 * count } });
    await seedArticles(_, { params: { count: 10 * count } });
    await seedComments(_, { params: { count: 3 * count } });
    await seedLikes(_, { params: { count: 5 } });
    await seedViews(_, { params: { count: 7 } });
    return new Response("placeholder contents added");
}