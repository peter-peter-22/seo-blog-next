const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
});

export default function formatNumber(number)
{
    return formatter.format(number);
}