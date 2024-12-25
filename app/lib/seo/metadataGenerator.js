const image = `/seo-images/default/opengraph-image`;

//create twitter and opengraph metadata based on the base metadata
export default function metadataGenerator({ title, description, ...other }) {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            siteName: 'Textmine',
            type: 'website',
            images: [
                {
                    url: `/seo-images/default/opengraph-image`, // This assumes your image route matches your page route
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image]
        },
        ...other
    }
}