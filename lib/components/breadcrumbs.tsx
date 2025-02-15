'use client';
import { getPathnameWithLocale } from '@/lib/i18n/navigation';
import { BreadcrumbItem, Breadcrumbs, BreadcrumbsProps } from '@nextui-org/breadcrumbs';
import { LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { omit } from "radash";

type RouteBreadcrumbsProps = { locale: string } & Omit<BreadcrumbsProps, "children">

export function ChineseNamesBreadcrumbs(props: RouteBreadcrumbsProps & { name: string }) {
    const t = useTranslations("ChineseNamesGenerator")
    const {name, locale} = props
    return <Breadcrumbs underline="hover" classNames={{
        list: "gap-2",
        // item: ["text-foreground/60", "data-[current=true]:text-foreground"],
        separator: "text-foreground/40"
    }} {...omit(props, ["locale", "name"])}>
        <BreadcrumbItem href={"/"}>
            <LayoutGrid className="size-4"/>
        </BreadcrumbItem>
        <BreadcrumbItem href={getPathnameWithLocale("/tools/chinese-names-generator", locale)}>
            {t("title")}
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
            {name}
        </BreadcrumbItem>
    </Breadcrumbs>
}

export function ExploreBreadcrumbs(props: RouteBreadcrumbsProps) {
    const t = useTranslations("ChineseNamesGenerator")
    const {locale} = props
    return <Breadcrumbs underline="hover" classNames={{
        list: "gap-2",
        // item: ["text-foreground/60", "data-[current=true]:text-foreground"],
        separator: "text-foreground/40"
    }} {...omit(props, ["locale"])}>
        <BreadcrumbItem href={"/"}>
            <LayoutGrid className="size-4"/>
        </BreadcrumbItem>
        <BreadcrumbItem href={getPathnameWithLocale("/tools/chinese-names-generator", locale)}>
            {t("title")}
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
            {t("explore.title")}
        </BreadcrumbItem>
    </Breadcrumbs>
}

export function ExploreItemBreadcrumbs(props: RouteBreadcrumbsProps & { slug: string, value: string }) {
    const {slug, value, locale} = props
    const t = useTranslations("ChineseNamesGenerator")
    return <Breadcrumbs underline="hover" classNames={{
        list: "gap-2",
        // item: ["text-foreground/60", "data-[current=true]:text-foreground"],
        separator: "text-foreground/40"
    }} {...omit(props, ["locale", "slug", "value"])}>
        <BreadcrumbItem href={"/"}>
            <LayoutGrid className="size-4"/>
        </BreadcrumbItem>
        <BreadcrumbItem href={getPathnameWithLocale("/tools/chinese-names-generator", locale)}>
            {t("title")}
        </BreadcrumbItem>
        <BreadcrumbItem href={getPathnameWithLocale("/tools/chinese-names-generator/explore", locale)}>
            {t("explore.title")}
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
            {t(`explore.${slug}-nav`)} - {value}
        </BreadcrumbItem>
    </Breadcrumbs>
}

export function ContentBreadcrumbs(props: RouteBreadcrumbsProps) {
    const t = useTranslations("ChineseNamesGenerator")
    return <Breadcrumbs underline="hover" classNames={{
        list: "gap-2",
        // item: ["text-foreground/60", "data-[current=true]:text-foreground"],
        separator: "text-foreground/40"
    }} {...omit(props, ["locale"])}>
        <BreadcrumbItem href={"/"}>
            <LayoutGrid className="size-4"/>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
            {t(`information.title`)}
        </BreadcrumbItem>
    </Breadcrumbs>
}

export function ContentArticleBreadcrumbs(props: RouteBreadcrumbsProps & { title: string }) {
    const {locale, title} = props
    const t = useTranslations("ChineseNamesGenerator")
    return <Breadcrumbs underline="hover" classNames={{
        list: "gap-2",
        // item: ["text-foreground/60", "data-[current=true]:text-foreground"],
        separator: "text-foreground/40"
    }} {...omit(props, ["locale"])}>
        <BreadcrumbItem href={"/"}>
            <LayoutGrid className="size-4"/>
        </BreadcrumbItem>
        <BreadcrumbItem href={getPathnameWithLocale(`/tools/chinese-names-generator/information`, locale)}>
            {t(`information.title`)}
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
            {title}
        </BreadcrumbItem>
    </Breadcrumbs>
}

export function ChineseNamesContentIndexBreadcrumbs(props: RouteBreadcrumbsProps) {
    const t = useTranslations("ChineseNamesGenerator")
    const {locale} = props
    return <Breadcrumbs underline="hover" classNames={{
        list: "gap-2",
        // item: ["text-foreground/60", "data-[current=true]:text-foreground"],
        separator: "text-foreground/40"
    }} {...omit(props, ["locale"])}>
        <BreadcrumbItem href={"/"}>
            <LayoutGrid className="size-4"/>
        </BreadcrumbItem>
        <BreadcrumbItem href={getPathnameWithLocale("/tools/chinese-names-generator", locale)}>
            {t("title")}
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
            {t("content.index.title")}
        </BreadcrumbItem>
    </Breadcrumbs>
}

export function ChineseNamesContentQuestionBreadcrumbs(props: RouteBreadcrumbsProps) {
    const t = useTranslations("ChineseNamesGenerator")
    const {locale} = props
    return <Breadcrumbs underline="hover" classNames={{
        list: "gap-2",
        // item: ["text-foreground/60", "data-[current=true]:text-foreground"],
        separator: "text-foreground/40"
    }} {...omit(props, ["locale"])}>
        <BreadcrumbItem href={"/"}>
            <LayoutGrid className="size-4"/>
        </BreadcrumbItem>
        <BreadcrumbItem href={getPathnameWithLocale("/tools/chinese-names-generator", locale)}>
            {t("title")}
        </BreadcrumbItem>
        <BreadcrumbItem href={getPathnameWithLocale("/tools/chinese-names-generator/content/index", locale)}>
            {t("content.index.title")}
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
            {t("content.list.title")}
        </BreadcrumbItem>
    </Breadcrumbs>
}
