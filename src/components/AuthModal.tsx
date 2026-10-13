import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, ShieldCheck, ArrowRight, CheckCircle2, RotateCw, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { shopService } from '../services/shopService';

export const AuthModal: React.FC = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    setUser,
    showToast,
    onAuthSuccessAction,
    setOnAuthSuccessAction,
  } = useShop();

  const [authMethod, setAuthMethod] = useState<'email' | 'mobile'>('email');
  const [step, setStep] = useState<'input' | 'otp' | 'recovery'>('input');

  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [otpInput, setOtpInput] = useState('');

  const [simulatedDemoCode, setSimulatedDemoCode] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);
  const canResend = timer === 0;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  if (!isAuthOpen) return null;

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const target = authMethod === 'email' ? emailInput : phoneInput;
    const res = shopService.requestOtp(target, authMethod);

    setTimeout(() => {
      setIsSubmitting(false);
      if (res.success) {
        setSimulatedDemoCode(res.demoCode || '123456');
        setStep('otp');
        setTimer(60);
        setOtpInput(res.demoCode || '');
      } else {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const res = shopService.verifyOtp(otpInput, nameInput.trim() || undefined);

      if (res.success && res.user) {
        setUser(res.user);
        showToast(res.message, 'success');
        setIsAuthOpen(false);
        resetState();

        // Execute any pending deferred action (such as opening checkout)
        if (onAuthSuccessAction) {
          onAuthSuccessAction();
          setOnAuthSuccessAction(null);
        }
      } else {
        setErrorMessage(res.message);
      }
    }, 450);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setErrorMessage(null);
    const target = authMethod === 'email' ? emailInput : phoneInput;
    const res = shopService.requestOtp(target, authMethod);
    if (res.success) {
      setSimulatedDemoCode(res.demoCode || '123456');
      setOtpInput(res.demoCode || '');
      setTimer(60);
      showToast('New verification code sent', 'info');
    }
  };

  const resetState = () => {
    setStep('input');
    setOtpInput('');
    setErrorMessage(null);
    setSimulatedDemoCode(null);
  };

  const handleClose = () => {
    setIsAuthOpen(false);
    resetState();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C8A96B]/35 z-10 my-auto text-left"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#C8A96B]/25 flex items-center justify-between bg-[#F2EBDD]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#651C32] text-[#C8A96B] flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#651C32]">
                  Aaranya Silks Patron Access
                </h3>
                <p className="text-[11px] text-[#1C1A19]/60 font-light">
                  {step === 'input' && 'Sign in or create your patron account'}
                  {step === 'otp' && 'Enter your verification code'}
                  {step === 'recovery' && 'Account & order recovery'}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1A19] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            {/* Step 1: Input method and credentials */}
            {step === 'input' && (
              <>
                {/* Method selector tabs */}
                <div className="flex p-1 bg-[#F2EBDD] rounded-2xl border border-[#C8A96B]/30">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('email');
                      setErrorMessage(null);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      authMethod === 'email'
                        ? 'bg-[#651C32] text-[#FAF7F0] shadow-sm'
                        : 'text-[#1C1A19]/70 hover:text-[#651C32]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email OTP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('mobile');
                      setErrorMessage(null);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      authMethod === 'mobile'
                        ? 'bg-[#651C32] text-[#FAF7F0] shadow-sm'
                        : 'text-[#1C1A19]/70 hover:text-[#651C32]'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Mobile OTP</span>
                  </button>
                </div>

                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                      Full Name (Optional for first-time patrons)
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Radhika Rao"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/35 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                    />
                  </div>

                  {authMethod === 'email' ? (
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        Email Address *
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-[#8B1E3F] absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="radhika.rao@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/35 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                        Mobile Number *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-xs font-semibold text-[#8B1E3F] pointer-events-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="98450 12890"
                          className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-white border border-[#C8A96B]/35 text-xs text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                        />
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Dispatching OTP...' : 'Send Verification OTP'}</span>
                    <ArrowRight className="w-4 h-4 text-[#C8A96B]" />
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setStep('recovery')}
                      className="text-xs text-[#8B1E3F] hover:underline"
                    >
                      Trouble signing in? Recover account access
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 rounded-xl bg-[#F2EBDD] border border-[#C8A96B]/30 text-xs text-[#1C1A19]/80">
                  <p>
                    Verification code sent to{' '}
                    <strong className="text-[#651C32]">
                      {authMethod === 'email' ? emailInput : `+91 ${phoneInput}`}
                    </strong>
                  </p>
                  {simulatedDemoCode && (
                    <div className="mt-2 pt-2 border-t border-[#C8A96B]/20 flex items-center justify-between">
                      <span className="text-[11px] text-[#8B1E3F] font-semibold">
                        Simulated OTP for Demo:
                      </span>
                      <strong className="font-mono text-sm tracking-widest text-[#651C32] bg-white px-2 py-0.5 rounded border border-[#C8A96B]/30">
                        {simulatedDemoCode}
                      </strong>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1A19]/80 mb-1">
                    Enter 6-Digit Verification Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full text-center tracking-[0.4em] font-mono text-lg py-2.5 rounded-xl bg-white border border-[#C8A96B]/35 text-[#1C1A19] focus:outline-none focus:border-[#651C32]"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[#1C1A19]/70">
                  <span>
                    {timer > 0 ? (
                      `Resend in ${timer}s`
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-[#8B1E3F] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Resend OTP</span>
                      </button>
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={() => setStep('input')}
                    className="text-[#1C1A19]/60 hover:text-[#651C32] hover:underline"
                  >
                    Change contact
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={otpInput.length < 6 || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#651C32] hover:bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C8A96B]" />
                  <span>{isSubmitting ? 'Verifying...' : 'Verify & Continue'}</span>
                </button>
              </form>
            )}

            {/* Step 3: Recovery */}
            {step === 'recovery' && (
              <div className="space-y-4 text-xs text-[#1C1A19]/80">
                <div className="p-3 rounded-xl bg-[#F2EBDD] border border-[#C8A96B]/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#651C32] font-semibold">
                    <Lock className="w-4 h-4" />
                    <span>Account & Past Orders Recovery</span>
                  </div>
                  <p>
                    Enter your registered email address or phone number. We will send a secure one-time passcode to instantly restore your verified sessions, past purchases, and saved sarees.
                  </p>
                </div>

                <button
                  onClick={() => setStep('input')}
                  className="w-full py-2.5 rounded-full bg-[#651C32] text-white font-semibold uppercase tracking-wider"
                >
                  Return to Sign In
                </button>
              </div>
            )}

            {/* Privacy and assurance */}
            <div className="pt-2 border-t border-[#C8A96B]/20 flex items-center justify-between text-[10px] text-[#1C1A19]/50">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C8A96B]" />
                <span>Zero-Password Secure OTP Session</span>
              </span>
              <span>256-Bit SSL Protection</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
