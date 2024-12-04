//remove empty values
//make arrays work
export default function FormatQuery(params) {
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