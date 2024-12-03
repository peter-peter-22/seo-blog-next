"use server";

import prisma from "@/utils/db";
import { SearchTextSchema } from "../ui/forms/schemas/BrowseSchema";

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