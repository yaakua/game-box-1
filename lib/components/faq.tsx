"use client"
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FAQItem } from '../types';

type FAQProps = {
    items: FAQItem[]
    className?: string
}

const FAQ: FC<FAQProps> = ({className, items}) => {
    const t = useTranslations("FAQs")
    return (
        <section className={cn("my-10 px-4 max-w-screen-xl mx-auto", className)}>
            <h2 className="text-3xl font-semibold mb-8 text-center text-faq-title">
                {t("title")}
            </h2>
            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-faq-divider pb-4 bg-faq-content">
                        <h3 className="text-lg font-semibold mb-2 text-faq-title">
                            {`${index < 9 ? '0' : ''}${index + 1}. ${item.question}`}
                        </h3>
                        <p className="text-faq-text">{item.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

FAQ.displayName = "FAQ"
export default FAQ