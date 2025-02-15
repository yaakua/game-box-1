'use client'

import { GameCategory } from "@/lib/types";
import { Button } from "@nextui-org/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from "react";
import GameCard from "./GameCard";

type GameCategorySectionProps = {
  category: GameCategory;
};

export const GameCategorySection = ({ category }: GameCategorySectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const isHorizontal = category.displayStyle === 'horizontal';

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!category.games?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl noto-sans-hk-bold text-foreground">{category.name}</h2>
      </div>

      <div className="relative group/nav hover:group-[]/nav">
        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {category.games.map((game, index) => (
              <div 
                key={index} 
                className={`flex-none group ${isHorizontal ? 'w-[238px]' : 'w-[248px]'}`}
              >
                <GameCard game={game} isHorizontal={isHorizontal} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start pl-2 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity z-10"
            aria-label="Previous"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary/40 backdrop-blur-sm hover:from-primary/90 hover:to-primary/60 transition-all">
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </div>
          </button>
        )}
        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end pr-2 bg-gradient-to-l from-primary/50 to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity z-10"
            aria-label="Next"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary/40 backdrop-blur-sm hover:from-primary/90 hover:to-primary/60 transition-all">
              <ChevronRight className="h-6 w-6 text-foreground" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
