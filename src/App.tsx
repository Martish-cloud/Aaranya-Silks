import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryStrip } from './components/CategoryStrip';
import { EditorialSection } from './components/EditorialSection';
import { NewArrivalsGrid } from './components/NewArrivalsGrid';
import { SignatureCollections } from './components/SignatureCollections';
import { TrendingShowcase } from './components/TrendingShowcase';
import { BrandStorytelling } from './components/BrandStorytelling';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { InstagramGallery } from './components/InstagramGallery';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { StoryPage } from './components/StoryPage';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePage, currentProductSlug, toast } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A19] flex flex-col font-sans relative selection:bg-[#651C32] selection:text-[#FAF7F0]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header & Navigation */}
      <Header />

      {/* 3. Main Dynamic Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero Section */}
            <HeroSection />

            {/* Shop by Category Strip */}
            <CategoryStrip />

            {/* Editorial Collection Section - Woven to Be Remembered */}
            <EditorialSection />

            {/* New Arrivals Product Grid */}
            <NewArrivalsGrid />

            {/* Signature Collections Showcase */}
            <SignatureCollections />

            {/* Trending Now Fashion Lookbook */}
            <TrendingShowcase />

            {/* Brand Storytelling - The Art of Indian Elegance */}
            <BrandStorytelling />

            {/* Customer Reviews & Social Proof */}
            <ReviewsCarousel />

            {/* Instagram Styling Gallery */}
            <InstagramGallery />

            {/* Newsletter Section */}
            <NewsletterSection />
          </motion.div>
        )}

        {activePage === 'catalog' && (
          <motion.div
            key="catalog-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CatalogPage />
          </motion.div>
        )}

        {activePage === 'product' && currentProductSlug && (
          <motion.div
            key={`product-${currentProductSlug}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProductDetailPage slug={currentProductSlug} />
          </motion.div>
        )}

        {activePage === 'story' && (
          <motion.div
            key="story-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StoryPage />
          </motion.div>
        )}
      </main>

      {/* 4. Luxury Footer */}
      <Footer />

      {/* 5. Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchModal />
      <CheckoutModal />

      {/* 6. Toast Notification Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#651C32] text-[#FAF7F0] shadow-2xl border border-[#C8A96B]/50"
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-[#C8A96B] shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-[#C8A96B] shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-medium tracking-wide">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
