import type { ReactElement } from "react";
import type { NextPageWithLayout } from "pages/_app";

import { getFiles, getPostBySlug } from "@lib/utils"
import { MarkdownRenderer } from "@components/markdown-renderer/MarkdownRenderer";
import { Navbar } from "@components/layout/navbar";
import { MaxWidth } from "@components/layout/MaxWidth";
import { TocLayout } from "@components/layout/toc";
import Link from "next/link";

interface BlogPostProps {
    postData: Awaited<ReturnType<typeof getPostBySlug>>
}

const BlogPost: NextPageWithLayout<BlogPostProps> = ({ postData }) => {
    if (!postData.frontMatter) return <></>

    return (
        <MarkdownRenderer markdown={postData.markdownBody} />
    )
}

BlogPost.getLayout = function getLayout(page: ReactElement) {
    return (
        <Navbar>
            <MaxWidth>
                <TocLayout>
                    {page}
                </TocLayout>
            </MaxWidth>
        </Navbar>
    )
}

export async function getStaticPaths() {
    const posts = await getFiles('blog')

    const paths = posts.map((filename: string) => ({
        params: {
            slug: filename.replace(/\.md/, ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

interface StaticPathParams {
    params: {
        slug: string
    }
}

export async function getStaticProps({ params }: StaticPathParams) {
    const postData = await getPostBySlug('blog', params.slug)

    return {
        props: {
            postData,
        },
    }
}

export default BlogPost