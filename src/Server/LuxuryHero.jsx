import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';
import RegisterModal from '../components/RegisterModal'; 

const LuxuryHero = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. Split Background - الجزء المتحرك من الخلفية */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        <motion.div 
          initial={{ x: isRtl ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full md:w-1/2 h-full overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000" 
            className="absolute inset-0 h-full w-full object-cover scale-110 grayscale-[30%]"
            alt="Luxury"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
        <div className="hidden md:block w-1/2 h-full bg-[#050505]"></div>
      </div>

      {/* 2. Floating Elements - عناصر ديكورية لجذب العين */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-20 ${isRtl ? 'left-20' : 'right-20'} w-64 h-64 border border-white/5 rounded-full blur-3xl bg-yellow-600/10 pointer-events-none`}
      />

      {/* 3. Main Content Content Content */}
      <div className="relative z-10 container mx-auto h-full flex items-center px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-12">
          
          <div className="lg:col-span-8">
            {/* التاج الصغير مع حركة Slide-In */}
            <div className="overflow-hidden mb-4">
              <motion.p 
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-yellow-500 font-black text-[10px] tracking-[0.6em] uppercase flex items-center gap-4"
              >
                <span className="w-10 h-[1px] bg-yellow-500"></span>
                {t.heroTag}
              </motion.p>
            </div>

            {/* العنوان بأسلوب الطبقات المتداخلة */}
            <h1 className="relative text-white font-black leading-[0.9] text-5xl md:text-[8vw] uppercase">
              <motion.span 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="block"
              >
                {t.heroTitleLine1}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="block text-transparent stroke-text-gold italic font-serif py-2"
              >
                {t.heroTitleLine2}
              </motion.span>
            </h1>

            {/* الوصف القصير والأزرار */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-10"
            >
              <p className="max-w-xs text-gray-400 font-light text-sm border-l border-white/20 pl-4">
                {t.heroDesc}
              </p>

              <div className="flex gap-4">
                <button className="relative group px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all duration-500">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">{t.discoverBtn}</span>
                  <div className="absolute inset-0 bg-yellow-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
                >
                  {t.contactBtn}
                </button>
              </div>
            </motion.div>
          </div>

          {/* الجانب الأيمن: إحصائيات بصرية (Vertical Stats) */}
          <div className="hidden lg:col-span-4 lg:flex flex-col items-end gap-12">
            {[
              { num: "01", label: isRtl ? "موقع استراتيجي" : "Prime Location" },
              { num: "02", label: isRtl ? "تصميم عصري" : "Modern Design" },
              { num: "03", label: isRtl ? "عائد مرتفع" : "High ROI" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + (i * 0.2) }}
                className="text-right group cursor-default"
              >
                <p className="text-yellow-500 font-black text-2xl mb-1 group-hover:scale-110 transition-transform">{stat.num}</p>
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* 4. Bottom Decor - خطوط المعمارية */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600/50 via-transparent to-transparent"></div>

      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text-gold {
          -webkit-text-stroke: 1px rgba(234, 179, 8, 0.4);
          color: transparent;
        }
      `}} />
    </section>
  );
};

export default LuxuryHero;