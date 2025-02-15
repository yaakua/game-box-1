'use client';

import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function IframeButton() {
  const t = useTranslations('Home');
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe instanceof HTMLIFrameElement) {
      setIframeElement(iframe);
    }
  }, []);

  const requestFullscreen = (element: Element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ('mozRequestFullScreen' in element) {
      (element as any).mozRequestFullScreen();
    } else if ('webkitRequestFullscreen' in element) {
      (element as any).webkitRequestFullscreen();
    } else if ('msRequestFullscreen' in element) {
      (element as any).msRequestFullscreen();
    }
  };

  const handleFullscreen = () => {
    if (iframeElement) {
      // 尝试获取内部iframe
      try {
        const innerIframe = iframeElement.contentWindow?.document.querySelector('iframe');
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
    }
  };

  return (
    <div className="mt-4 flex space-x-4">
      <Button
        onClick={handleFullscreen}
        className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:shadow-lg"
      >
        {t('fullscreenButton')}
      </Button>
      <Button
        onClick={() => {
          const url = window.location.href;
          navigator.clipboard.writeText(url).then(() => {
            alert(t('urlCopied'));
          });
        }}
        className="bg-secondary hover:bg-secondary-hover text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:shadow-lg"
      >
        {t('shareButton')}
      </Button>
    </div>
  );
}
