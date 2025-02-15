'use client';
import { GameCategory } from '@/lib/types';
import Link from 'next/link';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { IconHome, IconClock, IconStar, IconFlame, IconRefresh, IconDeviceGamepad2,IconCategory } from '@tabler/icons-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


interface CategorySidebarProps {
  categories: GameCategory[];
}

export function CategorySidebar({ categories }: CategorySidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  return (
    <div 
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-navbar backdrop-blur-xl z-50 w-[72px] group hover:w-[256px] transition-[width] duration-200 border-r border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ScrollShadow className="h-full">
        <div className="flex flex-col p-4 space-y-2">
          {/* Default Menus */}
          {/* {defaultMenus.map((menu) => (
            <Link
              key={menu.id}
              href={`/${menu.id}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-hover text-navbar-muted hover:text-navbar-foreground active:scale-[0.98] whitespace-nowrap group/item"
            >
              <span className="shrink-0 transition-transform duration-200 group-hover/item:scale-110">
                {menu.icon}
              </span>
              <span
                className="transition-all duration-200 opacity-0 group-hover:opacity-100 font-medium"
              >
                {menu.name}
              </span>
            </Link>
          ))} */}

          {/* Divider */}
          {/* <div className="h-px bg-border my-2" /> */}

          {/* Categories */}
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.path}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-navbar-muted transition-all hover:text-navbar-foreground',
                pathname === category.path ? 'bg-hover text-navbar-foreground' : ''
              )}
            >
              <span className="shrink-0 transition-transform duration-200 group-hover/item:scale-110">
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
                className="transition-all duration-200 opacity-0 group-hover:opacity-100 font-medium noto-sans-hk-bold"
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
