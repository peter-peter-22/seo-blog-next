import List from '@mui/material/List';

import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NavButton from '@/app/ui/menu/NavButton';

export default function MenuNavLinks() {
    return (
        <List>
            <NavButton
                name="Home"
                url="/"
                Icon={<HomeIcon />}
            />
            <NavButton
                name="Articles"
                url="/browse"
                Icon={<ArticleIcon />}
            />

            <NavButton
                name="Authors"
                url="/authors"
                Icon={<PersonIcon />}
            />

        </List>
    )
}