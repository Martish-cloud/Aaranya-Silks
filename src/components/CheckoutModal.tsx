import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2,
  Check,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { shopService } from '../services/shopService';
import { formatINR } from '../utils/formatters';
import confetti from 'canvas-confetti';
import type { DeliveryAddress, PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    gstAmount,
    shippingFee,
    finalTotal,
    includeGiftBox,
    navigateTo,
    user,
    setIsAuthOpen,
    setOnAuthSuccessAction,
    setSelectedTrackingOrderId,
    setIsOrderTrackingOpen,
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'demo_processing' | 'confirmation'>('shipping');

  const [formData, setFormData] = useState(() => {
    const parts = user?.name ? user.name.split(' ') : [];
    return {
      firstName: parts[0] || 'Radhika',
      lastName: parts.slice(1).join(' ') || 'Rao',
      email: user?.email || 'radhika.rao@example.com',
      phone: user?.phone || '+91 98450 12890',
      address: '42, Lavelle Road, Shanthala Nagar',
      apartment: 'Apartment 4B, Regency Court',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      paymentMethod: 'demo_online' as PaymentMethod,
      specialInstructions: 'Please deliver in the bespoke Aaranya Silks archival gift box.',
    };
  });

  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [demoPaymentStep, setDemoPaymentStep] = useState<number>(1);

  if (!isCheckoutOpen) return null;

  const shippingCost = shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Check authentication requirement before order placement
    if (!user) {
      setOnAuthSuccessAction(() => {
        setIsCheckoutOpen(true);
        setStep('payment');
      });
      setIsAuthOpen(true);
      return;
    }

    if (!formData.address || !formData.pincode || !formData.phone) {
      alert('Please fill out all required shipping details.');
      return;
    }

    setStep('payment');
  };

  const executeOrderCreation = (method: PaymentMethod) => {
    const shippingAddress: DeliveryAddress = {
      id: `addr_${Date.now()}`,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone,
      address: formData.address,
      apartment: formData.apartment,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    };

    const newOrder = shopService.createOrder({
      items: [...cart],
      shippingAddress,
      paymentMethod: method,
      subtotal: cartSubtotal,
      discount: discountAmount,
      gst: gstAmount,
      shippingFee: shippingCost,
      user,
    });

    setConfirmedOrderId(newOrder.id);
    clearCart();
    setStep('confirmation');

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#C8A96B', '#8B1E3F', '#651C32', '#FAF7F0'],
    });
  };

  const handleConfirmOrder = () => {
    if (formData.paymentMethod === 'cod') {
      // Cash on delivery: directly place order (unpaid state)
      executeOrderCreation('cod');
    } else {
      // Online Demo Payment Flow
      setStep('demo_processing');
      setDemoPaymentStep(1);

      setTimeout(() => {
        setDemoPaymentStep(2);
      }, 1000);

      setTimeout(() => {
        setDemoPaymentStep(3);
      }, 2200);

      setTimeout(() => {
        executeOrderCreation('demo_online');
      }, 3100);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => step !== 'confirmation' && step !== 'demo_processing' && setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C8A96B]/35 z-10 my-auto text-left"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#C8A96B]/25 flex items-center justify-between bg-[#F2EBDD]">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 40 40" className="w-5 h-5 text-[#651C32]" fill="currentColor">
                <path d="M20 2C20.5 8 23 13 28 17C23 18 20 23 20 30C20 23 17 18 12 17C17 13 19.5 8 20 2Z" />
              </svg>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#651C32]">
                  Aaranya Silks Atelier Checkout
                </h3>
                <p className="text-[11px] text-[#1C1A19]/60 font-light">
                  {step === 'shipping' && 'Step 1: Contact & Delivery Address'}
                  {step === 'payment' && 'Step 2: Payment Method & Demonstration Mode'}
                  {step === 'demo_processing' && 'Processing Simulated Demo Payment...'}
                  {step === 'confirmation' && 'Order Placed & Confirmed'}
                </p>
              </div>
            </div>

            {step !== 'confirmation' && step !== 'demo_processing' && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] transition-colors cursor-pointer"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
            {/* Step 1: Shipping Address */}
            {step === 'shipping' && (
              <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form fields (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#C8A96B]/20 pb-2">
                    <h4 className="font-serif text-lg font-semibold text-[#651C32]">
                      Contact & Delivery Details
                    </h4>
                    {user ? (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Verified Patron</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setOnAuthSuccessAction(() => {
                            setIsCheckoutOpen(true);
                          });
                          setIsAuthOpen(true);
                        }}
                        className="text-xs text-[#8B1E3F] hover:underline cursor-pointer"
                      >
                        Sign in for faster checkout
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House / Flat no., Building name, Street"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                      Apartment, Suite, Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                    >
                      <span>Continue to Payment Selection</span>
                      <ArrowRight className="w-4 h-4 text-[#C8A96B]" />
                    </button>
                  </div>
                </div>

                {/* Right: Order Summary Preview (5 cols) */}
                <div className="lg:col-span-5 bg-[#F2EBDD] p-5 rounded-2xl border border-[#C8A96B]/25 space-y-4">
                  <h4 className="font-serif text-base font-semibold text-[#651C32] border-b border-[#C8A96B]/20 pb-2">
                    Order Summary ({cart.length} creations)
                  </h4>

                  <div className="space-y-3 max-h-56 overflow-y-auto no-scrollbar">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-3 text-xs">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-16 object-cover object-top rounded-lg bg-white shrink-0 border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-medium text-[#1C1A19] truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-[#8B1E3F]">
                            Shade: {item.selectedColor} • Qty: {item.quantity}
                          </p>
                          <p className="font-serif font-bold text-[#651C32] mt-0.5">
                            {formatINR(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#1C1A19]/80 pt-3 border-t border-[#C8A96B]/20">
                    <div className="flex justify-between">
                      <span>Item Subtotal</span>
                      <span className="font-serif">{formatINR(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#8B1E3F]">
                        <span>Coupon Discount ({appliedCoupon})</span>
                        <span>-{formatINR(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span className="font-serif">{formatINR(gstAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insured Express Shipping</span>
                      <span className="font-semibold text-[#8B1E3F]">
                        {shippingCost === 0 ? 'Complimentary' : formatINR(shippingCost)}
                      </span>
                    </div>
                    {includeGiftBox && (
                      <div className="flex justify-between text-[#8B1E3F]">
                        <span>Bespoke Archival Gift Packaging</span>
                        <span className="font-semibold">Complimentary</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-[#651C32] pt-2 border-t border-[#C8A96B]/25">
                      <span>Final Total</span>
                      <span className="font-serif text-lg">{formatINR(finalTotal)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/70 border border-[#C8A96B]/30 text-[11px] text-[#1C1A19]/80">
                    <Truck className="w-4 h-4 text-[#8B1E3F] shrink-0" />
                    <span>
                      Estimated delivery to {formData.pincode}: <strong>2 to 4 business days</strong>
                    </span>
                  </div>
                </div>
              </form>
            )}

            {/* Step 2: Payment Selector */}
            {step === 'payment' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#C8A96B]/20 pb-2">
                    <h4 className="font-serif text-lg font-semibold text-[#651C32]">
                      Select Payment Mode
                    </h4>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-xs text-[#8B1E3F] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back to Address</span>
                    </button>
                  </div>

                  {/* Prominent Demo Notice */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-amber-800">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>DEMO PAYMENT SYSTEM — NO REAL MONEY CHARGED</span>
                    </div>
                    <p className="opacity-90">
                      This checkout simulates high-value transaction authorization without charging any payment or collecting financial card credentials.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Option 1: Demo Online Payment */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'demo_online'
                          ? 'border-[#651C32] bg-[#FAF7F0] shadow ring-1 ring-[#651C32]'
                          : 'border-[#C8A96B]/30 bg-white hover:border-[#651C32]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="demo_online"
                        checked={formData.paymentMethod === 'demo_online'}
                        onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'demo_online' }))}
                        className="mt-1 accent-[#651C32]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#1C1A19]">
                            Online Payment — Demo Mode (Simulated)
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                            Zero Cost
                          </span>
                        </div>
                        <p className="text-xs text-[#1C1A19]/70 mt-1">
                          Simulates Instant UPI, Credit Cards, Net Banking with zero real funds transferred.
                        </p>
                      </div>
                    </label>

                    {/* Option 2: Cash on Delivery */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#651C32] bg-[#FAF7F0] shadow ring-1 ring-[#651C32]'
                          : 'border-[#C8A96B]/30 bg-white hover:border-[#651C32]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                        className="mt-1 accent-[#651C32]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#1C1A19]">
                            Cash on Delivery / Pay on Delivery (COD)
                          </span>
                          <Truck className="w-4 h-4 text-[#8B1E3F]" />
                        </div>
                        <p className="text-xs text-[#1C1A19]/70 mt-1">
                          Pay upon insured doorstep inspection. Order is recorded as Pay on Delivery (Unpaid).
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleConfirmOrder}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all shadow-xl hover:shadow-2xl cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
                      <span>
                        {formData.paymentMethod === 'cod'
                          ? `Confirm Order with Cash on Delivery (${formatINR(finalTotal)})`
                          : `Complete Demo Payment (${formatINR(finalTotal)})`}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right: Summary */}
                <div className="lg:col-span-5 bg-[#F2EBDD] p-5 rounded-2xl border border-[#C8A96B]/25 space-y-3">
                  <h4 className="font-serif text-base font-semibold text-[#651C32]">
                    Delivering To
                  </h4>
                  <div className="text-xs text-[#1C1A19]/80 space-y-1">
                    <p className="font-semibold text-[#1C1A19]">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.address}</p>
                    {formData.apartment && <p>{formData.apartment}</p>}
                    <p>
                      {formData.city}, {formData.state} - {formData.pincode}
                    </p>
                    <p className="text-[#8B1E3F]">{formData.phone}</p>
                  </div>

                  <div className="pt-3 border-t border-[#C8A96B]/20 space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#1C1A19]/80">
                      <span>Item Subtotal ({cart.length} Creations)</span>
                      <span className="font-serif">{formatINR(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#8B1E3F]">
                        <span>Coupon Discount ({appliedCoupon})</span>
                        <span>-{formatINR(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#1C1A19]/80">
                      <span>GST (18%)</span>
                      <span className="font-serif">{formatINR(gstAmount)}</span>
                    </div>
                    <div className="flex justify-between text-[#1C1A19]/80">
                      <span>Insured Express Shipping</span>
                      <span className="font-semibold text-[#8B1E3F]">
                        {shippingCost === 0 ? 'Complimentary' : formatINR(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#651C32] pt-2 border-t border-[#C8A96B]/25">
                      <span>Final Amount Payable</span>
                      <span className="font-serif text-base">{formatINR(finalTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step: Simulated Demo Processing */}
            {step === 'demo_processing' && (
              <div className="text-center py-12 px-4 max-w-md mx-auto space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#651C32] text-[#C8A96B] flex items-center justify-center mx-auto shadow-xl">
                  {demoPaymentStep < 3 ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8B1E3F] block">
                    DEMO SIMULATOR • SAFE ZERO MONEY TEST
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#651C32]">
                    {demoPaymentStep === 1 && 'Initiating Demo Session...'}
                    {demoPaymentStep === 2 && 'Processing Demonstration Payment...'}
                    {demoPaymentStep === 3 && 'Simulated Payment Successful!'}
                  </h3>
                  <p className="text-xs text-[#1C1A19]/70">
                    Communicating with mock banking gateway layer. Zero funds charged.
                  </p>
                </div>

                {/* Simulated Steps Visual */}
                <div className="p-4 rounded-2xl bg-white border border-[#C8A96B]/30 space-y-2.5 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        demoPaymentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-black/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className={demoPaymentStep >= 1 ? 'font-semibold text-emerald-900' : 'text-black/40'}>
                      Simulated Token Authorized
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        demoPaymentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-black/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className={demoPaymentStep >= 2 ? 'font-semibold text-emerald-900' : 'text-black/40'}>
                      Idempotent Backend Verification
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        demoPaymentStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-black/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className={demoPaymentStep >= 3 ? 'font-semibold text-emerald-900' : 'text-black/40'}>
                      Generating Order Reference & Timeline
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step: Confirmation */}
            {step === 'confirmation' && confirmedOrderId && (
              <div className="text-center py-6 px-4 max-w-lg mx-auto space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#651C32] text-[#C8A96B] flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1E3F] block mb-1">
                    Order Placed Successfully
                  </span>
                  <h3 className="font-serif text-3xl font-light text-[#651C32]">
                    Thank You, {formData.firstName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1C1A19]/70 mt-2">
                    Your bespoke saree creation has been reserved. Our master draper is preparing your shipment in our Bengaluru atelier.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F2EBDD] border border-[#C8A96B]/30 text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#1C1A19]/60">Order Reference:</span>
                    <strong className="font-mono text-[#651C32] text-sm">{confirmedOrderId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C1A19]/60">Payment Method:</span>
                    <strong>
                      {formData.paymentMethod === 'cod' ? 'Cash on Delivery (Pay upon Receipt)' : 'Online Demo Mode (Simulated)'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C1A19]/60">Delivery Address:</span>
                    <span className="text-right truncate max-w-[200px]">
                      {formData.address}, {formData.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C1A19]/60">Estimated Delivery:</span>
                    <span className="text-[#8B1E3F] font-semibold">2 to 4 business days</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setStep('shipping');
                      setSelectedTrackingOrderId(confirmedOrderId);
                      setIsOrderTrackingOpen(true);
                      setConfirmedOrderId(null);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-[#C8A96B]" />
                    <span>Track Order Progress</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setStep('shipping');
                      setConfirmedOrderId(null);
                      navigateTo('catalog');
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F0] text-[#651C32] border border-[#651C32] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
