import { headers } from 'next/headers';
import requestIp from 'request-ip';

export default function getIp() {
    const requestHeaders = headers();
    const allHeaders = Object.fromEntries(requestHeaders.entries());
    const ip = requestIp.getClientIp({
        headers: allHeaders,
    });
    return ip;
}