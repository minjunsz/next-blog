import React, { useState } from 'react'
import { TableOfContents } from './TableOfContents';

interface Props {
    children: React.ReactNode
}

export const TocLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className='lg:flex lg:flex-row-reverse lg:justify-between'>
            <div className='lg:w-1/3 lg:h-screen lg:sticky lg:top-10'>
                <div className='lg:pl-7 lg:pt-10'>
                    <TableOfContents />
                </div>
            </div>
            <div className='w-full lg:flex-grow px-4 mt-4 rounded-md bg-stone-300 dark:bg-stone-700'>
                {children}
            </div>
        </div >
    );
}
