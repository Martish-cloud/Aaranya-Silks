import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-[#1C1A19] text-[#FAF7F0] pt-16 md:pt-24 pb-12 border-t border-[#C8A96B]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10 text-left">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#C8A96B]" fill="currentColor">
                <path d="M20 2C20.5 8 23 13 28 17C23 18 20 23 20 30C20 23 17 18 12 17C17 13 19.5 8 20 2Z" fill="currentColor" />
                <circle cx="20" cy="34" r="2" fill="#C8A96B" />
              </svg>
              <span className="font-serif tracking-[0.22em] text-2xl font-bold uppercase text-[#FAF7F0]">
                Aaranya Silks
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF7F0]/70 font-sans font-light leading-relaxed max-w-sm">
              A luxury Indian saree maison dedicated exclusively to pure handlooms, certified real gold zari, and timeless textile craftsmanship. Handcrafted in Varanasi, Kanchipuram, and Chanderi.
            </p>

            <div className="space-y-2 text-xs text-[#FAF7F0]/70 font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>Flagship Atelier: Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>Concierge & Bridal Styling: +91 98450 12890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>concierge@aaranyasilks.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#651C32] text-[#C8A96B] hover:text-white transition-colors border border-white/10"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#651C32] text-[#C8A96B] hover:text-white transition-colors border border-white/10"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Saree Collections */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96B]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F0]/75 font-light">
              <li>
                <button
                  onClick={() => navigateTo('catalog', undefined, 'Bridal Sarees')}
                  className="hover:text-[#C8A96B] transition-colors"
                >
                  Bridal Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', undefined, 'Silk Sarees')}
                  className="hover:text-[#C8A96B] transition-colors"
                >
                  Pure Silk Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', undefined, 'Banarasi Sarees')}
                  className="hover:text-[#C8A96B] transition-colors"
                >
                  Banarasi Kadhwa Brocades
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', undefined, 'Kanjivaram Sarees')}
                  className="hover:text-[#C8A96B] transition-colors"
                >
                  Kanjivaram Temple Weaves
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', undefined, 'Organza Sarees')}
                  className="hover:text-[#C8A96B] transition-colors"
                >
                  Organza Sheer Drapes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', undefined, 'Festive Sarees')}
                  className="hover:text-[#C8A96B] transition-colors"
                >
                  Festive Radiance
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96B]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F0]/75 font-light">
              <li>
                <button onClick={() => navigateTo('story')} className="hover:text-[#C8A96B] transition-colors">
                  Contact Our Atelier
                </button>
              </li>
              <li>
                <span className="text-[#FAF7F0]/75 hover:text-[#C8A96B] cursor-pointer">
                  Complimentary Fall & Pico
                </span>
              </li>
              <li>
                <span className="text-[#FAF7F0]/75 hover:text-[#C8A96B] cursor-pointer">
                  Domestic & Global Shipping
                </span>
              </li>
              <li>
                <span className="text-[#FAF7F0]/75 hover:text-[#C8A96B] cursor-pointer">
                  Silk Care & Preservation Guide
                </span>
              </li>
              <li>
                <span className="text-[#FAF7F0]/75 hover:text-[#C8A96B] cursor-pointer">
                  Certificate of Zari Authenticity
                </span>
              </li>
              <li>
                <span className="text-[#FAF7F0]/75 hover:text-[#C8A96B] cursor-pointer">
                  Track Your Consignment
                </span>
              </li>
            </ul>
          </div>

          {/* Assurance & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8A96B]">
              Heritage Assurance
            </h4>
            <div className="space-y-3 text-xs text-[#FAF7F0]/70 font-light">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                <span>100% Genuine Handlooms certified with Government Silk Mark</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                <span>Fully insured express air transit across India and 40+ countries</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-[#FAF7F0]/50 font-light">
              <p className="hover:text-[#C8A96B] cursor-pointer">Privacy & Cookie Policy</p>
              <p className="hover:text-[#C8A96B] cursor-pointer">Terms & Conditions of Sale</p>
              <p className="hover:text-[#C8A96B] cursor-pointer">Heirloom Guarantee & Returns</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Payment Methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F0]/50 font-light">
          <p>© {new Date().getFullYear()} Aaranya Silks. All Rights Reserved. Elegance Woven in Every Thread.</p>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-[#C8A96B]">
              UPI / QR
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-[#C8A96B]">
              Visa / Mastercard
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-[#C8A96B]">
              Net Banking
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-[#C8A96B]">
              Insured Air
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
