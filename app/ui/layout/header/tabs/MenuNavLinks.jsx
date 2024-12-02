import NavLinks, { NavItem } from '@/app/ui/menu/NavLinks';
import List from '@mui/material/List';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';

const navItems = [
    new NavItem("Home", "/", <HomeIcon />),
    new NavItem("Articles", "/browse", <ArticleIcon />),
    new NavItem("Authors", "/authors", <PersonIcon />)
];

export default function MenuNavLinks() {
    return (
        <List>
            <NavLinks navItems={navItems} />
        </List>
    )
}