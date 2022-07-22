import { getAllPostsWithFrontMatter } from '@lib/utils'
import Link from 'next/link'

interface BlogPostsProps {
    posts: Awaited<ReturnType<typeof getAllPostsWithFrontMatter>>
}

const BlogPosts = ({ posts }: BlogPostsProps) => {
    return (
        <div className="posts">
            {!posts && <div>No posts!</div>}
            <ul>
                {posts &&
                    posts
                        .sort(
                            (a, b) =>
                                new Date(b.frontMatter.publishedDate).getTime() - new Date(a.frontMatter.publishedDate).getTime(),
                        )
                        .map((post) => {
                            return (
                                <article key={post.slug} className="my-8 md:my-3">
                                    <Link href={{ pathname: `/blog/${post.slug}` }}>
                                        <span className='cursor-pointer font-bold text-sky-700 dark:text-amber-200'>{post.frontMatter.title}</span>
                                    </Link>{' '}
                                    - {post.frontMatter.excerpt}
                                    <p className='text-sm text-sky-700 dark:text-amber-200'>{new Date(post.frontMatter.publishedDate).toDateString()} [ {post.frontMatter.tags.join(', ')} ]</p>
                                </article>
                            )
                        })}
            </ul>
        </div>
    )
}

export default BlogPosts