import { headers } from 'next/headers';
import requestIp from 'request-ip';

export default async function getIp() {
    const requestHeaders = await headers();
    const allHeaders = Object.fromEntries(requestHeaders.entries());
    const ip = requestIp.getClientIp({
        headers: allHeaders,
    });
    return ip;
}