//create twitter and opengraph metadata based on the base metadata
export default function metadataGenerator({title,description,...other})
{
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            siteName: 'Textmine',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        ...other
    }
}