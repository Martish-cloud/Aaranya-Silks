import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
  quickViewSelectedColor: string | null;
  openQuickView: (product: Saree, selectedColor?: string) => void;
  closeQuickView: () => void;
  
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
  applyCouponCode: (code: string) => boolean;
  removeCouponCode: () => void;
  includeGiftBox: boolean;
  setIncludeGiftBox: (include: boolean) => void;

  // Toast
  toast: { message: string; type: 'success' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
}

interface HistoryStatePayload {
  page: 'home' | 'catalog' | 'product' | 'story';
  productSlug?: string | null;
  categoryFilter?: string | null;
  selectedColor?: string | null;
  scrollY?: number;
  historyIndex: number;
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
  const [quickViewSelectedColor, setQuickViewSelectedColor] = useState<string | null>(null);

  // Navigation
  const [activePage, setActivePage] = useState<'home' | 'catalog' | 'product' | 'story'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const product = params.get('product');
      if (product) return 'product';
      const page = params.get('page');
      if (page === 'catalog' || page === 'story') return page;
    }
    return 'home';
  });
  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('product');
    }
    return null;
  });
  const [selectedVariantColor, setSelectedVariantColor] = useState<string | null>(null);
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('category');
    }
    return null;
  });

  const isNavigatingRef = useRef(false);
  const historyIndexRef = useRef(0);

  // Setup History API and Scroll Restoration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const currentState = window.history.state as HistoryStatePayload | null;
    if (currentState && typeof currentState.historyIndex === 'number') {
      historyIndexRef.current = currentState.historyIndex;
    } else {
      const initialPayload: HistoryStatePayload = {
        page: activePage,
        productSlug: currentProductSlug,
        categoryFilter: currentCategoryFilter,
        selectedColor: selectedVariantColor,
        scrollY: window.scrollY || 0,
        historyIndex: 0
      };
      window.history.replaceState(initialPayload, '');
      historyIndexRef.current = 0;
    }

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScrollDebounced = () => {
      if (isNavigatingRef.current) return;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.history.state && !isNavigatingRef.current) {
          window.history.replaceState({
            ...window.history.state,
            scrollY: window.scrollY
          }, '');
        }
      }, 100);
    };

    const handlePopState = (e: PopStateEvent) => {
      const state = e.state as HistoryStatePayload | null;
      if (state) {
        historyIndexRef.current = state.historyIndex ?? 0;
        isNavigatingRef.current = true;

        setActivePage(state.page);
        setCurrentProductSlug(state.productSlug || null);
        setCurrentCategoryFilter(state.categoryFilter ?? null);
        setSelectedVariantColor(state.selectedColor ?? null);

        // Close any active modal overlays
        setQuickViewProduct(null);
        setQuickViewSelectedColor(null);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsSearchOpen(false);
        setIsCheckoutOpen(false);

        const targetY = state.scrollY ?? 0;
        const restoreScroll = () => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        };

        restoreScroll();
        requestAnimationFrame(restoreScroll);
        setTimeout(restoreScroll, 40);
        setTimeout(restoreScroll, 120);

        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 150);
      } else {
        setActivePage('home');
        setCurrentProductSlug(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('scroll', handleScrollDebounced, { passive: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScrollDebounced);
      window.removeEventListener('popstate', handlePopState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const openQuickView = (product: Saree, selectedColor?: string) => {
    setQuickViewProduct(product);
    setQuickViewSelectedColor(selectedColor || null);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    setQuickViewSelectedColor(null);
  };

  const navigateTo = (
    page: 'home' | 'catalog' | 'product' | 'story',
    productSlug?: string,
    categoryFilter?: string,
    selectedColor?: string
  ) => {
    isNavigatingRef.current = true;

    // 1. Record current scroll position to current history state before pushing next state
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      const currentState = window.history.state as HistoryStatePayload | null;
      if (currentState) {
        window.history.replaceState({
          ...currentState,
          scrollY: currentScrollY
        }, '');
      }

      const nextIndex = (historyIndexRef.current || 0) + 1;
      historyIndexRef.current = nextIndex;

      const nextState: HistoryStatePayload = {
        page,
        productSlug: productSlug || null,
        categoryFilter: categoryFilter ?? null,
        selectedColor: selectedColor ?? null,
        scrollY: 0,
        historyIndex: nextIndex
      };

      let nextUrl = window.location.pathname;
      if (page === 'product' && productSlug) {
        nextUrl += `?product=${encodeURIComponent(productSlug)}`;
      } else if (page === 'catalog') {
        nextUrl += categoryFilter ? `?page=catalog&category=${encodeURIComponent(categoryFilter)}` : '?page=catalog';
      } else if (page === 'story') {
        nextUrl += '?page=story';
      }

      window.history.pushState(nextState, '', nextUrl);
    }

    // 2. Close any open overlays
    setQuickViewProduct(null);
    setQuickViewSelectedColor(null);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsSearchOpen(false);
    setIsCheckoutOpen(false);

    // 3. Update React states
    setActivePage(page);
    if (productSlug) {
      setCurrentProductSlug(productSlug);
    }
    if (categoryFilter !== undefined) {
      setCurrentCategoryFilter(categoryFilter);
    }
    if (selectedColor !== undefined) {
      setSelectedVariantColor(selectedColor);
    } else {
      setSelectedVariantColor(null);
    }

    // 4. Scroll to top for new view
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 150);
  };

  const goBack = () => {
    if (typeof window !== 'undefined') {
      const currentState = window.history.state as HistoryStatePayload | null;
      if (currentState && currentState.historyIndex > 0) {
        window.history.back();
        return;
      }
    }
    navigateTo('home');
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
        quickViewSelectedColor,
        openQuickView,
        closeQuickView,
        activePage,
        navigateTo,
        goBack,
        currentProductSlug,
        selectedVariantColor,
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
