export default function formatDate(date)
{
    //ignores locale timezone
    return date.toISOString().split('T')[0];
}