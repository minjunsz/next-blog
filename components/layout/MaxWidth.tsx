import Image from 'next/image';
import React from 'react'


interface Props {
    children: React.ReactNode
}

export const MaxWidth: React.FC<Props> = ({ children }) => {
    return (
        <div className='flex-grow flex justify-center'>
            <div className='max-w-5xl w-full bg-zinc-200 dark:bg-zinc-800 p-4 md:px-14'>
                <div className='block px-2 lg:flex'>
                    <Image src='/profile.jpg' width={140} height={140} className='rounded-full' />
                    <div className='flex flex-col justify-center py-4 lg:py-0 lg:px-6'>
                        <div className='text-2xl font-bold'>Hello, I'm Minjun</div>
                        <div>I try to post what I've studied about machine learning. I generally write about Generative Models, Graph Learning, ML Engineering.</div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
