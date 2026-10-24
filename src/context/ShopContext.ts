import { createContext, useContext } from 'react';
import type { Saree, CartItem, User } from '../types';

export interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Saree, selectedColor?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedColor: string, newQty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Saree | null;
  quickViewSelectedColor: string | null;
  openQuickView: (product: Saree, selectedColor?: string) => void;
  closeQuickView: () => void;

  // Authentication & Patron Profile
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  onAuthSuccessAction: (() => void) | null;
  setOnAuthSuccessAction: (cb: (() => void) | null) => void;

  // Delivery Availability Checker
  isDeliveryOpen: boolean;
  setIsDeliveryOpen: (open: boolean) => void;
  deliveryProductContext: { name: string; id: string } | null;
  openDeliveryChecker: (productName?: string, productId?: string) => void;

  // Order Tracking & History
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  selectedTrackingOrderId: string | null;
  setSelectedTrackingOrderId: (id: string | null) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  trackOrder: (orderId: string) => void;
  
  // Navigation / views
  activePage: 'home' | 'catalog' | 'product' | 'story';
  navigateTo: (page: 'home' | 'catalog' | 'product' | 'story', productSlug?: string, categoryFilter?: string, selectedColor?: string) => void;
  goBack: () => void;
  currentProductSlug: string | null;
  selectedVariantColor: string | null;
  currentCategoryFilter: string | null;
  setCurrentCategoryFilter: (cat: string | null) => void;

  // Cart totals
  cartSubtotal: number;
  cartTotalCount: number;
  appliedCoupon: string | null;
  discountAmount: number;
  taxableSubtotal: number;
  gstAmount: number;
  shippingFee: number;
  finalTotal: number;
  applyCouponCode: (code: string) => boolean;
  removeCouponCode: () => void;
  includeGiftBox: boolean;
  setIncludeGiftBox: (include: boolean) => void;

  // Toast
  toast: { message: string; type: 'success' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
}

export interface HistoryStatePayload {
  page: 'home' | 'catalog' | 'product' | 'story';
  productSlug?: string | null;
  categoryFilter?: string | null;
  selectedColor?: string | null;
  scrollY?: number;
  historyIndex: number;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
