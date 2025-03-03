'use client';

import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';
import { useEffect, useState, RefObject } from 'react';

export default function IframeButton({
  pageName
}: {
  pageName: string | null | undefined;
}) {
  const prefix = pageName ? pageName + '.' : '';
  const t = useTranslations(`${prefix}HomeIframe`);

  const requestFullscreen = (element: Element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => {
        console.error(`全屏请求错误: ${err.message}`);
      });
    } else if ('mozRequestFullScreen' in element) {
      (element as any).mozRequestFullScreen().catch((err: any) => {
        console.error(`全屏请求错误: ${err.message}`);
      });
    } else if ('webkitRequestFullscreen' in element) {
      (element as any).webkitRequestFullscreen().catch((err: any) => {
        console.error(`全屏请求错误: ${err.message}`);
      });
    } else if ('msRequestFullscreen' in element) {
      (element as any).msRequestFullscreen().catch((err: any) => {
        console.error(`全屏请求错误: ${err.message}`);
      });
    }
  };

  const handleFullscreen = () => {
    const iframeElement = document.querySelector('#iframe-container');
    if (iframeElement) {
      // 尝试获取内部iframe
      try {
        const innerIframe = (iframeElement as HTMLIFrameElement).contentWindow?.document.querySelector('iframe');
        if (innerIframe instanceof HTMLIFrameElement) {
          requestFullscreen(innerIframe);
        } else {
          requestFullscreen(iframeElement);
        }
      } catch (error) {
        // 如果无法访问内部iframe（可能由于跨域限制），则对外部iframe请求全屏
        console.error('无法访问内部iframe:', error);
        requestFullscreen(iframeElement);
      }
    } else {
      console.error('找不到iframe元素');
      // 尝试对整个容器请求全屏
      const container = document.querySelector('.iframe-container') || document.documentElement;
      if (container) {
        requestFullscreen(container);
      }
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <Button
        onClick={handleFullscreen}
        className="bg-secondary hover:bg-feature-card-hover text-secondary-foreground font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
        </svg>
        {t('fullscreenButton')}
      </Button>
      <Button
        onClick={() => {
          const url = window.location.href;
          navigator.clipboard.writeText(url).then(() => {
            alert(t('urlCopied'));
          });
        }}
        className="bg-download-button hover:bg-download-button-hover text-download-button-foreground font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {t('shareButton')}
      </Button>
    </div>
  );
}
