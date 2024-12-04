import Chip from '@mui/material/Chip';
import TagContainer from './TagContainer';

export default function Tags({ tags }) {
    return (
        <TagContainer>
            {tags.map((tag, i) => <Chip key={i} label={tag} size="small" />)}
        </TagContainer>
    )
}