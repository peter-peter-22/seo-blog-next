import { ImageResponse } from 'next/og';
import { roboto } from '@/app/layout';
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getEnvBool } from '@/utils/envBool';

export const alt = 'Page preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    if (getEnvBool("DEBUG_SEO_IMAGES"))
        console.log("opengraph image generated");

    const logoData = await readFile(join(process.cwd(), 'public/icon-light.png'))
    const logoSrc = Uint8Array.from(logoData).buffer

    return new ImageResponse(
        (
            <div style={{
                display: 'flex',
                color: 'black',
                background: 'white',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: roboto.style.fontFamily,
                fontWeight: '400',
                backgroundImage: `linear-gradient(#ffffff,rgb(174, 211, 233))`,
                fontSize: 100,
            }}>
                <img
                    src={logoSrc}
                    style={{
                        width: 150,
                        height: 150
                    }}
                    alt="logo"
                />
                <p>
                    Textmine
                </p>
            </div >
        ),
        {
            ...size,
        }
    );
}
