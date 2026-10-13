import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, CheckCircle2, AlertCircle, HelpCircle, Search, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { POPULAR_CITIES, ALL_SUPPORTED_CITIES, checkDeliveryAvailability } from '../data/deliveryCoverage';
import type { DeliveryCoverageResult } from '../types';

interface DeliveryCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productId?: string;
}

export const DeliveryCheckerModal: React.FC<DeliveryCheckerModalProps> = ({
  isOpen,
  onClose,
  productName,
  productId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<DeliveryCoverageResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSelectCity = (_cityName: string, pincode: string) => {
    setSearchQuery(pincode);
    setIsSearching(true);
    setTimeout(() => {
      const res = checkDeliveryAvailability(pincode, productId);
      setResult(res);
      setIsSearching(false);
    }, 200);
  };

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const res = checkDeliveryAvailability(searchQuery.trim(), productId);
      setResult(res);
      setIsSearching(false);
    }, 250);
  };

  // Filter city suggestions if user is typing
  const queryLower = searchQuery.toLowerCase().trim();
  const filteredSuggestions = queryLower.length >= 2 && !/^\d+$/.test(queryLower)
    ? ALL_SUPPORTED_CITIES.filter(
        (c) =>
          c.name.toLowerCase().includes(queryLower) ||
          c.state.toLowerCase().includes(queryLower)
      ).slice(0, 4)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C8A96B]/35 z-10 my-auto text-left"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#C8A96B]/25 flex items-center justify-between bg-[#F2EBDD]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#651C32] text-[#C8A96B] flex items-center justify-center shadow-md">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#651C32]">
                  Check Delivery Availability
                </h3>
                <p className="text-[11px] text-[#1C1A19]/60 font-light">
                  {productName ? `Verifying for ${productName}` : 'Verify pincode and delivery timeline'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Search Input Form */}
            <form onSubmit={handleCheck} className="space-y-2">
              <label className="block text-xs font-semibold text-[#1C1A19]/80 uppercase tracking-wider">
                Enter Indian PIN Code or City Name
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#8B1E3F] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. 560001, 700001, Bengaluru, Mumbai"
                  className="w-full pl-10 pr-24 py-3 rounded-2xl bg-white border border-[#C8A96B]/40 text-xs sm:text-sm text-[#1C1A19] placeholder:text-[#1C1A19]/40 focus:outline-none focus:border-[#651C32] focus:ring-1 focus:ring-[#651C32] transition-all shadow-xs"
                />
                <button
                  type="submit"
                  disabled={!searchQuery.trim() || isSearching}
                  className="absolute right-1.5 px-4 py-2 rounded-xl bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSearching ? 'Checking...' : 'Check'}
                </button>
              </div>

              {/* Autocomplete suggestions dropdown if typing city name */}
              {filteredSuggestions.length > 0 && (
                <div className="mt-1 bg-white rounded-xl border border-[#C8A96B]/30 shadow-md p-1.5 divide-y divide-[#C8A96B]/15">
                  {filteredSuggestions.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleSelectCity(city.name, city.pincode)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#F2EBDD] rounded-lg flex items-center justify-between text-[#1C1A19]"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#8B1E3F]" />
                        <span className="font-medium">{city.name}, {city.state}</span>
                      </div>
                      <span className="font-mono text-[#8B1E3F] text-[11px] font-semibold">{city.pincode}</span>
                    </button>
                  ))}
                </div>
              )}
            </form>

            {/* Popular City Shortcuts (5 specified in requirements) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-[#8B1E3F] font-bold">
                  Popular Delivery Hubs
                </span>
                <span className="text-[10px] text-[#C8A96B]">Select for quick test</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSelectCity(city.name, city.pincode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#651C32] text-[#1C1A19] hover:text-[#FAF7F0] border border-[#C8A96B]/30 hover:border-[#651C32] text-xs font-medium transition-all shadow-2xs group cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-[#C8A96B] group-hover:text-[#E5B842]" />
                    <span>{city.name}</span>
                    <span className="text-[10px] text-[#8B1E3F] group-hover:text-[#FAF7F0]/80 font-mono">
                      ({city.pincode})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Outcome Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border transition-all ${
                  result.status === 'available'
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : result.status === 'unavailable'
                    ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                    : 'bg-amber-50/80 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.status === 'available' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {result.status === 'unavailable' && (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  {result.status === 'unknown' && (
                    <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-1.5 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-serif">
                        {result.status === 'available' && 'Delivery Available'}
                        {result.status === 'unavailable' && 'Delivery Unavailable'}
                        {result.status === 'unknown' && 'Coverage Unverified'}
                      </strong>
                      {result.locationName && (
                        <span className="text-[11px] font-semibold opacity-75">
                          {result.locationName}
                        </span>
                      )}
                    </div>

                    <p className="leading-relaxed opacity-90">{result.message}</p>

                    {result.status === 'available' && (
                      <div className="pt-2 border-t border-emerald-200 flex flex-wrap gap-3 text-[11px]">
                        {result.estimatedDays && (
                          <div className="flex items-center gap-1 font-medium text-emerald-800">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Estimated: <strong>{result.estimatedDays}</strong></span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 font-medium text-emerald-800">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Cash on Delivery: <strong>Eligible</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Atelier Assurance footer */}
            <div className="pt-2 border-t border-[#C8A96B]/20 flex items-center justify-between text-[11px] text-[#1C1A19]/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B1E3F]" />
                <span>100% Insured Delivery Across India</span>
              </span>
              <span>Bengaluru Atelier Hub</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
