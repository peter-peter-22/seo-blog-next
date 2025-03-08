import metadataGenerator from '@/app/lib/seo/metadataGenerator';
import NewUserPage from './NewUserPage';

export default function Page() {
    return <NewUserPage />
}

export const metadata = metadataGenerator({
    title: "Welcome"
})