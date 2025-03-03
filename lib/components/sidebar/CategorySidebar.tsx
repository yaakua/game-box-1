'use client';
import { GameCategory } from '@/lib/types';
import {Link} from '@/lib/i18n/navigation'
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { IconHome, IconClock, IconStar, IconFlame, IconRefresh, IconDeviceGamepad2,IconCategory, IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


interface CategorySidebarProps {
  categories: GameCategory[];
  isExpanded: boolean;
  onToggle: () => void;
  isMobileExpanded: boolean;
}

export function CategorySidebar({ categories, isExpanded, onToggle, isMobileExpanded }: CategorySidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* 侧边栏 */}
      <div 
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-navbar backdrop-blur-xl z-50 transition-all duration-300 border-r border-t border-border overflow-visible",
          "transform",
          isExpanded || isMobileExpanded ? "w-[240px] translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          !isExpanded && !isMobileExpanded && "md:w-[72px]"
        )}
        onClick={() => {
          // 移动端下点击侧边栏收起
          if (window.innerWidth < 768 && isMobileExpanded) {
            onToggle();
          }
        }}
      >
        <ScrollShadow className="h-full overflow-hidden">
          <div className="flex flex-col p-4 space-y-2">
            {/* Toggle Button */}
            <button
              aria-label='Toggle Sidebar'
              onClick={onToggle}
              className={cn(
                "absolute right-[-16px] top-3 bg-navbar text-navbar-muted border border-border rounded-full p-1.5 hover:bg-hover transition-colors z-50",
                // PC端始终显示
                "hidden md:block",
                // 移动端只在展开时显示
                isMobileExpanded && "block md:block"
              )}
            >
              <IconChevronLeft 
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  !isExpanded && !isMobileExpanded && "rotate-180"
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
                    (!isExpanded && !isMobileExpanded) ? "w-0 opacity-0" : "w-auto opacity-100"
                  )}
                >
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </ScrollShadow>
      </div>

      {/* 移动端展开按钮 - 只在收起时显示 */}
      {!isMobileExpanded && (
        <button
          aria-label='Toggle Mobile Sidebar'
          onClick={onToggle}
          className="md:hidden fixed left-4 bottom-4 z-50 bg-navbar text-navbar-muted border border-border rounded-full p-3 hover:bg-hover transition-all duration-300"
        >
          <IconCategory className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
