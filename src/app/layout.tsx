import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'sgsconta',
  description: 'Servicii profesionale de contabilitate, consultanță fiscală și salarizare.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="bg-ice text-navy font-sans antialiased selection:bg-royal selection:text-white min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
