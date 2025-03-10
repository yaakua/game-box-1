import { defaultLocale, localePrefix, locales, pathnames,localeDetection } from '@lib/i18n/locales';
import { createNavigation } from 'next-intl/navigation';

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
  localeDetection
});

export function getPathnameWithLocale(pathname: string, locale: string) {
  if (locale === 'en') {
    return pathname;
  }
  if (pathname.startsWith('/')) {
    return `/${locale}${pathname}`;
  }
  return pathname;
}
