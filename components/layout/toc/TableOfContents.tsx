// Code based on https://blog.eyas.sh/2022/03/react-toc/
// Code based on https://www.emgoto.com/react-table-of-contents/

import React, { useState } from 'react'
import { HeadingInfo } from './utils'
import { useHeadingData } from './hooks/useHeadingData'
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

interface HeadingsProps {
    rootHeading: HeadingInfo;
    activeId: string;
}

const Headings = ({ rootHeading, activeId }: HeadingsProps) => {
    const renderChildren = () => (
        <ul className='ml-4'>
            {rootHeading.items.map(
                (child) => <Headings rootHeading={child} activeId={activeId} key={child.id} />
            )}
        </ul>)

    return (
        <li
            key={rootHeading.id}
            className={`text-sm ${rootHeading.id === activeId ? "text-teal-500" : "text-neutral-500 dark:text-neutral-400"}`}>
            <a
                href={`#${rootHeading.id}`}
                onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${rootHeading.id}`)?.scrollIntoView({
                        behavior: "smooth"
                    });
                }}
            >
                {rootHeading.text}
            </a>
            {rootHeading.items.length > 0 ? renderChildren() : null}
        </li>
    )
}

export const TableOfContents = () => {
    const [activeId, setActiveId] = useState("");
    const { nestedHeadings } = useHeadingData();
    useIntersectionObserver(setActiveId);

    return (
        <nav aria-label="Table of Contents" className='w-fit'>
            <div className='font-bold text-neutral-500 dark:text-neutral-400'>What&apos;s on this Page</div >
            <ul>
                {nestedHeadings.items.map(h => <Headings rootHeading={h} activeId={activeId} key={h.id} />)}
            </ul>
        </nav >
    )
}
