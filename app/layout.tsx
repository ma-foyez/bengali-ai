import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const notoBengali = Noto_Sans_Bengali({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-bengali',
  preload: true,
});

export const metadata: Metadata = {
  title: 'বাংলা AI সহকারী - Bengali AI Assistant',
  description: 'An AI assistant that can answer your questions in Bengali',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={`${inter.className} ${notoBengali.variable}`}>{children}</body>
    </html>
  );
}