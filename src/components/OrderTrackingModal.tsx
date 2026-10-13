import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, CheckCircle2, Clock, Sparkles, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import type { Order } from '../types';
import { shopService } from '../services/shopService';
import { formatINR } from '../utils/formatters';

interface OrderTrackingModalProps {
  isOpen?: boolean;
  orderId: string | null;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen = true, orderId, onClose }) => {
  const [updatedOrder, setUpdatedOrder] = useState<Order | null>(null);

  if (!isOpen || !orderId) return null;

  const activeOrder = (updatedOrder && updatedOrder.id === orderId)
    ? updatedOrder
    : shopService.getOrderById(orderId) || null;

  if (!activeOrder) return null;

  const handleSimulateNextStage = () => {
    const updated = shopService.advanceOrderStage(activeOrder.id);
    if (updated) {
      setUpdatedOrder({ ...updated });
    }
  };

  const completedStagesCount = activeOrder.events.filter((e) => e.completed).length;
  const progressPercent = Math.round((completedStagesCount / activeOrder.events.length) * 100);

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
          className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C8A96B]/35 z-10 my-auto text-left max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#C8A96B]/25 flex items-center justify-between bg-[#F2EBDD] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#651C32] text-[#C8A96B] flex items-center justify-center shadow-md">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#651C32]">
                    Order Tracking
                  </h3>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-[#8B1E3F]/15 text-[#8B1E3F]">
                    {activeOrder.id}
                  </span>
                </div>
                <p className="text-[11px] text-[#1C1A19]/60 font-light">
                  Status: <strong>{activeOrder.orderStatus}</strong> • Waybill:{' '}
                  {activeOrder.trackingNumber}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
            {/* Demo Notice Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Demonstration Tracking:</strong> Controlled simulated progression for review.
                </span>
              </div>
              {completedStagesCount < activeOrder.events.length && (
                <button
                  onClick={handleSimulateNextStage}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold uppercase tracking-wider text-[11px] transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span>Simulate Next Stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Overall Progress Bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#C8A96B]/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#651C32] uppercase tracking-wider font-semibold">
                  Journey Progress ({completedStagesCount}/{activeOrder.events.length} Completed)
                </span>
                <span className="font-mono text-[#8B1E3F] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF7F0] overflow-hidden border border-[#C8A96B]/20">
                <div
                  className="h-full bg-gradient-to-r from-[#8B1E3F] via-[#651C32] to-[#C8A96B] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* 9-Stage Visual Timeline */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#651C32] border-b border-[#C8A96B]/20 pb-2">
                Atelier Fulfillment & Courier Stages
              </h4>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#C8A96B]/30">
                {activeOrder.events.map((event, idx) => {
                  const isCurrent =
                    event.completed &&
                    (idx === activeOrder.events.length - 1 || !activeOrder.events[idx + 1]?.completed);

                  return (
                    <div key={event.stage} className="relative group">
                      {/* Timeline Dot Indicator */}
                      <div
                        className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          event.completed
                            ? 'bg-[#651C32] text-[#C8A96B] shadow-sm'
                            : 'bg-white border-2 border-black/20 text-transparent'
                        } ${isCurrent ? 'ring-4 ring-[#C8A96B]/40 scale-110' : ''}`}
                      >
                        {event.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                        )}
                      </div>

                      {/* Event Details */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <span
                            className={`font-serif text-sm font-semibold ${
                              event.completed ? 'text-[#651C32]' : 'text-[#1C1A19]/50'
                            }`}
                          >
                            {event.stage}
                          </span>
                          {isCurrent && (
                            <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#651C32] text-white">
                              Active Status
                            </span>
                          )}
                          <p className="text-xs text-[#1C1A19]/70 font-light mt-0.5">
                            {event.description}
                          </p>
                        </div>

                        {event.timestamp && (
                          <div className="flex items-center gap-1 text-[11px] font-mono text-[#8B1E3F] shrink-0">
                            <Clock className="w-3 h-3" />
                            <span>{event.timestamp}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary & Destination Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#C8A96B]/25">
              {/* Destination */}
              <div className="p-3.5 rounded-2xl bg-[#F2EBDD] border border-[#C8A96B]/20 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8B1E3F] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>Destination Address</span>
                </span>
                <p className="font-semibold text-[#1C1A19]">{activeOrder.shippingAddress.name}</p>
                <p className="text-[#1C1A19]/75">{activeOrder.shippingAddress.address}</p>
                <p className="text-[#1C1A19]/75">
                  {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} -{' '}
                  {activeOrder.shippingAddress.pincode}
                </p>
              </div>

              {/* Payment & Total */}
              <div className="p-3.5 rounded-2xl bg-[#F2EBDD] border border-[#C8A96B]/20 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8B1E3F] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Payment Information</span>
                </span>
                <div className="flex justify-between">
                  <span className="text-[#1C1A19]/70">Method:</span>
                  <strong className="text-[#1C1A19]">
                    {activeOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Demo Payment'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1C1A19]/70">Status:</span>
                  <span
                    className={`font-semibold ${
                      activeOrder.paymentStatus === 'Demo Payment Successful'
                        ? 'text-emerald-700'
                        : 'text-amber-800'
                    }`}
                  >
                    {activeOrder.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#651C32] pt-1 border-t border-[#C8A96B]/20">
                  <span>Final Total:</span>
                  <span className="font-serif">{formatINR(activeOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
