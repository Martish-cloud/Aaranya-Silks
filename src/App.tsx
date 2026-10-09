import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { CategoryStrip } from './components/CategoryStrip';
import { EditorialSection } from './components/EditorialSection';
import { WaveDivider } from './components/WaveDivider';
import { BridalDarkSection } from './components/BridalDarkSection';
import { TrendOfTheDay } from './components/TrendOfTheDay';
import { SeasonForecast } from './components/SeasonForecast';
import { ChangeLookStudio } from './components/ChangeLookStudio';
import { WorthYourAttention } from './components/WorthYourAttention';
import { LatestTrendsLookbook } from './components/LatestTrendsLookbook';
import { NewArrivalsGrid } from './components/NewArrivalsGrid';
import { OutfitGallery } from './components/OutfitGallery';
import { SignatureCollections } from './components/SignatureCollections';
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
import { GlobalWatermark } from './components/GlobalWatermark';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePage, currentProductSlug, toast } = useShop();

  const isHome = activePage === 'home';

  return (
    <div className={`min-h-screen ${isHome ? 'bg-[#1C1A19]' : 'bg-[#FAF7F0]'} text-[#1C1A19] flex flex-col font-sans relative selection:bg-[#651C32] selection:text-[#FAF7F0] overflow-x-clip w-full`}>
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header & Navigation */}
      <Header />

      {/* 3. Main Dynamic Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <motion.div
            key="home-page"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 1. Hero Section - Virtual Boutique Showroom */}
            <HeroSection />

            {/* 2. Pure Zari Certified Running Marquee Ribbon */}
            <MarqueeTicker />

            {/* 3. SIX MOODS - Arched Domes Carousel Strip */}
            <CategoryStrip />

            {/* 4. "Woven to Be Remembered" - 3D Curved Cylindrical Arc Carousel */}
            <EditorialSection />

            {/* 5. Smooth Multi-tier Wave Transition (Cream -> Dark Bridal) */}
            <WaveDivider fromColor="#FAF7F0" toColor="#0D0907" />

            {/* 6. The Bridal Collection - Double Ghost Typography & Scarlet Banner */}
            <BridalDarkSection />

            {/* 7. Wave Transition back to Cream Palette */}
            <WaveDivider fromColor="#0D0907" toColor="#FAF7F0" invert />

            {/* 8. Trend of the day & Seasonal Special - Blouse Size Selectors */}
            <TrendOfTheDay />

            {/* 9. Autumn—Winter 2026 Season Forecast - 3 Arched Frames */}
            <SeasonForecast />

            {/* 10. Interactive "Change Look" Live Model Draping Studio */}
            <ChangeLookStudio />

            {/* 11. "Worth your attention" - Hover-Expanding Vertical Slices Accordion */}
            <WorthYourAttention />

            {/* 12. "LATEST TRENDS" - 3D Block Typography, Lookbook & Video Reels */}
            <LatestTrendsLookbook />

            {/* 13. Curated Masterpiece Saree Collection Grid */}
            <NewArrivalsGrid />

            {/* 14. Complete Handcrafted Outfit Gallery (All 5 Categories: Sarees, Babycon, Blouse, Crop Top, One Shoulder) */}
            <OutfitGallery />

            {/* 15. Signature Handloom Craftsmanship & Heritage Stories */}
            <SignatureCollections />

            {/* 15. Customer Reviews & Social Proof */}
            <ReviewsCarousel />

            {/* 16. Instagram Draping Inspo Gallery */}
            <InstagramGallery />

            {/* 17. VIP Newsletter Invitation */}
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
      <GlobalWatermark />
    </ShopProvider>
  );
}

export default App;
