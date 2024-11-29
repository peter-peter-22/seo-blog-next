function VideoUrlFormatter(isCorrect, formatter) {
    this.isCorrect = isCorrect;
    this.formatter = formatter;
}

//const isYoutubeEmbed = (url) => {
//  return url.includes("youtube.com/embed");
//}

//const isVimeoEmbed = (url) => {
//
//  return url.includes("player.vimeo.com/video");
//}

//const formatYoutubeEmbed = url => {
//  let videoId = url.match(/(?<=\/embed\/)[^&]+/g);
//  return `https://www.youtube.com/embed/${videoId}`;
//}

//const formatVimeoEmbed = url => {
//  let videoId = url.match(/(?<=\/embed\/)[^&]+/g);
//  return `https://player.vimeo.com/video/${videoId}`;
//}  

export const videoUrlFormatters = [
    new VideoUrlFormatter(
        //youtube
        //embed
        //<iframe width="1903" height="801" src="https://www.youtube.com/embed/Hjhv6DmNEVc" title="Prism RS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        //page
        //https://www.youtube.com/watch?v=Hjhv6DmNEVc
        url => {
            return url.includes("youtube.com/watch");
        },
        url => {
            let videoId = url.match(/(?<=\/watch\?v=)[^&]+/g);
            return `https://www.youtube.com/embed/${videoId}`;
        }
    ),
    new VideoUrlFormatter(
        //vimeo
        //embed
        //<iframe title="vimeo-player" src="https://player.vimeo.com/video/892719539?h=9453d0187f" width="640" height="360" frameborder="0"    allowfullscreen></iframe>
        //page
        //https://vimeo.com/512095147
        url => {
            return url.includes("https://vimeo.com/");
        },
        url => {
            let videoId = url.match(/(?<=\/vimeo.com\/)[^&]+/g);
            return `https://player.vimeo.com/video/${videoId}`;
        }
    )
];