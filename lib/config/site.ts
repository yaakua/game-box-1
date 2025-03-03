import { SiteConfig } from '../types';
import siteConfigJSON from './site.json';
import defaultConfigJSON from './default.json';

let config = {...siteConfigJSON} as unknown as SiteConfig;

if (process.env.NODE_ENV === 'development') {
    config = {
        ...siteConfigJSON,
        ...defaultConfigJSON
    } 
}

export const siteConfig: SiteConfig = config;
