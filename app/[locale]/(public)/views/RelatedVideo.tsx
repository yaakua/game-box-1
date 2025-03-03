'use client';
import { SiteConfig } from '@/lib/types';
import { Card, CardContent } from '@/lib/ui/components/card';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// 修改动态导入为完整的 ReactPlayer
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

export default  function RelatedVideo({pageName,siteConfig}:{pageName:string|null|undefined,siteConfig:SiteConfig}) {
  const prefix = pageName ? pageName + '.' : '';
  const t =  useTranslations(`${prefix}HomeRelatedVideo`);
  if (!siteConfig.isShowVideo) {
    return null;
  }
  try {
    const videos = siteConfig.videos;
    if (!Array.isArray(videos)) {
      console.error(`Invalid video data for ${pageName}: expected an array`);
      return null;
    }
    return (
      <div className="w-full px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map(({ url, title }: { url: string, title: string }, index: number) => (
            <Card key={index} className="border-none rounded-lg">
              <CardContent className="p-0">
                <div className="aspect-video rounded-lg">
                  <ReactPlayer
                    url={url}
                    width="100%"
                    height="100%"
                    controls={true}
                    light={true}
                    playing={false}  // 改为默认不自动播放
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium line-clamp-2">{title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}
