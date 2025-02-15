'use client';

import { ReactNode, useState } from 'react';
import { CategorySidebar } from '../sidebar/CategorySidebar';
import { GameCategory } from '@/lib/types';

interface MainLayoutProps {
  children: ReactNode;
  categories: GameCategory[];
}

export function MainLayout({ children, categories }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="shrink-0 transition-[width] duration-200 w-[256px]">
        <CategorySidebar 
          categories={categories} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-5 pb-5 px-10 min-h-[calc(100vh-4rem)] relative shadow-[0_0_15px_rgba(0,0,0,0.05)]">
        {children}
      </div>
    </div>
  );
}
