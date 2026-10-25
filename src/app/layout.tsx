import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Safi Bilgi | Doğru, Sade ve Güvenilir İçerikler',
  description: 'Gereksiz detaylardan arındırılmış, merak ettiğiniz konularda doğrudan saf ve anlaşılır bilgiler sunan dijital bilgi platformu.',
  openGraph: {
    title: 'Safi Bilgi',
    description: 'Doğru, sade ve net bilgiler.',
    url: 'https://safibilgi.com',
    siteName: 'Safi Bilgi',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/20 selection:text-amber-300`}>
        {/* Navigation */}
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                S
              </span>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Safi<span className="text-amber-500">Bilgi</span>
              </span>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/kategoriler" className="hover:text-amber-400 transition-colors">
                Kategoriler
              </Link>
              <Link href="/hakkinda" className="hover:text-amber-400 transition-colors">
                Hakkında
              </Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-900/40 py-10 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="font-bold text-lg text-white">Safi<span className="text-amber-500">Bilgi</span>.com</div>
              <p className="text-sm text-slate-400 mt-1">
                Net, doğru ve anlaşılır bilgi kaynağınız.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Safi Bilgi. Tüm hakları saklıdır.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
