import NavLinks, { NavItem } from '@/app/ui/menu/NavLinks';
import List from '@mui/material/List';

const navItems = [
    new NavItem("Home", "/"),
    new NavItem("Articles", "/browse"),
    new NavItem("Authors", "/authors")
];

export default function MenuNavLinks() {
    return (
        <List>
            <NavLinks navItems={navItems} />
        </List>
    )
}