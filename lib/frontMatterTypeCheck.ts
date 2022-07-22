import { z } from "zod";

export const PostFrontMatter = z.object({
    title: z.string(),
    excerpt: z.string(),
    tags: z.string().array(),
    publishedDate: z.date().transform(d => d.toString())
})