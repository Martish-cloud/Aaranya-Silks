import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PackageCheck, Eye, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { shopService } from '../services/shopService';
import { formatINR } from '../utils/formatters';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrderToTrack: (orderId: string) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectOrderToTrack,
}) => {
  const { user, setIsAuthOpen, navigateTo } = useShop();
  const orders = isOpen ? shopService.getAllOrders() : [];

  if (!isOpen) return null;

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
          className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C8A96B]/35 z-10 my-auto text-left max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#C8A96B]/25 flex items-center justify-between bg-[#F2EBDD] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#651C32] text-[#C8A96B] flex items-center justify-center shadow-md">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#651C32]">
                  Your Order History
                </h3>
                <p className="text-[11px] text-[#1C1A19]/60 font-light">
                  {user ? `Patron Account: ${user.name} (${user.email || user.phone})` : 'All recent orders & persistent tracking'}
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

          {/* Orders List */}
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
            {!user && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-center justify-between gap-3 text-xs">
                <span>
                  Sign in to link and sync all purchases to your permanent customer account.
                </span>
                <button
                  onClick={() => {
                    onClose();
                    setIsAuthOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#651C32] text-white font-semibold uppercase tracking-wider text-[11px] shrink-0 cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}

            {orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#C8A96B] mx-auto opacity-70" />
                <h4 className="font-serif text-xl text-[#651C32]">No orders placed yet</h4>
                <p className="text-xs text-[#1C1A19]/60 max-w-xs mx-auto">
                  Your handcrafted heirloom sarees and demo checkout purchases will appear here.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigateTo('catalog');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#651C32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8B1E3F]"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-white border border-[#C8A96B]/30 shadow-xs hover:border-[#651C32] transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#C8A96B]/20">
                    <div className="flex items-center gap-2">
                      <strong className="font-mono text-sm text-[#651C32]">{order.id}</strong>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#651C32]/10 text-[#651C32]">
                        {order.orderStatus}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#1C1A19]/60">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-serif font-semibold text-[#1C1A19] truncate">
                        {order.items.map((i) => i.product.name).join(', ')}
                      </p>
                      <p className="text-[11px] text-[#1C1A19]/60">
                        Total items: {order.items.length} • Mode:{' '}
                        {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Demo'}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="block font-serif text-base font-bold text-[#651C32]">
                        {formatINR(order.total)}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#1C1A19]/60 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96B]" />
                      <span>Insured Courier: {order.trackingNumber}</span>
                    </span>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectOrderToTrack(order.id);
                      }}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#651C32] text-[#651C32] hover:text-white border border-[#651C32] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
