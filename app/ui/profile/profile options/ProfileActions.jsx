"use client"

import { useProfileDynamicData } from "@/app/(pages)/authors/[id]/ProfileDynamicDataProvider";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import { ProfileFollowButton } from "./FollowProfileButton";

export function ProfileActions() {
    const { loading, isMe } = useProfileDynamicData();
    return (
        <CardActions>
            {loading ? (
                <Button disabled>
                    Loading
                </Button>
            ) : isMe ? (
                <>
                    <Button href="/profile/edit" startIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button href="/profile/changePassword" startIcon={<PasswordIcon />}>
                        Change password
                    </Button>
                </>
            ) : (
                <ProfileFollowButton />
            )}
        </CardActions>
    )
}