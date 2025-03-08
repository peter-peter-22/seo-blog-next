import metadataGenerator from '@/app/lib/seo/metadataGenerator';
import AuthorsPage from './AuthorsPage';

export default function Page() {
    return <AuthorsPage />
}

export async function generateMetadata({ searchParams }) {
    const { text } = await searchParams;
    return metadataGenerator({
        title: text ?? "Authors",
    })
}