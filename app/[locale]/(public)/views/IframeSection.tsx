import { getLocale, getTranslations } from 'next-intl/server';
import { loadSiteConfig } from '@/lib/utils/resource';
import PopupWindows from './PopupWindows';
import Ad from './Ad';
import LazyIframe from './LazyIframe';
import IframeActions from './IframeActions'

function getYoutubeVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export default async function IframeSection({pageName}:{pageName:string|null|undefined}) {
  const locale = await getLocale();
  const prefix = pageName ? pageName + '.' : '';
  const t = await getTranslations(`${prefix}HomeIframe`);
  const t2 = await getTranslations(`${prefix}Loading`);
  const siteConfig = await loadSiteConfig(pageName);
  const isIframe = siteConfig.gameType === 'iframe';
  const isPopup = siteConfig.gameType === 'popup';
  const screenshot_prefix = pageName ? '/games/' + pageName : '';
  const game_screenshot_path = siteConfig.screenshotUrl || `${screenshot_prefix}/game_screenshot.webp`;

  return (
    <section className="text-iframe-foreground flex flex-col items-center justify-center  px-2 mb-4 relative min-h-[calc(43vh)] ">
      {/* 背景容器 - 添加圆角 */}
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
        {/* 背景图片处理 */}
        {siteConfig.bgType === 'image' && siteConfig.bgImage && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${siteConfig.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-iframe-overlay backdrop-blur-sm" />
          </div>
        )}
        
        {/* 视频背景处理 */}
        {siteConfig.bgType === 'video' && siteConfig.bgVideo && (
          <div className="absolute inset-0 w-full h-full">
            {siteConfig.bgVideo.includes('youtube.com') || siteConfig.bgVideo.includes('youtu.be') ? (
              <>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(siteConfig.bgVideo)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${getYoutubeVideoId(siteConfig.bgVideo)}&playsinline=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-iframe-overlay backdrop-blur-sm pointer-events-none" />
              </>
            ) : (
              <>
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={siteConfig.bgVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-iframe-overlay backdrop-blur-sm pointer-events-none" />
              </>
            )}
          </div>
        )}
      </div>

      {/* iframe 容器 - 调整高度和宽度，确保在背景中有均匀的边距 */}
      <div className="relative z-10 w-full h-full rounded-2xl">
        {isIframe && (
          <div className="w-full h-full">
            <LazyIframe 
              gameIframeUrl={siteConfig.gameIframeUrl} 
              title={t('title')}  
              gameImage={game_screenshot_path}
              description={t('description')} 
              playGameButtonText={t('playGame')} 
              loadingTitle={t2('title')}
              pageName={pageName}
            />
          </div>
        )}
        
        {siteConfig.gameType === 'download' && siteConfig.gameDownload?.showDownloadButton && (
          <div className="w-full h-full">
            <LazyIframe 
              gameIframeUrl="#" 
              title={t('title')}
              gameImage={game_screenshot_path}
              description={t('description')}
              playGameButtonText={t('downloadGame')}
              type="download"
              pageName={pageName}
              loadingTitle={t2('title')}
            />
          </div>
        )}
        
        {isPopup && (
          <div className="flex justify-center items-center py-8 w-full h-full">
            <PopupWindows pageName={pageName} siteConfig={{...siteConfig}} />
          </div>
        )}
      </div>
      
      {/* 将IframeActions放在整个section的最下面 */}
      <div className="mt-4 z-20 relative">
          <IframeActions pageName={pageName}/>
        </div>
      <Ad/>
    </section>
  );
}
