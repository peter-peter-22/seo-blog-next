'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavButton from './NavButton';

export function NavItem(name, url, Icon, onClick) {
    this.name = name;
    this.url = url;
    this.Icon = Icon;
    this.onClick = onClick;
}

export default function NavLinks({ navItems }) {
    const pathname = usePathname();
    return (
        <>
            {navItems.map(({ name, url, ...props }, i) => (
                <NavButton
                    key={i}
                    name={name}
                    active={pathname === url}
                    href={url}
                    component={url && Link}
                    {...props}
                />
            ))}
        </>
    )
}

function ToggleLink() {
    return (
        <Link
            href={url}
            style={{
                color: "unset",
                textDecoration: "unset",
            }}
        ></Link>
    )
}