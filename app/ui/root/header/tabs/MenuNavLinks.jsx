import NavLinks,{NavItem} from '@/app/ui/menu/NavLinks';

const navItems = [
    new NavItem("Home", "/"),
    new NavItem("Articles", "/browse"),
    new NavItem("Authors", "/authors")
];

export default function MenuNavLinks()  {
    return (
        <NavLinks navItems={navItems}/>
    )
}