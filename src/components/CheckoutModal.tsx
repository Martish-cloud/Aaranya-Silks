import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Building, Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../utils/formatters';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    includeGiftBox,
    navigateTo
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');

  const [formData, setFormData] = useState({
    email: 'radhika.rao@example.com',
    phone: '+91 98450 12890',
    firstName: 'Radhika',
    lastName: 'Rao',
    address: '42, Lavelle Road, Shanthala Nagar',
    apartment: 'Apartment 4B, Regency Court',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    paymentMethod: 'upi',
    specialInstructions: 'Please deliver in the bespoke Aaranya Silks archival gift box.'
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const shippingCost = cartSubtotal >= 30000 ? 0 : 450;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address || !formData.pincode || !formData.phone) {
      alert('Please fill out all required shipping details.');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const generatedOrderNum = `AS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('confirmation');
    clearCart();

    // Celebration Confetti
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#C8A96B', '#8B1E3F', '#651C32', '#FAF7F0']
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => step !== 'confirmation' && setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C8A96B]/30 z-10 my-auto text-left"
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
                  {step === 'payment' && 'Step 2: Insured Order Review & Payment'}
                  {step === 'confirmation' && 'Order Placed & Confirmed'}
                </p>
              </div>
            </div>

            {step !== 'confirmation' && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] transition-colors"
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
                  <h4 className="font-serif text-lg font-semibold text-[#651C32] border-b border-[#C8A96B]/20 pb-2">
                    Contact & Delivery Details
                  </h4>

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

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                      Personalized Message / Gift Instructions
                    </label>
                    <textarea
                      name="specialInstructions"
                      rows={2}
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C8A96B]/30 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
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
                          className="w-12 h-16 object-cover rounded-lg bg-white shrink-0 border"
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
                      <span>Subtotal</span>
                      <span className="font-serif">{formatINR(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#8B1E3F]">
                        <span>Coupon ({appliedCoupon})</span>
                        <span>-{formatINR(discountAmount)}</span>
                      </div>
                    )}
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
                      <span>Total Payable</span>
                      <span className="font-serif text-lg">{formatINR(finalTotal)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/70 border border-[#C8A96B]/30 text-[11px] text-[#1C1A19]/80">
                    <Truck className="w-4 h-4 text-[#8B1E3F] shrink-0" />
                    <span>Estimated delivery to {formData.pincode}: <strong>2 to 4 business days</strong></span>
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
                      Select Payment Gateway
                    </h4>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-xs text-[#8B1E3F] hover:underline flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back to Address</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* UPI */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'upi'
                          ? 'border-[#651C32] bg-[#FAF7F0] shadow ring-1 ring-[#651C32]'
                          : 'border-[#C8A96B]/30 bg-white hover:border-[#651C32]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="mt-1 accent-[#651C32]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#1C1A19]">
                            Instant UPI / QR Payment
                          </span>
                          <QrCode className="w-4 h-4 text-[#8B1E3F]" />
                        </div>
                        <p className="text-xs text-[#1C1A19]/70 mt-1">
                          Google Pay, PhonePe, Paytm, or BHIM UPI instant zero-fee verification.
                        </p>
                      </div>
                    </label>

                    {/* Credit / Debit Card */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-[#651C32] bg-[#FAF7F0] shadow ring-1 ring-[#651C32]'
                          : 'border-[#C8A96B]/30 bg-white hover:border-[#651C32]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mt-1 accent-[#651C32]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#1C1A19]">
                            Credit / Debit Cards
                          </span>
                          <CreditCard className="w-4 h-4 text-[#8B1E3F]" />
                        </div>
                        <p className="text-xs text-[#1C1A19]/70 mt-1">
                          Visa, MasterCard, American Express, RuPay with 3D Secure OTP authentication.
                        </p>
                      </div>
                    </label>

                    {/* Net Banking */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'netbanking'
                          ? 'border-[#651C32] bg-[#FAF7F0] shadow ring-1 ring-[#651C32]'
                          : 'border-[#C8A96B]/30 bg-white hover:border-[#651C32]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={formData.paymentMethod === 'netbanking'}
                        onChange={handleInputChange}
                        className="mt-1 accent-[#651C32]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#1C1A19]">
                            Net Banking
                          </span>
                          <Building className="w-4 h-4 text-[#8B1E3F]" />
                        </div>
                        <p className="text-xs text-[#1C1A19]/70 mt-1">
                          HDFC, ICICI, SBI, Axis, Kotak, and 50+ major Indian banks.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all shadow-xl hover:shadow-2xl"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
                      <span>Confirm & Place Order ({formatINR(finalTotal)})</span>
                    </button>
                  </div>
                </div>

                {/* Right: Summary in payment step */}
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
                    <p>{formData.city}, {formData.state} - {formData.pincode}</p>
                    <p className="text-[#8B1E3F]">{formData.phone}</p>
                  </div>

                  <div className="pt-3 border-t border-[#C8A96B]/20 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Total Items</span>
                      <span>{cart.length} Sarees</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#651C32]">
                      <span>Amount Payable</span>
                      <span className="font-serif text-base">{formatINR(finalTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 'confirmation' && (
              <div className="text-center py-8 px-4 max-w-lg mx-auto space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#651C32] text-[#C8A96B] flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1E3F] block mb-1">
                    Order Confirmed
                  </span>
                  <h3 className="font-serif text-3xl font-light text-[#651C32]">
                    Thank You, {formData.firstName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1C1A19]/70 mt-2">
                    Your bespoke saree creation has been reserved. Our master draper is preparing your shipment in our Bengaluru atelier.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F2EBDD] border border-[#C8A96B]/30 text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#1C1A19]/60">Order Reference:</span>
                    <strong className="font-mono text-[#651C32]">{orderNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C1A19]/60">Delivery Address:</span>
                    <span className="text-right truncate max-w-[200px]">{formData.address}, {formData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C1A19]/60">Estimated Transit:</span>
                    <span className="text-[#8B1E3F] font-semibold">2 to 4 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C1A19]/60">Confirmation Dispatched:</span>
                    <span>{formData.email}</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      navigateTo('catalog');
                    }}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                  >
                    Continue Exploring Collections
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
