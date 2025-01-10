import { SingleColumn } from '@/app/ui/layout/Layouts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import metadataGenerator from "@/app/lib/seo/metadataGenerator";

export default function Page() {
    return (
        <SingleColumn>
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        Search syntax
                    </Typography>
                    <Divider />
                </CardContent>
                <List>
                    <Item
                        primary={<>Phrase Search (Quoted Text)</>}
                        secondary={<>
                            <Block>Example: <em>"full text search"</em></Block>
                            Words enclosed in double quotes (") are treated as a single phrase, and the order of words is preserved.
                        </>}
                    />
                    <Divider variant="inset" component="li" />
                    <Item
                        primary={<>Logical Operators</>}
                        secondary={<>
                            Use logical operators to combine terms.
                            <Block>Supported Operators:</Block>
                            <ul className="list-disc list-inside">
                                <li>AND: (default): Matches documents containing all specified terms.</li>
                                <li>OR: Matches documents containing any of the specified terms.</li>
                                <li>NOT: Excludes documents containing the specified term.</li>
                            </ul>
                            <Block>Examples:</Block>
                            <em>
                                <ul className="list-disc list-inside">
                                    <li>cat AND dog</li>
                                    <li>cat OR dog</li>
                                    <li>cat NOT dog</li>
                                </ul>
                            </em>
                        </>}
                    />
                    <Divider variant="inset" component="li" />
                    <Item
                        primary={<>Grouping with Parentheses</>}
                        secondary={<>
                            Parentheses can group expressions to control precedence.
                            <Block>Example: <em>(cat OR dog) AND bird</em></Block>
                        </>}
                    />
                    <Divider variant="inset" component="li" />
                    <Item
                        primary={<>Excluding Words</>}
                        secondary={<>
                            A minus sign (-) before a word acts like NOT, excluding results containing that word.
                            <Block>Example: <em>dog -cat</em></Block>
                        </>}
                    />
                    <Divider variant="inset" component="li" />
                    <Item
                        primary={<>Wildcard Search (Partial Words)</>}
                        secondary={<>
                            Words ending with an asterisk (*) act as a prefix search.
                            <Block>Example: <em>ca*</em></Block>
                        </>}
                    />
                    <Divider variant="inset" component="li" />
                    <Item
                        primary={<>Stop Words and Language Support</>}
                        secondary={<>
                            Stop words (e.g., "the", "is") are automatically excluded based on the language dictionary provided (e.g., english).
                            <br />
                            The function respects stemming and synonyms defined by the specified language.
                            <Block>
                                Example: <em>running</em> translates to <em>run</em>
                            </Block>
                        </>}
                    />
                </List>
            </Card>
        </SingleColumn>
    )
}

function Block({ children, ...props }) {
    return (
        <Typography component="span" sx={{ display: "block" }} {...props}>
            {children}
        </Typography>
    )
}

function Item({ primary, secondary }) {
    return (
        <ListItem alignItems='flex-start'>
            <ListItemAvatar >
                <Avatar sx={{ bgcolor: "primary.light" }}>
                    <ArrowForwardIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                disableTypography
                primary={primary}
                secondary={
                    <Typography color="textSecondary" component="div">
                        {secondary}
                    </Typography>
                }
            />
        </ListItem>
    )
}

export const metadata = metadataGenerator({
    title: "Search Tutorial"
})