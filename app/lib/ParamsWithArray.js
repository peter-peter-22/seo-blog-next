export default function ParamsWithArray(params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
        } else if (value) {
            searchParams.append(key, value);
        }
    });
    return searchParams;
}