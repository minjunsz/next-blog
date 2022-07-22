import BlogPosts from '@components/post-list/BlogPosts'
import { MaxWidth } from '@components/layout/MaxWidth'
import { Navbar } from '@components/layout/navbar'
import { getAllPostsWithFrontMatter } from '@lib/utils'
import type { NextPageWithLayout } from 'pages/_app'
import { ReactElement, useState } from 'react'
import SearchPosts from '@components/post-list/SearchPosts'

interface BlogProps {
    posts: Awaited<ReturnType<typeof getAllPostsWithFrontMatter>>
}

const Blog: NextPageWithLayout<BlogProps> = ({ posts }) => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className='lg:my-6'>
            <SearchPosts posts={posts} searchValue={searchValue} setSearchValue={setSearchValue} />
            {searchValue ? undefined : <BlogPosts posts={posts} />}
        </div>
    )
}

Blog.getLayout = function getLayout(page: ReactElement) {
    return (
        <Navbar>
            <MaxWidth>
                {page}
            </MaxWidth>
        </Navbar>
    )
}

export async function getStaticProps() {
    const posts = await getAllPostsWithFrontMatter('blog')

    return {
        props: {
            posts,
        },
    }
}

export default Blog