import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Saree, CartItem } from '../types';
import { SAREES_DATA } from '../data/sarees';
import confetti from 'canvas-confetti';

interface ShopContextType {
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
  openQuickView: (product: Saree) => void;
  closeQuickView: () => void;
  
  // Navigation / views
  activePage: 'home' | 'catalog' | 'product' | 'story';
  navigateTo: (page: 'home' | 'catalog' | 'product' | 'story', productSlug?: string, categoryFilter?: string) => void;
  currentProductSlug: string | null;
  currentCategoryFilter: string | null;
  setCurrentCategoryFilter: (cat: string | null) => void;

  // Cart totals
  cartSubtotal: number;
  cartTotalCount: number;
  appliedCoupon: string | null;
  discountAmount: number;
  applyCouponCode: (code: string) => boolean;
  removeCouponCode: () => void;
  includeGiftBox: boolean;
  setIncludeGiftBox: (include: boolean) => void;

  // Toast
  toast: { message: string; type: 'success' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aaranya_silks_cart_v1';
const WISHLIST_STORAGE_KEY = 'aaranya_silks_wishlist_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        product: SAREES_DATA[0],
        selectedColor: 'Crimson Red',
        quantity: 1,
        includeGiftBox: true
      }
    ];
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [SAREES_DATA[1].id, SAREES_DATA[2].id];
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Saree | null>(null);

  // Navigation
  const [activePage, setActivePage] = useState<'home' | 'catalog' | 'product' | 'story'>('home');
  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(null);
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<string | null>(null);

  // Discount & Perks
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('AARANYA10');
  const [includeGiftBox, setIncludeGiftBox] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const addToCart = (product: Saree, selectedColor?: string, quantity: number = 1) => {
    const colorToUse = selectedColor || product.colors[0]?.name || product.color;
    
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === colorToUse
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, selectedColor: colorToUse, quantity, includeGiftBox: true }];
    });

    // Delightful micro-interaction
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#C8A96B', '#8B1E3F', '#FAF7F0']
    });

    showToast(`Added "${product.name}" to your Bag`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor: string) => {
    setCart((prev) => prev.filter(
      (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
    ));
    showToast('Item removed from Bag', 'info');
  };

  const updateQuantity = (productId: string, selectedColor: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const openQuickView = (product: Saree) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const navigateTo = (
    page: 'home' | 'catalog' | 'product' | 'story',
    productSlug?: string,
    categoryFilter?: string
  ) => {
    setActivePage(page);
    if (productSlug) {
      setCurrentProductSlug(productSlug);
    }
    if (categoryFilter !== undefined) {
      setCurrentCategoryFilter(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCouponCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AARANYA10' || clean === 'ROYALTY10') {
      setAppliedCoupon('AARANYA10');
      showToast('Coupon AARANYA10 applied! (10% Off)', 'success');
      return true;
    } else if (clean === 'FESTIVE15') {
      setAppliedCoupon('FESTIVE15');
      showToast('Coupon FESTIVE15 applied! (15% Off)', 'success');
      return true;
    } else {
      showToast('Invalid coupon code. Try AARANYA10', 'info');
      return false;
    }
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const discountRate = appliedCoupon === 'FESTIVE15' ? 0.15 : appliedCoupon === 'AARANYA10' ? 0.10 : 0;
  const discountAmount = Math.round(cartSubtotal * discountRate);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        activePage,
        navigateTo,
        currentProductSlug,
        currentCategoryFilter,
        setCurrentCategoryFilter,
        cartSubtotal,
        cartTotalCount,
        appliedCoupon,
        discountAmount,
        applyCouponCode,
        removeCouponCode,
        includeGiftBox,
        setIncludeGiftBox,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
