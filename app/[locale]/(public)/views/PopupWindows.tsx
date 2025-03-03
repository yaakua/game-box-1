'use client'
import { SiteConfig } from "@/lib/types";
import { useTranslations } from "next-intl";

export default function PopupWindows({pageName,siteConfig}:{pageName:string|null|undefined,siteConfig:SiteConfig}) {
    const prefix = pageName ? pageName + '.' : '';
    const t = useTranslations(`${prefix}HomeIframe`);
    return  <a 
    href="javascript:void(0)"
    rel="noopener noreferrer"
    onClick={(e) => {
      e.preventDefault();
      const width = 1024;
      const height = 768;
      const left = (screen.width - width) / 2;
      const top = (screen.height - height) / 2;
      const popupWindow = window.open(
        siteConfig.gameIframeUrl,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top}`,
      );
      if (popupWindow) {
        popupWindow.focus();
      }
    }}
    className="bg-warning hover:bg-warning-hover text-background font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
  >
    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4289" width="24" height="32"><path d="M92.59163 7.124244v175.409681l588.077547 329.465052-460.111316 245.981852V402.176952l-127.966231-71.344766v686.04357l838.81674-504.876779z" fill="currentColor" p-id="4290"></path></svg>
    {t('playGame')}
  </a>;
}