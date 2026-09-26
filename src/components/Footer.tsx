import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.9 },
        colors: ['#C8A96B', '#651C32', '#FAF7F0']
      });
    }
  };

  return (
    <footer className="bg-[#FAF7F0] text-[#1C1A19] pt-20 border-t border-[#C8A96B]/25 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Upper Navigation Grid matching Reference Video Frame 1255 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 text-left">
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-serif tracking-[0.2em] text-2xl font-bold uppercase text-[#651C32]">
              Aaranya Silks
            </h3>
            <p className="font-script text-2xl text-[#8B1E3F] leading-tight">
              Handwoven silks, draped for every celebration.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#1C1A19]">Shop</h4>
            <ul className="space-y-2 text-[#1C1A19]/75 font-light">
              <li><button onClick={() => navigateTo('catalog')} className="hover:text-[#651C32]">New arrivals</button></li>
              <li><button onClick={() => navigateTo('catalog', undefined, 'Silk Sarees')} className="hover:text-[#651C32]">Silk sarees</button></li>
              <li><button onClick={() => navigateTo('catalog', undefined, 'Bridal Sarees')} className="hover:text-[#651C32]">Bridal edit</button></li>
              <li><button onClick={() => navigateTo('catalog')} className="hover:text-[#651C32]">Best sellers</button></li>
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#1C1A19]">Explore</h4>
            <ul className="space-y-2 text-[#1C1A19]/75 font-light">
              <li><button onClick={() => navigateTo('story')} className="hover:text-[#651C32]">Our story</button></li>
              <li><button onClick={() => navigateTo('story')} className="hover:text-[#651C32]">Craftsmanship</button></li>
              <li><button onClick={() => navigateTo('catalog')} className="hover:text-[#651C32]">Lookbook</button></li>
              <li><span className="hover:text-[#651C32] cursor-pointer">Stores & Atelier</span></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#1C1A19]">Support</h4>
            <ul className="space-y-2 text-[#1C1A19]/75 font-light">
              <li><button onClick={() => navigateTo('story')} className="hover:text-[#651C32]">Contact us</button></li>
              <li><span className="hover:text-[#651C32] cursor-pointer">Shipping & delivery</span></li>
              <li><span className="hover:text-[#651C32] cursor-pointer">Returns & exchanges</span></li>
              <li><span className="hover:text-[#651C32] cursor-pointer">FAQs</span></li>
            </ul>
          </div>

          {/* Stay Updated Newsletter matching Frame 1255 */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#1C1A19]">Stay updated</h4>
            <p className="text-[11px] text-[#1C1A19]/70 font-light leading-relaxed">
              Subscribe for new collections, private offers, and styling notes from the atelier.
            </p>

            {subscribed ? (
              <p className="text-xs font-semibold text-[#651C32]">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-[#C8A96B]/40 text-xs focus:outline-none focus:border-[#651C32]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold tracking-wider transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Panoramic Bottom Graphic with Flying Silk Pallu matching Frame 1255 */}
      <div className="relative w-full overflow-hidden mt-6">
        {/* Floating Crimson Silk Ribbon Overlay */}
        <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10 opacity-70">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <path
              d="M-40,60 C280,120 480,-20 840,70 C1200,160 1360,10 1480,45"
              stroke="#8B1E3F"
              strokeWidth="48"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M-20,45 C300,105 500,-35 860,55 C1220,145 1380,-5 1500,30"
              stroke="#E5B842"
              strokeWidth="4"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Panoramic Photograph of Women in Silk Sarees */}
        <div className="w-full h-56 sm:h-72 md:h-80 relative">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
            alt="Aaranya Silks Heritage Gathering"
            className="w-full h-full object-cover object-center filter brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Legal / Copyright Bar inside the panoramic banner */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/70 text-[11px] font-light">
            <p>© {new Date().getFullYear()} Aaranya Silks. Handcrafted with pride in India.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Silk Mark Authenticity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
