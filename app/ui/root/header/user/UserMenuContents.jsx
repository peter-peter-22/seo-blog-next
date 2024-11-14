import NavLinks, { NavItem } from "@/app/ui/menu/NavLinks"
import { signOutAction } from "@/app/lib/authActions";

const navItems = [
    new NavItem("Login", "/"),
    new NavItem("Register", "/browse"),
    new NavItem("Authors", "/authors"),
    new NavItem("Logout", "#")
];

export default function UserMenuContents() {
    return (
        <>
            <NavLinks navItems={navItems} />
            <form action={signOutAction}>
                <button type="submit">
                    sign out
                </button>
            </form>
        </>
    )
}