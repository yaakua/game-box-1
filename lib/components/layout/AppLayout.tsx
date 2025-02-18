'use client';

import { ReactNode, useState } from 'react';
import { CategorySidebar } from '../sidebar/CategorySidebar';
import { GameCategory } from '@/lib/types';
import { useSidebar } from '@/lib/context/SidebarContext';
interface AppLayoutProps {
  children: ReactNode;
  categories: GameCategory[];
}

export function AppLayout({ children, categories }: AppLayoutProps) {
  const { isExpanded, setIsExpanded } = useSidebar();
  return (
    <div className="relative bg-background min-h-screen">
      {/* Sidebar */}
      <CategorySidebar 
        categories={categories} 
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />

        {/* Main Content */}
        <div className={`transition-all duration-300 ${isExpanded ? 'ml-[240px]' : 'ml-[72px]'}`}>
        <main className="p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
