"use server";

import prisma from "@/utils/db";
import { SearchTextSchema } from "@/app/ui/forms/schemas/fields/searchText";

export async function getTagsAction(text) {
    text = SearchTextSchema.parse(text);
    return (await prisma.topic.findMany({
        where: {
            name: { startsWith: text }
        },
        orderBy: {
            count: "desc"
        },
        take: 10
    }))
}