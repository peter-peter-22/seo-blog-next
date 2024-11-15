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
                <Link
                    href={url}
                    style={{
                        color: "unset",
                        textDecoration: "unset",
                    }}
                    key={i}
                >
                    <NavButton
                        name={name}
                        active={pathname === url}
                        {...props}
                    />
                </Link>
            ))}
        </>
    )
}