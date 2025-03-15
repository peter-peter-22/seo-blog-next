import metadataGenerator from '@/app/lib/seo/metadataGenerator';
import AuthorsPage from './AuthorsPage';
import { Suspense } from 'react';

export default function Page() {
    return <Suspense><AuthorsPage /></Suspense>
}

export async function generateMetadata({ searchParams }) {
    const { text } = await searchParams;
    return metadataGenerator({
        title: text ?? "Authors",
    })
}