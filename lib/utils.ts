import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { z } from "zod";
import { PostFrontMatter } from './frontMatterTypeCheck'

const root = process.cwd()

export async function getFiles(category: string) {
    return fs.readdirSync(path.join(root, 'data', category), 'utf-8')
}

export async function getPostBySlug(category: string, slug: string) {
    const source = fs.readFileSync(path.join(root, 'data', category, `${slug}.md`), 'utf8')

    const { data, content } = matter(source)
    const frontMatter = PostFrontMatter.parse(data)

    return {
        frontMatter,
        markdownBody: content,
    }
}

export async function getAllPostsWithFrontMatter(category: string) {
    const files = fs.readdirSync(path.join(root, 'data', category))

    return files.map((file) => {
        const source = fs.readFileSync(path.join(root, 'data', category, file), 'utf8')
        const { data } = matter(source)
        const frontMatter = PostFrontMatter.parse(data)

        return {
            frontMatter,
            slug: file.replace('.md', '')
        }
    })
}