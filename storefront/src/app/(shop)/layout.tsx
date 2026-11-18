import { AnnouncementBar } from '@/components/AnnouncementBar';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Toast } from '@/components/Toast';
import { site } from '@/lib/site';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {site.checkoutMode === 'demo' && !site.dropMode && process.env.NEXT_PUBLIC_HIDE_DEMO_BANNER !== 'true' && (
        <div className="demo-banner">Preview store: checkout is in demo mode and no payment is taken.</div>
      )}
      <AnnouncementBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}
