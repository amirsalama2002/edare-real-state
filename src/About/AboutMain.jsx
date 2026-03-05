import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const AboutMain = () => {
  // قراءة اللغة الابتدائية
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');

  useEffect(() => {
    // وظيفة لتحديث اللغة
    const updateLang = () => {
      const currentLang = localStorage.getItem('appLang') || 'en';
      setLang(currentLang);
    };

    // 1. مراقبة التغييرات من تبويبات أخرى
    window.addEventListener('storage', updateLang);

    // 2. حل مشكلة التزامن: مراقبة التغيير في نفس التبويب باستخدام Interval بسيط
    // ده بيضمن إن أي تغيير في الـ LocalStorage يتسمع هنا فوراً
    const interval = setInterval(updateLang, 500);

    return () => {
      window.removeEventListener('storage', updateLang);
      clearInterval(interval);
    };
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <main 
      className={`bg-black text-white min-h-screen ${isRtl ? 'font-serif-ar' : 'font-sans'}`} 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            key={lang} // إضافة الـ key هنا بتخلي الأنيميشن يعيد نفسه لما اللغة تتغير
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-amber-500 tracking-[0.4em] text-xs font-bold uppercase block">
              {t.aboutSectionTag}
            </span>
            <h2 className={`text-4xl md:text-7xl leading-[1.1] ${isRtl ? 'font-bold' : 'font-serif'}`}>
              {t.aboutMainTitle}
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              {t.aboutDescription}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h4 className="text-white font-bold mb-2">{t.aboutMissionTitle}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{t.aboutMissionDesc}</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2">{t.aboutVisionTitle}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{t.aboutVisionDesc}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000" 
                alt="Luxury Real Estate" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className={`absolute bottom-10 ${isRtl ? 'left-10' : 'right-10'} bg-white text-black p-8 hidden md:block shadow-2xl`}>
              <p className={`text-2xl italic ${isRtl ? 'font-bold' : 'font-serif'}`}>
                "{t.mottoText}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutMain;