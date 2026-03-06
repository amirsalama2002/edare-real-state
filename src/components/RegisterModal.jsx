import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function RegisterModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+971",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: `New Interest - ${t('company')}`,
          access_key: "427a63d8-28bd-422e-a814-7323aa64496a",
        }),
      }).then((r) => r.json());

      if (res.success) {
        toast.success(t('success'));
        onClose();
      } else throw new Error();
    } catch {
      toast.error(t('error'));
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Overlay - خلفية زجاجية داكنة */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-[500px] bg-[#0d0d0d] p-10 md:p-14 border border-white/10"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} text-white/30 hover:text-white transition-all duration-300 hover:rotate-90`}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight italic">
                {t('register')}
              </h2>
              <div className="h-[1px] w-12 bg-white/20 mx-auto mt-4" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="group relative">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold mb-2 block">
                  {t('fullName')}
                </label>
                <input
                  name="name"
                  required
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white text-sm focus:border-white outline-none transition-colors duration-500 placeholder:opacity-20 font-light"
                />
              </div>

              {/* Email Field */}
              <div className="group relative">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold mb-2 block">
                  {t('email')}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white text-sm focus:border-white outline-none transition-colors duration-500 font-light"
                />
              </div>

              {/* Phone Grid */}
              <div className="flex gap-6">
                <div className="w-[100px]">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold mb-2 block">
                    {t('code')}
                  </label>
                  <input
                    name="countryCode"
                    defaultValue="+971"
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white text-sm outline-none focus:border-white transition-colors duration-500 font-light"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold mb-2 block">
                    {t('phone')}
                  </label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="5x xxx xxxx"
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white text-sm focus:border-white outline-none transition-colors duration-500 placeholder:text-white/5 font-light"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  disabled={loading}
                  className="relative w-full group overflow-hidden bg-white py-4 text-black text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-500 hover:tracking-[0.6em]"
                >
                  <span className="relative z-10">
                    {loading ? t('sending') : t('submit')}
                  </span>
                  
                  {/* Hover Effect Layer */}
                  <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </form>

            {/* Subtle Footer Note */}
            <p className="mt-8 text-[8px] text-white/20 text-center uppercase tracking-widest leading-relaxed">
              {isRTL 
                ? "بالضغط على إرسال، أنت توافق على سياسة الخصوصية الخاصة بنا" 
                : "By submitting, you agree to our privacy policy"}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}