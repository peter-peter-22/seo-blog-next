"use client"

import { useProfileDynamicData } from "@/app/(pages)/authors/[id]/ProfileDynamicDataProvider";
import useFollow from '@/app/ui/profile/reactions/useFollow';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Button from "@mui/material/Button";

export function ProfileFollowButton() {
    const { user } = useProfileDynamicData();
    const { isFollowing, toggleFollow } = useFollow({ user });
    return (
        <Button onClick={toggleFollow} startIcon={isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}