'use client';

import { ReactNode } from 'react';
import { CategorySidebar } from '../sidebar/CategorySidebar';
import { GameCategory } from '@/lib/types';

interface AppLayoutProps {
  children: ReactNode;
  categories: GameCategory[];
}

export function AppLayout({ children, categories }: AppLayoutProps) {
  return (
    <div className="relative bg-background min-h-screen">
      {/* Sidebar */}
      <CategorySidebar categories={categories} />

      {/* Main Content */}
      <div className="ml-[72px] p-4 md:p-10">
        {children}
      </div>
    </div>
  );
}
