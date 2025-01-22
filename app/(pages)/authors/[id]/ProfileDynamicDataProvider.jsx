"use client"

import { getUserProfileDynamicData } from "@/app/actions/authorDynamicDataActions";
import { notFound } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const ProfileDynamicDataContext = createContext({ loading: true });

export function useProfileDynamicData() {
    return useContext(ProfileDynamicDataContext);
}

export function ProfileDynamicDataProvider({ user, children }) {
    const [data, setData] = useState({ loading: true });

    useEffect(() => {
        getUserProfileDynamicData({ userId: user.id }).then(({ error, user:dynamicUser, isMe }) => {
            if (error) {
                console.error(error);
                if (error === "not found")
                    notFound();
                return setData({ error, loading: true });
            }
            setData({ user: { ...user, ...dynamicUser }, isMe, loading: false });
        });
    }, [user])

    return (
        <ProfileDynamicDataContext.Provider value={data}>
            {children}
        </ProfileDynamicDataContext.Provider>
    )
}