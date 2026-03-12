import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const MotionLink = motion(Link);

const LuxuryEstateSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const { scrollYProgress } = useScroll();
  
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
    <section className="relative bg-[#080808] py-24 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. خلفية نصية متحركة - تم تصغيرها من 20vw إلى 12vw */}
      <motion.div 
        style={{ x: isRtl ? 200 : -200 }}
        animate={{ x: isRtl ? -200 : 200 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-0 whitespace-nowrap opacity-[0.02] select-none pointer-events-none"
      >
        <span className="text-[12vw] font-black text-white uppercase tracking-tighter">
          AJMAN LUXURY ESTATE • EMAAR LEVEL • BINGHATTI STYLE • 
        </span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* الجزء العلوي: العنوان - تم تصغيره من 9xl إلى 7xl */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[2px] w-12 bg-gradient-to-r from-yellow-600 to-yellow-200"></div>
            <span className="text-yellow-500 font-bold tracking-[0.3em] text-[10px] uppercase">
              {t.estateTag || "Luxury Estate"}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter"
          >
            {t.estateTitleLine1}<br/>
            <span className="stroke-text">{t.estateTitleLine2}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7">
            <motion.div style={{ scale, opacity }} className="relative group overflow-hidden rounded-tr-[80px] border-l-4 border-yellow-600">
              <img 
                src="https://gjproperties.ae/wp-content/uploads/2024/02/h5.png" 
                alt="Ajman Luxury Tower"
                className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* تصغير نصوص الصورة */}
              <div className={`absolute bottom-8 ${isRtl ? 'right-8' : 'left-8'}`}>
                <p className="text-white font-serif text-2xl italic">{t.towerName}</p>
                <p className="text-yellow-500 text-[10px] tracking-widest uppercase font-bold">{t.locationAjman}</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-8 mt-10 lg:mt-16">
            <motion.div style={{ x: isRtl ? xLeft : xRight }}>
              {/* تصغير الوصف من xl إلى base */}
              <p className="text-gray-400 text-base font-light leading-relaxed mb-8 border-r-2 border-yellow-600/30 pr-6">
                {t.estateDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { label: t.statLabel1, value: "AED 2.5M+" },
                  { label: t.statLabel2, value: "10% ROI" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="p-5 bg-white/5 border border-white/10 backdrop-blur-md"
                  >
                    {/* تصغير أرقام الإحصائيات من 3xl إلى 2xl */}
                    <p className="text-yellow-500 text-2xl font-black mb-1">{stat.value}</p>
                    <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <MotionLink
                to="/discover-Global-edara"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] overflow-hidden inline-block text-center shadow-xl cursor-pointer"
              >
                <span className="relative z-10 transition-colors duration-300">
                  {t?.discoverMore || 'Discover More'}
                </span>
                <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"></div>
              </MotionLink>
            </motion.div>
          </div>
        </div>
      </div>

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