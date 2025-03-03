import { FAQsItem, PropsWithLocale } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/ui/components/accordion';
import { loadSiteConfig } from '@/lib/utils/resource';
import { getTranslations } from 'next-intl/server';

export async function loadFaqs(locale:string,pageName:string|null|undefined){
  try {
    let faqItems: FAQsItem[] = [];
    if (pageName && pageName!=="") {
      try {
        faqItems = (await import(`@/app/[locale]/(public)/games/${pageName}/config/faqs/${locale}.json`)).default;
        return faqItems;
      } catch {
        try {
          faqItems = (await import(`@/app/[locale]/(public)/games/${pageName}/config/faqs/en.json`)).default;
          return faqItems;
        } catch {
          // 如果找不到特定页面的FAQ配置,回退到默认FAQ
          console.warn(`未找到页面 ${pageName} 的FAQ配置,使用默认FAQ`);
        }
      }
    }else{
      // 加载默认FAQ
      try {
        faqItems = (await import(`@/resources/faqs/${locale}.json`)).default;
      } catch {
        try {
          faqItems = (await import(`@/resources/faqs/${locale.toLowerCase()}.json`)).default;
        } catch {
          faqItems = (await import('@/resources/faqs/en.json')).default;
        }
      }
    }
    return faqItems;
  } catch (e) {
    console.error('加载FAQ时出错:', e);
    return [];
  }

}

export default async function FAQs({ locale,pageName }: PropsWithLocale<{pageName:string|null|undefined}>) {
  const prefix = pageName ? pageName + '.' : '';
  const t = await getTranslations(`${prefix}HomeFAQs`);
  const faqItems = await loadFaqs(locale, pageName);
  if (!Array.isArray(faqItems)) {
    console.error(`Invalid FAQs data for ${locale},pageName:${pageName}: expected an array`);
    return null;
  }
  return (
    <section className="w-full  mx-auto py-12">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-8">{t('title')}</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-none rounded-lg px-1 md:px-4 bg-card">
            <AccordionTrigger className="py-4 font-medium text-faq-title  text-sm md:text-base">{item.question}</AccordionTrigger>
            <AccordionContent className="pb-4">
              <p className="text-faq-text text-sm md:text-base">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
