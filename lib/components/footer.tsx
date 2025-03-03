'use client';
import { siteConfig } from '@/lib/config/site';
import { localeNames } from '@/lib/i18n/locales';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { Link as NextLink } from '@nextui-org/link';
import { useLocale, useTranslations } from 'next-intl';
import { NavbarItem } from '../types';
import SocialIcons from './social-icons';
import { useSidebar } from '@/lib/context/SidebarContext';

export default function Footer({ items }: { items: NavbarItem[] }) {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();
  const { isExpanded,isGameBox } = useSidebar();
  // 从pathname中移除当前locale前缀
  const cleanPathname = pathname.replace(new RegExp(`^/${locale}`), '');
  const buildLocaleLinks = (key: string, name: string) => {
    if (key === 'en') {
      return (
        <NextLink className="text-footer-foreground/80 hover:text-footer-foreground transition-colors" href={cleanPathname}>
          {name}
        </NextLink>
      );
    }
    return (
      <Link className="text-footer-foreground/80 hover:text-footer-foreground transition-colors" href={cleanPathname} locale={key}>
        {name}
      </Link>
    );
  };

  return (
    <footer className={`bg-footer border-t border-border ${isExpanded ? 'ml-[240px]' : isGameBox ? 'ml-0 md:ml-[72px]' : 'ml-0'}`}>
      <div className="w-full max-w-[1480px] mx-auto py-12 px-4">
        {/* 主要内容区域 - 三列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 第一列 - Liars Bar */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl noto-sans-hk-bold text-footer-foreground">{t('title')}</h2>
            <p className="text-footer-foreground">{t(siteConfig.slogan as any)}</p>
            {/* 社交媒体图标 */}
            <div className="flex gap-4 mt-2">
              <SocialIcons
                className="gap-8"
                twitter={{
                  share: {
                    url: siteConfig.domain,
                    text: `${t('title')} - ${t(siteConfig.slogan as any)}`,
                  },
                }}
                youtube={{
                  share: {
                    url: t('title'),
                  },
                }}
                facebook={{
                  share: {
                    url: siteConfig.domain,
                  },
                }}
              />
            </div>
          </div>

          {/* 第二列 - 帮助链接 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2 text-footer-foreground">{t('Common.help')}</h2>
            <div className="flex flex-col gap-2">
              {items
                .flatMap((it: any) => it?.children ?? [it])
                .slice(-10)  // 只取最后10条记录
                .map((it, index) => (
                  <Link
                    key={`${it.title}-${index}`}
                    href={it.href}
                    locale={locale === 'en' ? undefined : locale}
                    className="text-footer-foreground/80 hover:text-footer-foreground transition-colors"
                  >
                    {it.title}
                  </Link>
                ))}
            </div>
          </div>

          {/* 第三列 - 语言选择 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2 text-footer-foreground">Languages</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(localeNames).map(([key, name]) => (
                <div key={key}>
                  {locale === key ? (
                    <span className="text-footer-foreground cursor-default">{name}</span>
                  ) : (
                    buildLocaleLinks(key, name)
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="pt-8 border-t border-footer-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <p className="text-footer-foreground/80">{new Date().getFullYear()} {siteConfig.name} All rights reserved.</p>
              <div className="text-footer-foreground/80">
                Powered By <Link href="https://fafafa.ai" className="text-footer-foreground/80 hover:text-footer-foreground transition-colors">FaFaFa.ai</Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {siteConfig.friendLinks.map((link: any) => (
                <Link key={link.title} href={link.url} className="text-footer-foreground/80 hover:text-footer-foreground transition-colors">
                  {link.title}
                </Link>
              ))}
            </div>
            <ul className="flex flex-wrap items-center gap-6">
              <li>
                <Link href="/privacy-policy" className="text-footer-foreground/80 hover:text-footer-foreground transition-colors">
                  {t('Common.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-services" className="text-footer-foreground/80 hover:text-footer-foreground transition-colors">
                  {t('Common.termsOfServices')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
