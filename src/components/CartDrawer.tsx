import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Gift, Tag, Sparkles, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';

const FREE_SHIPPING_THRESHOLD = 30000;

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotalCount,
    appliedCoupon,
    discountAmount,
    applyCouponCode,
    removeCouponCode,
    includeGiftBox,
    setIncludeGiftBox,
    setIsCheckoutOpen,
    navigateTo
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAF7F0] z-50 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#C8A96B]/25 flex items-center justify-between bg-[#F2EBDD]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#651C32]" />
                <h3 className="font-serif text-xl font-bold text-[#651C32]">
                  Your Shopping Bag
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#651C32] text-white text-[11px] font-semibold">
                  {cartTotalCount}
                </span>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#FAF7F0] px-5 py-3 border-b border-[#C8A96B]/15 text-left">
              <div className="flex items-center justify-between text-xs mb-1.5 font-light">
                <span className="text-[#1C1A19]">
                  {remainingForFree === 0 ? (
                    <span className="text-[#651C32] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
                      Complimentary Insured Express Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#651C32] font-semibold">{formatINR(remainingForFree)}</strong> more for Complimentary Insured Express Shipping
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-semibold text-[#8B1E3F]">
                  {freeShippingProgress}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#F2EBDD] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8B1E3F] to-[#C8A96B] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-left">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2EBDD] text-[#8B1E3F] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-light text-[#651C32]">
                    Your bag is presently empty
                  </h4>
                  <p className="text-xs text-[#1C1A19]/60 max-w-xs mx-auto">
                    Discover our regal heirlooms and wrap yourself in timeless Indian silk.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('catalog');
                    }}
                    className="px-6 py-3 rounded-full bg-[#651C32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E3F] transition-colors"
                  >
                    Explore Sarees
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex gap-4 p-3 rounded-2xl bg-[#F2EBDD]/60 border border-[#C8A96B]/25"
                  >
                    {/* Saree Thumbnail matching selected variant */}
                    <div className="w-20 h-26 rounded-xl overflow-hidden bg-white shrink-0 border border-[#C8A96B]/20">
                      {(() => {
                        const matchingColor = item.product.colors?.find(
                          (c) => c.name.toLowerCase() === item.selectedColor.toLowerCase()
                        );
                        const itemImg = matchingColor?.image || item.product.images[0];
                        return (
                          <img
                            src={itemImg}
                            alt={`${item.product.name} - ${item.selectedColor}`}
                            className="w-full h-full object-cover object-top"
                          />
                        );
                      })()}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-semibold text-[#1C1A19] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                            className="text-[#1C1A19]/40 hover:text-rose-600 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#8B1E3F] font-medium">
                          Shade: {item.selectedColor}
                        </p>
                        <p className="text-[10px] text-[#1C1A19]/50 font-light truncate">
                          {item.product.fabric}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Qty controls */}
                        <div className="flex items-center border border-[#C8A96B]/40 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                            }
                            className="p-1 hover:bg-[#FAF7F0] text-[#1C1A19]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#1C1A19]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                            }
                            className="p-1 hover:bg-[#FAF7F0] text-[#1C1A19]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-[#651C32]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Bespoke Gift Box Toggle */}
              {cart.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#F2EBDD] border border-[#C8A96B]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-4 h-4 text-[#8B1E3F]" />
                    <div>
                      <p className="text-xs font-semibold text-[#1C1A19]">
                        Complimentary Bespoke Gift Box
                      </p>
                      <p className="text-[10px] text-[#1C1A19]/60">
                        Archival muslin wrap & wax-sealed royal card
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeGiftBox}
                    onChange={(e) => setIncludeGiftBox(e.target.checked)}
                    className="w-4 h-4 accent-[#651C32] rounded cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Bottom Summary & Actions */}
            {cart.length > 0 && (
              <div className="p-5 bg-[#F2EBDD] border-t border-[#C8A96B]/25 text-left space-y-3">
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#8B1E3F] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon (e.g. AARANYA10)"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32] uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#651C32] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E3F] transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[#651C32]/10 rounded-lg text-xs">
                    <span className="text-[#651C32] font-semibold">
                      Coupon Applied: {appliedCoupon}
                    </span>
                    <button
                      onClick={removeCouponCode}
                      className="text-rose-600 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Subtotal & Calculations */}
                <div className="space-y-1.5 text-xs text-[#1C1A19]/80 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-serif font-medium">{formatINR(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#8B1E3F] font-medium">
                      <span>Privilege Discount</span>
                      <span>-{formatINR(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Air Delivery</span>
                    <span className="text-[#8B1E3F] font-semibold">
                      {remainingForFree === 0 ? 'Complimentary' : '₹450'}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-[#651C32] pt-2 border-t border-[#C8A96B]/25">
                    <span>Total Amount</span>
                    <span className="font-serif text-lg">
                      {formatINR(finalTotal + (remainingForFree === 0 ? 0 : 450))}
                    </span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#C8A96B]" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#1C1A19]/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>256-Bit SSL Encrypted • Insured Doorstep Delivery</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
