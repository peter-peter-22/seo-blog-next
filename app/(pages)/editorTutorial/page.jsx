import { SingleColumn } from "@/app/ui/layout/Layouts";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function Page() {
    return (
        <SingleColumn>
            <Card>
                <CardContent>
                    <Typography variant="h4">
                        How to use editor
                    </Typography>
                    <Divider />
                    <Toolbar />

                    <Typography variant="h6">
                        Hotkeys
                    </Typography >
                    <ul>
                        <li>bold: ctrl+b</li>
                        <li>italic: ctrl+i</li>
                        <li>underline: ctrl+u</li>
                    </ul>

                    <Typography variant="h6">
                        Other shortcuts:
                    </Typography >
                    <ul>
                        <li>
                            All elements of the article are preserved when using the clipboard. The whole article can be copied and pasted.
                        </li>
                        <li>
                            When the url of a video or image is pasted directly into the article, they are converted into a media object. This doesn't works when the url doesn't have the right file extension. In this case, use the image or video dialog to force the url to be interpreted as the chosen media type.
                        </li>
                    </ul>

                    <Typography variant="h6">
                        Custom images
                    </Typography >
                    <Typography>
                        To put your unique images into an article, you must upload them to cloud drive, then use their url.
                    </Typography>

                    <Typography variant="h6">
                        Custom videos
                    </Typography >
                    <Typography>
                        To use your own videos, upload them either to youtube or vimeo. Both their site url and embedding url is accepted.
                    </Typography>

                </CardContent>
            </Card>
        </SingleColumn>
    )
}