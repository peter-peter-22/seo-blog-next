import TagContainer from './TagContainer';
import Chip from '@mui/material/Chip';
import formatNumber from '../../utilities/formatNumber';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function ArticleProps({ article }) {
    return (
        <TagContainer>
            <ArticleProp
                number={article.likeCount}
                icon={<ThumbUpIcon />}
            />
            <ArticleProp
                number={article.dislikeCount}
                icon={<ThumbDownIcon />}
            />
            <ArticleProp
                number={article.viewCount}
                icon={<VisibilityIcon />}
            />
        </TagContainer>
    )
}

function ArticleProp({ icon, number }) {
    return (
        <Chip
            label={formatNumber(number)}
            size="small"
            variant='outlined'
            icon={icon}
        />
    )
}