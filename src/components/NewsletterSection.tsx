import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate reliable subscription
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#C8A96B', '#8B1E3F', '#FAF7F0']
      });
    }, 600);
  };

  return (
    <section className="py-20 md:py-28 bg-[#651C32] text-[#FAF7F0] relative overflow-hidden">
      {/* Decorative background embellishment */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,169,107,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#561428]/75 backdrop-blur-md border border-[#C8A96B]/35 hover:border-[#C8A96B]/80 rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-xl hover:shadow-[0_22px_50px_rgba(200,169,107,0.22)] hover:-translate-y-1 hover:scale-[1.012] transition-all duration-500 group relative overflow-hidden"
        >
          {/* Subtle gold sheen reflex */}
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-[#C8A96B]/15 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

          <div className="inline-flex items-center gap-2 text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>The Atelier Dispatch</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7F0] tracking-tight leading-tight mb-4">
            Letters of Elegance
          </h2>

          <p className="text-sm sm:text-base text-[#FAF7F0]/85 font-sans font-light leading-relaxed max-w-xl mx-auto mb-9">
            Discover new collections, timeless styling inspiration, and exclusive updates from Aaranya Silks. Enjoy 10% privilege on your debut saree.
          </p>

          {status === 'success' ? (
            <div className="bg-[#FAF7F0]/10 border border-[#C8A96B]/50 p-6 rounded-2xl max-w-md mx-auto text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#C8A96B] mx-auto" />
              <h4 className="font-serif text-xl font-medium text-[#FAF7F0]">
                Welcome to the Aaranya Circle
              </h4>
              <p className="text-xs text-[#FAF7F0]/80 font-light">
                Your debut privilege code <span className="font-mono font-bold text-[#C8A96B]">AARANYA10</span> has been unlocked in your shopping bag.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative z-10">
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#C8A96B] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#FAF7F0]/10 border border-[#C8A96B]/30 focus:border-[#C8A96B] text-white placeholder-white/50 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] transition-all"
                    disabled={status === 'loading'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group/btn flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C8A96B] hover:bg-[#DFC89B] text-[#1C1A19] font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl shrink-0"
                >
                  <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {status === 'error' && (
                <p className="text-xs text-rose-300 mt-2.5 text-left pl-4 font-light">
                  {errorMessage}
                </p>
              )}

              <p className="text-[11px] text-[#FAF7F0]/60 font-light mt-4">
                We respect your privacy. Unsubscribe anytime with one tap.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
