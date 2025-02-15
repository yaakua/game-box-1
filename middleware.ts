import { defaultLocale, localeDetection, localePrefix, locales, pathnames } from '@/lib/i18n/locales';
import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
const SUPPORTED_LOCALES = locales;
const doIntlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  pathnames,
  localeDetection,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  // 检查是否是带文件扩展名的请求
  if (path.includes('.')) {
    return NextResponse.next();
  }

  // 检查是否是 API 请求
  if (path.startsWith('/api')) {
    return NextResponse.next();
  }
  // 使用国际化中间件处理请求
  return doIntlMiddleware(request);
};

export const config = {
  matcher: [
    // 添加这一行以匹配根路径
    '/',
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
    '/api/:path',
  ],
};
