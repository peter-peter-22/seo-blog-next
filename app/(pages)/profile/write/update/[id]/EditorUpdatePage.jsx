"use client";

import EditorPage from "../../EditorPage";
import { useParams } from "next/navigation";

export default function EditorUpdatePage() {
    const { id } = useParams();
    return <EditorPage updating={id} />
}