"use client";

import PreviewPage from "../../PreviewPage";
import { useParams } from "next/navigation";

export default function PreviewUpdatePage() {
    const { id } = useParams();
    return (
        <PreviewPage updating={id} />
    );
}
