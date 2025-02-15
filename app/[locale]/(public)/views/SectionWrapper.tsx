import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export default async function SectionWrapper({ className, children }: Props) {
  return (
    <div
      className={cn(
        'bg-section-background text-foreground p-4 md:p-8 w-full mx-auto rounded-lg border border-section-border [box-shadow:var(--shadow-section)] backdrop-blur-[2px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
