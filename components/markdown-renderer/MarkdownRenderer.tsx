import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import rehypeSlug from 'rehype-slug'
import styles from './Markdown.module.css'

interface CodeBlockProps {
    inline?: boolean
    className?: string
    children: React.ReactNode
}

const ReplaceCodeSection = ({ inline, className, children, ...props }: CodeBlockProps) => {
    const languageRegex = /language-(\w+)/.exec(className || '')
    const language = languageRegex ? languageRegex[1] : undefined
    if (!inline && language) {
        return (
            <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={atomDark}
                language={language}
                PreTag="div"
                wrapLongLines={true}
                {...props}
            />);
    } else {
        return (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

const MarkdownComponents = {
    code: ReplaceCodeSection
}

export const MarkdownRenderer: React.FC<{ markdown: string; }> = ({ markdown }) => (
    <div className={`markdown-body ${styles.markdown}`}>
        <ReactMarkdown
            components={MarkdownComponents}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeSlug]}
        >
            {markdown}
        </ReactMarkdown>
    </div>
)