import Link from "next/link";

interface NavItemProps {
    isCurrent: boolean;
    href: string;
    content: string;
}

export const NavItem = ({ isCurrent, href, content }: NavItemProps) => {
    const className = isCurrent
        ? "block py-2 pr-4 pl-3 text-white bg-blue-800 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white cursor-default"
        : "block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer";

    return <li>
        <Link href={href} >
            <span className={className} aria-current={isCurrent ? "page" : undefined} >
                {content}
            </span>
        </Link>
    </li>
}