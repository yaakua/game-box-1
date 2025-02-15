import fs from 'fs';
import matter from 'gray-matter';
import { locales } from '@/lib/i18n/locales';
import path from 'path';

// 定义文章元数据接口
export interface ArticleMetadata {
    title: string;
    image?: string;
    createdAt?: string;
    description?: string;
    content: string;
    slug: string;
}

// 去除Markdown格式的函数
function stripMarkdown(content: string): string {
    return content
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
        .replace(/[*_~`]/g, '') // 移除强调符号
        .replace(/#{1,6}\s/g, '') // 移除标题标记
        .replace(/\n/g, ' ') // 将换行替换为空格
        .replace(/\s+/g, ' ') // 将多个空格替换为单个空格
        .trim(); // 移除首尾空格
}

// 获取所有子目录的文章数据
export const getArticlesData = (): Record<string, ArticleMetadata[]> => {
    const currentDir = path.join('app', '[locale]', '(public)', 't');
    const articlesByLocale: Record<string, ArticleMetadata[]> = {};

    // 初始化每个语言的空数组
    for (const locale of locales) {
        articlesByLocale[locale] = [];
    }

    // 读取当前目录下的所有子目录
    const directories = fs.readdirSync(currentDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    // 遍历每个子目录
    for (const dir of directories) {
        // 遍历所有语言
        for (const locale of locales) {
            const filePath = path.join(currentDir, dir, `${locale}.mdx`);
            const fallbackPath = path.join(currentDir, dir, 'en.mdx');

            // 判断文件是否存在
            if (fs.existsSync(filePath) || fs.existsSync(fallbackPath)) {
                try {
                    // 优先读取当前语言文件，不存在则读取英文文件
                    const mdxContent = fs.existsSync(filePath) 
                        ? fs.readFileSync(filePath, 'utf-8')
                        : fs.readFileSync(fallbackPath, 'utf-8');

                    const { data: frontMatter, content } = matter(mdxContent);
                    
                    // 处理内容，获取前100个字符作为描述
                    const plainContent = stripMarkdown(content);
                    const description = plainContent.slice(0, 300) + (plainContent.length > 300 ? '...' : '');

                    articlesByLocale[locale].push({
                        title: frontMatter.title,
                        image: frontMatter.image,
                        createdAt: frontMatter.createdAt,
                        description: frontMatter.description||description,
                        content: content,
                        slug: dir
                    });
                } catch (error) {
                    console.error(`Error reading directory ${dir} for locale ${locale}:`, error);
                }
            } else {
                console.error(`${filePath} 或 ${fallbackPath} 不存在，跳过该目录`);
            }
        }
    }

    // 对每个语言的文章按创建时间倒序排序
    for (const locale of locales) {
        articlesByLocale[locale].sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        });
    }

    return articlesByLocale;
}


export const getFeaturedContent = (basePath: string,locale:string) => {
   const filePath = path.join(basePath,'config','features',`${locale}.mdx`)
   if (fs.existsSync(filePath)) {
    try {
        const mdxContent = fs.readFileSync(filePath, 'utf-8')
        const { data: frontMatter, content } = matter(mdxContent)
        return {
            frontMatter,
            content
        }
    } catch (error) {
        console.error(`Error reading directory ${filePath}:`, error);
    }
   }
   return {frontMatter:null,content:null}
}