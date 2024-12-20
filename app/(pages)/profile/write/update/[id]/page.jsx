"use client";

import EditorPage from "../../EditorPage";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    return <EditorPage updating={id} />
}

export const metadata = {
    title: "Update"
}