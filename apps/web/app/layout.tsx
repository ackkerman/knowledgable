import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Knowledge Graph Tool'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
