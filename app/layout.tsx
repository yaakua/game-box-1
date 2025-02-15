import './globals.css';

import type { ReactNode } from 'react';

// is required, even if it's just passing children through.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
