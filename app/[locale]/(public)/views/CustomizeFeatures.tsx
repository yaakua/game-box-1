import React from 'react';
import MdxArticle from '@/lib/components/mdx-article';
const components: any = {
  img: ({ src, alt }: { src: string, alt: string }) => {
    return <img src={src} alt={alt} className="object-cover" />
  }
}
export default async function CustomizeFeatures({ content }: { content: string|null }) {
  if(!content){
    return null;
   }
    return <>
      <MdxArticle components={components} source={content} className="prose-green-dark" />
    </>
}
