import { useDarkMode } from '@hooks/useDarkMode'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { NavItem } from './NavItem'
import { DarkModeToggler, MobileMenuToggler } from './Togglers'

const availableRoutes = [
    { path: 'About', href: '/' },
    { path: 'Blog', href: '/blog' },
]

interface Props {
    children: React.ReactNode
}

export const Navbar: React.FC<Props> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
    const { isDarkMode, toggleDarkMode } = useDarkMode(true)
    const router = useRouter()

    return (
        <div className={isDarkMode ? 'dark' : ""}>
            <div className={`bg-zinc-100 text-neutral-700 dark:bg-zinc-900 dark:text-neutral-300 min-h-screen flex flex-col`}>
                <nav className="bg-gray-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-stone-700" >
                    <div className="container flex flex-wrap justify-between items-center mx-auto max-w-5xl">
                        <Link href="/">
                            <span className="flex items-center cursor-pointer">
                                <img src="favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Minjun Blog</span>
                            </span>
                        </Link>
                        <div className='flex justify-end items-center'>
                            <DarkModeToggler toggleDarkMode={toggleDarkMode} />
                            <MobileMenuToggler toggleMenu={toggleMobileMenu} />
                            <div className={"w-full md:w-auto hidden md:block p-2 ml-3"} id="large-menu">
                                <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                                    {availableRoutes.map(route => {
                                        const { path, href } = route
                                        return <NavItem isCurrent={router.pathname === href} href={href} content={path} key={path} />
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={`w-full md:w-auto ${isMobileMenuOpen ? "block md:hidden" : "hidden"}`} id="mobile-menu">
                            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                                {availableRoutes.map(route => {
                                    const { path, href } = route
                                    return <NavItem isCurrent={router.pathname === href} href={href} content={path} key={path} />
                                })}
                            </ul>
                        </div>
                    </div>
                </nav >
                <div className='flex-grow flex flex-col'>
                    {children}
                </div>
            </div>
        </div>
    );
}
