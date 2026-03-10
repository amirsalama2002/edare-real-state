import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const LuxuryEstateSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const { scrollYProgress } = useScroll();
  
  // تأثيرات الحركة عند التمرير
  const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const xLeft = useTransform(scrollYProgress, [0.4, 0.6], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <section className="relative bg-[#080808] py-32 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* خلفية نصية متحركة ضخمة */}
      <motion.div 
        style={{ x: isRtl ? 200 : -200 }}
        animate={{ x: isRtl ? -200 : 200 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-0 whitespace-nowrap opacity-[0.02] select-none pointer-events-none"
      >
        <span className="text-[20vw] font-black text-white uppercase">AJMAN LUXURY ESTATE • EMAAR LEVEL • BINGHATTI STYLE • </span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* الجزء العلوي: العنوان بأسلوب بن غاطي العريض */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[3px] w-20 bg-gold-500 bg-gradient-to-r from-yellow-600 to-yellow-200"></div>
            <span className="text-yellow-500 font-bold tracking-[0.5em] text-xs uppercase">{t.estateTag}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-9xl font-black text-white leading-[0.85] uppercase tracking-tighter"
          >
            {t.estateTitleLine1}<br/>
            <span className="text-transparent stroke-text">{t.estateTitleLine2}</span>
          </motion.h2>
        </div>

        {/* شبكة العرض المستوحاة من إعمار */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* الجانب الأيمن: صورة ببارالاكس */}
          <div className="lg:col-span-7">
            <motion.div style={{ scale, opacity }} className="relative group overflow-hidden rounded-tr-[100px] border-l-4 border-yellow-600">
              <img 
                src="https://gjproperties.ae/wp-content/uploads/2024/02/h5.png" 
                alt="Ajman Luxury Tower"
                className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* تفاصيل عائمة على الصورة */}
              <div className={`absolute bottom-10 ${isRtl ? 'right-10' : 'left-10'}`}>
                <p className="text-white font-serif text-3xl italic">{t.towerName}</p>
                <p className="text-yellow-500 text-sm tracking-widest uppercase font-bold">{t.locationAjman}</p>
              </div>
            </motion.div>
          </div>

          {/* الجانب الأيسر: الوصف والأرقام */}
          <div className="lg:col-span-5 space-y-12 mt-10 lg:mt-20">
            <motion.div style={{ x: isRtl ? xLeft : xRight }}>
              <p className="text-gray-400 text-xl font-light leading-relaxed mb-10 border-r-2 border-yellow-600/30 pr-6">
                {t.estateDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                {[
                  { label: t.statLabel1, value: "AED 2.5M+" },
                  { label: t.statLabel2, value: "10% ROI" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white/5 border border-white/10 backdrop-blur-md"
                  >
                    <p className="text-yellow-500 text-3xl font-black mb-2">{stat.value}</p>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* زر الأكشن بأسلوب فخم */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] overflow-hidden"
            >
              <span className="relative z-10">{t.discoverMore}</span>
              <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
          </div>

        </div>
      </div>

      {/* إضافة CSS خاص بالنص المفرغ (Stroke Text) */}
      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }
      `}} />
    </section>
  );
};

export default LuxuryEstateSection;