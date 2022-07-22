import { getAllPostsWithFrontMatter } from '@lib/utils'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'

interface SearchPostsProps {
    posts: Awaited<ReturnType<typeof getAllPostsWithFrontMatter>>;
    searchValue: string;
    setSearchValue: (x: string) => void;
}

const SearchPosts = ({ posts, searchValue, setSearchValue }: SearchPostsProps) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => { setSearchValue(e.target.value) }

    return (
        <>
            <input type="text" value={searchValue} placeholder="Search blog posts" onChange={onChange}
                className="bg-transparent border p-2 rounded-md border-gray-600 dark:border-gray-300 w-3/5 focus:w-full lg:focus:w-3/5" />
            {searchValue && <ul>
                {posts
                    .filter((post) => post.frontMatter.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
                    .sort(
                        (a, b) =>
                            new Date(b.frontMatter.publishedDate).getTime() - new Date(a.frontMatter.publishedDate).getTime(),
                    )
                    .map((post) => {
                        return (
                            <article key={post.slug} className="my-5 md:my-3 text-sm">
                                <Link href={{ pathname: `/blog/${post.slug}` }}>
                                    <span className='cursor-pointer font-bold text-sky-700 dark:text-amber-200'>{post.frontMatter.title}</span>
                                </Link>
                            </article>
                        )
                    })}
            </ul>}

        </>
    )
}

export default SearchPosts