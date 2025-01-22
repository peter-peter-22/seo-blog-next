"use client";

import formatNumber from '@/app/ui/utilities/formatNumber';
import Typography from "@mui/material/Typography";

import { useProfileDynamicData } from '@/app/(pages)/authors/[id]/ProfileDynamicDataProvider';

export function UserStatistics() {
    const { user, loading } = useProfileDynamicData();
    return (
        <>
            <Typography variant="body2" color="text.secondary">
                {loading ? "..." : formatNumber(user.followerCount)} followers
            </Typography>
            <Typography color="text.secondary" variant="body2">
                {loading ? "..." : formatNumber(user.articleCount)} articles
            </Typography>
        </>
    )
}