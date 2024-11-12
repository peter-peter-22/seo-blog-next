import NavLinks, { NavItem } from "@/app/ui/menu/NavLinks"

const navItems = [
    new NavItem("Login", "/"),
    new NavItem("Register", "/browse"),
    new NavItem("Authors", "/authors")
];

export default function UserMenuContents() {
    return (
        <NavLinks navItems={navItems} />
    )
}