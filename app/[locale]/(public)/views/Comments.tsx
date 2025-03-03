import { CommentItem, SiteConfig } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/ui/components/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/components/card';
import { getTranslations } from 'next-intl/server';
import { Tweet } from 'react-tweet';

export default async function Comments({pageName,siteConfig}:{pageName:string|null|undefined,siteConfig:SiteConfig}) {
  if (!siteConfig.isShowComments) {
    return <></>;
  }
  const prefix = pageName ? pageName + '.' : '';
  const t = await getTranslations(`${prefix}HomeComments`);

  siteConfig.comments.map((it:CommentItem) => {
    if(it.avatar.startsWith('https://api.multiavatar.com')) {
      it.avatar = it.avatar.replace('https://api.multiavatar.com', 'https://api.randomx.ai/avatar');
    }
    return it;
  });
  
  let comments: any = undefined;
  if (siteConfig.isShowTweets) {
    comments = siteConfig.tweets.map((it:string) => {
      let tweetId = it;
      if(it.includes('x.com') || it.includes('twitter.com')) {
        tweetId = it.split('/').pop() || '';
      }
      return <Tweet id={tweetId} key={tweetId} />;
    });
  } else {
    comments = siteConfig.comments.map((it:CommentItem, index:number) => (
      <Card key={index} className="h-full bg-card border-none">
        <CardHeader className="md:p-4 p-2">
          <div className="flex items-center gap-2 md:gap-4">
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src={it.avatar} alt={it.author} />
              <AvatarFallback className="bg-primary font-bold text-sm md:text-base">{it.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base md:text-lg">{it.author}</CardTitle>
              <CardDescription className="text-xs md:text-sm">{it.role}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="md:p-4 p-2">
          <p className="text-muted text-sm md:text-base">{it.content}</p>
        </CardContent>
      </Card>
    ));
  }

  return (
    <section className="container mx-auto md:px-4 py-6 md:py-12">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-12">{t('title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">{comments}</div>
    </section>
  );
}
