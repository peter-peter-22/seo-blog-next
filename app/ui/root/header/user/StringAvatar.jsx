import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
    //convert the first 2 
    let totalNum = 0;
    for (let n = 0; n < 2; n++) {
        const toNum = string.charCodeAt(n);
        if (!isNaN(toNum))
            totalNum += toNum;
    }

    let numString = totalNum.toString();
    //get the last 2 digits of the number
    if (numString.length > 2)
        numString = numString.substring(numString.length - 2, numString.length);

    //get the hue from the string
    const hue = parseInt(parseInt(numString) / 100 * 360);

    //get the color
    const color = `hsl(${hue}, 100%, 20%)`

    return color;
}

function getMonogram(name) {
    const split = name.split(' ');
    let monogram;
    if (split.length > 1)
        monogram = split[0][0] + split[1][0];
    else
        monogram = name.substring(0, 2);
    return monogram.toUpperCase();
}

function StringAvatar({ name = "-",sx,...props}) {
    const monogram = getMonogram(name)
    return (
        <Avatar sx={{ bgcolor: stringToColor(name),...sx }} alt={{ name }} {...props}>
            {monogram}
        </Avatar>
    );
}

export default StringAvatar;