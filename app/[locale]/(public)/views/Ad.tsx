'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import {Button} from '@nextui-org/button';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config/site';
import { SiteConfig } from '@/lib/types';
import dynamic from 'next/dynamic';

const AdContent = dynamic(() => Promise.resolve(Ad), {
  ssr: false
});

export default AdContent;

function Ad() {
  const { enablePromotion, selectedMaterial } = siteConfig as SiteConfig;
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(true);
  const [dimensions, setDimensions] = useState(() => 
    calculateDimensions(selectedMaterial?.size || '', selectedMaterial?.ratio || '')
  );
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(calculateDimensions(selectedMaterial?.size || '', selectedMaterial?.ratio || ''));
    };

    const handleScroll = () => {
      if (!adRef.current) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      if (scrollTop + windowHeight >= documentHeight - 100) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedMaterial, calculateDimensions]);

  if(!enablePromotion){
    return null;
  }

  function getYoutubeVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  function isYoutubeUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  function parseSize(size: string): { width: number; height: number } | null {
    if (!size) return null;
    const [width, height] = size.split('x').map(Number);
    return { width, height };
  }

  function parseRatio(ratio: string): { width: number; height: number } | null {
    if (!ratio) return null;
    const [width, height] = ratio.split(':').map(Number);
    return { width, height };
  }

  function calculateDimensions(size: string, ratio: string): { width: number; height: number; scale: number; isMobile: boolean } {
    const sizeObj = parseSize(size);
    const ratioObj = parseRatio(ratio);
    const isMobile = window.innerWidth <= 768;
    const maxWidth = isMobile ? window.innerWidth * 0.5 : Math.min(window.innerWidth * 0.25, 300);
    
    if (!sizeObj && !ratioObj) {
      return { 
        width: maxWidth, 
        height: Math.round(maxWidth * 9/16),
        scale: 1,
        isMobile
      };
    }

    if (sizeObj) {
      const scale = maxWidth / sizeObj.width;
      return {
        width: sizeObj.width,
        height: sizeObj.height,
        scale: scale,
        isMobile
      };
    }

    if (ratioObj) {
      const aspectRatio = ratioObj.height / ratioObj.width;
      return {
        width: maxWidth,
        height: Math.round(maxWidth * aspectRatio),
        scale: 1,
        isMobile
      };
    }

    return { 
      width: maxWidth, 
      height: Math.round(maxWidth * 9/16),
      scale: 1,
      isMobile
    };
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  const renderContent = () => {
    if (!selectedMaterial?.materialUrl) return null;

    if (selectedMaterial.type === 'image') {
      return (
        <a href={selectedMaterial?.clickUrl} target="_blank">
          <img
            src={selectedMaterial.materialUrl}
            alt={selectedMaterial?.title || ''}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: `${dimensions.width} / ${dimensions.height}`
            }}
            className="object-cover rounded-sm"
          />
        </a>
      );
    }

    if (selectedMaterial.type === 'video') {
      if (isYoutubeUrl(selectedMaterial.materialUrl)) {
        const videoId = getYoutubeVideoId(selectedMaterial.materialUrl);
        return (
          <iframe
            style={{
              width: '100%',
              aspectRatio: `${dimensions.width} / ${dimensions.height}`
            }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-sm"
          />
        );
      }

      return (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            aspectRatio: `${dimensions.width} / ${dimensions.height}`
          }}
          className="rounded-sm"
        >
          <source src={selectedMaterial.materialUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={adRef}
          initial={{ opacity: 0, x: dimensions.isMobile ? 0 : 100, y: dimensions.isMobile ? 100 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: dimensions.isMobile ? 0 : 100, y: dimensions.isMobile ? 100 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            isSticky 
              ? dimensions.isMobile 
                ? 'fixed bottom-0 left-0 right-0' 
                : 'fixed bottom-4 right-4'
              : dimensions.isMobile
                ? 'absolute bottom-0 left-0 right-0'
                : 'absolute bottom-4 right-4'
          } z-50`}
          style={{
            width: dimensions.isMobile ? '100%' : `${dimensions.width * dimensions.scale}px`,
            transform: dimensions.isMobile ? 'none' : `scale(${dimensions.scale})`
          }}
        >
          <Card className={`w-full shadow-lg ${dimensions.isMobile ? 'rounded-none' : 'rounded-sm'}`}>
            <CardBody className="relative p-0 overflow-hidden">
              {renderContent()}
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent">
                <div className="flex items-center justify-between px-3 py-2">
                  <a 
                    href={selectedMaterial?.clickUrl} 
                    target="_blank" 
                    className="flex-1 group"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-foreground/90 group-hover:text-primary transition-colors duration-300 font-medium">
                        {selectedMaterial?.title}
                      </span>
                      <svg 
                        className="w-4 h-4 text-foreground/70 group-hover:text-primary transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </a>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="ml-2 text-foreground/70 hover:text-foreground transition-colors duration-300"
                    onClick={handleClose}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}