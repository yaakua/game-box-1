import { SVGProps } from 'react';
import type { ClientUploadedFileData } from 'uploadthing/types';

export interface Pageable<T = object> {
  current: number;
  size: number;
  total?: number;
  data?: T;
}

export type IconSvgProps<T = string> = {} & SVGProps<T>;

export interface FAQItem {
  question: string;
  answer: string;
}


export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}



export type PropsWithLocale<T = object> =  T & {locale: string}
export type LocaleParams<T = object> = Promise<T & {locale: string}>

export type PropsWithLocaleIf<T= object> = PropsWithLocale<T & {visible?: boolean}>