import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';
import { getUserContext } from '../lib/auth';
import LogoutButton from './components/LogoutButton';

export const metadata = {
  title: 'HandyShack Global Enterprises',
  description:
    'HandyShack Global Enterprises – services and technology with local roots and global reach for modern businesses.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { isWholesale } = getUserContext();

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell">
            <div className="branding">
              <span className="branding-mark">HG</span>
              <span className="branding-text">HandyShack Global Enterprises</span>
            </div>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/catalog">Catalog</Link>
              <Link href="/bulk-order">Bulk order</Link>
              {isWholesale && <Link href="/cart">Cart</Link>}
              {!isWholesale && <Link href="/request-account">Request account</Link>}
              {!isWholesale && <Link href="/login">Log in</Link>}
              {isWholesale && <LogoutButton />}
            </nav>
          </div>
        </header>
        <main className="site-main">
          <div className="shell">{children}</div>
        </main>
        <footer className="site-footer">
          <div className="shell">
            <p>
              HandyShack Global Enterprises – services + technology with local roots and global reach for
              wholesale buyers.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

