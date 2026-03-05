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
        toast.success(isRTL ? "تم التسجيل بنجاح" : "Registered successfully");
        onClose();
      } else throw new Error();
    } catch {
      toast.error(isRTL ? "حدث خطأ ما" : "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-[550px] bg-[#1a1a1a] p-10 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* زر الإغلاق - مكانه يتغير حسب اللغة */}
            <button 
              onClick={onClose} 
              className={`absolute top-8 ${isRTL ? 'left-8' : 'right-8'} text-white/40 hover:text-white transition-colors`}
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* العنوان - مرتبط بكلمة register في الـ JSON */}
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center tracking-tight italic">
              {t('register')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* الاسم الكامل */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold block">
                  {isRTL ? "الاسم الكامل" : "FULL NAME"} <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  required
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white text-sm focus:border-white outline-none transition-all duration-500"
                />
              </div>

              {/* البريد الإلكتروني */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold block">
                  {isRTL ? "البريد الإلكتروني" : "EMAIL"} <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white text-sm focus:border-white outline-none transition-all duration-500"
                />
              </div>

              {/* كود الدولة ورقم الهاتف */}
              <div className="flex gap-8">
                <div className="w-[120px] space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold block">
                    {isRTL ? "الكود" : "CODE"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="countryCode"
                    defaultValue="+971"
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white text-sm outline-none focus:border-white transition-all duration-500"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold block">
                    {isRTL ? "رقم الهاتف" : "PHONE NUMBER"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="7400123456"
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white text-sm focus:border-white outline-none transition-all duration-500 placeholder:text-white/5"
                  />
                </div>
              </div>

              {/* زر الإرسال */}
              <div className="pt-4">
                <button
                  disabled={loading}
                  className="w-full bg-transparent border border-white/20 text-white py-5 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 disabled:opacity-30"
                >
                  {loading ? "..." : (isRTL ? "إرسال" : "SUBMIT")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}