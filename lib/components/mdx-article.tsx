import { cn } from '@/lib/utils/commons';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from "next/link";
import React from "react";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";

function Table({data}: { data: any }) {
    const headers = data.headers.map((header: any, index: number) => (
        <th key={index} className="text-table-header bg-table-header-bg border-table-border">{header}</th>
    ))
    const rows = data.rows.map((row: any, index: number) => (
        <tr key={index} className="hover:bg-table-row-hover">
            {row.map((cell: any, cellIndex: number) => (
                <td key={cellIndex} className="text-table-cell border-table-border">{cell}</td>
            ))}
        </tr>
    ))

    return (
        <table className="border-collapse border border-table-border bg-table-bg">
            <thead className="bg-table-header-bg">
            <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

function CustomLink(props: any) {
    const href = props.href

    if (href.startsWith("/")) {
        return (
            <Link href={href} {...props} className="text-link hover:text-link-hover">
                {props.children}
            </Link>
        )
    }

    if (href.startsWith("#")) {
        return <a {...props} className="text-link hover:text-link-hover" />
    }

    return <a rel="noopener noreferrer" {...props} className="text-link hover:text-link-hover" />
}

function RoundedImage(props: any) {
    return <img alt={props.alt} className="rounded-lg border border-image-border" {...props} />
}

function Code({children, ...props}: { children: any }) {
    const codeHTML = highlight(children)
    return <code className="bg-code-bg text-code font-mono p-1 rounded" dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
}

function slugify(str: string) {
    if (!str) return ""
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/<br>/g, "<br/>")
}

function createHeading(level: number) {
    const Heading = ({children}: { children: any }) => {
        const slug = slugify(children)
        return React.createElement(
            `h${level}`,
            {
                id: slug,
                className: "text-heading"
            },
            [
                React.createElement("a", {
                    href: `#${slug}`,
                    key: `link-${slug}`,
                    className: "anchor text-heading-link hover:text-heading-link-hover",
                }),
            ],
            children,
        )
    }

    Heading.displayName = `Heading${level}`

    return Heading
}

const overrideComponents: any = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    code: Code,
}


type MdxArticleProps = {
    source: string
    className?: string
    components?: any
}


export default function MdxArticle({source, className, components = {}}: MdxArticleProps) {
    try {
        return <article
            className={cn(
                "prose prose-sm md:prose-base lg:prose-lg w-full max-w-full prose-mdx",
                "prose-headings:text-heading",
                "prose-p:text-content",
                "prose-strong:text-strong",
                "prose-em:text-emphasis",
                "prose-blockquote:text-quote prose-blockquote:border-l-quote-border prose-blockquote:bg-quote-bg",
                "prose-ul:text-content",
                "prose-ol:text-content",
                "prose-li:text-content",
                className,
            )}
        >
            <MDXRemote
                source={source}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                }}
                components={{...overrideComponents, ...components}}
            />
        </article>
    } catch (error) {
        console.error("MDX 解析错误:", error)
        return <div className="text-error">Content loading failed. Please try again later.</div>
    }

}
