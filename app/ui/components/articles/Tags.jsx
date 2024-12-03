import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Tags({tags}) {
    return (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag, i) => <Chip key={i} label={tag} size="small" />)}
        </Stack>
    )
}