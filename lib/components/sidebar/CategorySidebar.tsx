'use client';
import { GameCategory } from '@/lib/types';
import Link from 'next/link';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { IconHome, IconClock, IconStar, IconFlame, IconRefresh, IconDeviceGamepad2,IconCategory, IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


interface CategorySidebarProps {
  categories: GameCategory[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function CategorySidebar({ categories, isExpanded, onToggle }: CategorySidebarProps) {
  const pathname = usePathname();

  return (
    <div 
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-navbar backdrop-blur-xl z-50 transition-[width] duration-300 border-r border-t border-border overflow-visible",
        isExpanded ? "w-[240px]" : "w-[72px]"
      )}
    >
      <ScrollShadow className="h-full overflow-hidden">
        <div className="flex flex-col p-4 space-y-2">
          {/* Toggle Button */}
          <button
            aria-label='Toggle Sidebar'
            onClick={onToggle}
            className="absolute right-[-16px] top-3 bg-navbar text-navbar-muted border border-border rounded-full p-1.5 hover:bg-hover transition-colors z-50"
          >
            <IconChevronLeft 
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                !isExpanded && "rotate-180"
              )} 
            />
          </button>

          {/* Categories */}
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.path}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-navbar-muted transition-all hover:text-navbar-foreground whitespace-nowrap',
                pathname === category.path ? 'bg-hover text-navbar-foreground' : ''
              )}
            >
              <span className="shrink-0">
                {category.icon ? (
                  <img 
                    src={category.icon} 
                    alt={category.name}
                    className="w-6 h-6"
                  />
                ) : (
                  <IconCategory size={24} />
                )}
              </span>
              <span
                className={cn(
                  "transition-all duration-300 font-medium noto-sans-hk-bold overflow-hidden",
                  !isExpanded && "w-0 opacity-0"
                )}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
