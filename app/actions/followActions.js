"use server";

import prisma from "@/utils/db";
import { auth } from "@/auth";
import { FollowSchema } from "../ui/forms/schemas/FollowSchema";
import authOrThrow from "../auth/authOrThrow";

export async function followAction(data) {
    const session = await authOrThrow();
    const { userId, setFollowing } = FollowSchema.parse(data);

}