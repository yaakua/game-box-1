import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config/site'
// 添加静态生成配置
export const dynamic = 'force-static'
// 可选：添加重验证时间（如果需要的话）
export const revalidate = false
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/private/'],
			},
		],
		sitemap: `${siteConfig.domain}/sitemap.xml`,
	}
}