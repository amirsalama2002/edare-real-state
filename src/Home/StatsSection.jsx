import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const StatsSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  
  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  // بيانات الأرقام مربوطة بمفاتيح الترجمة
  const stats = [
    { id: 1, number: "25+", labelKey: "statYears" },
    { id: 2, number: "150+", labelKey: "statProjects" },
    { id: 3, number: "12K+", labelKey: "statFamilies" },
    { id: 4, number: "09", labelKey: "statCities" },
  ];

  return (
    <section className="relative bg-black py-32 overflow-hidden border-t border-white/5" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Watermark خلفية نصية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-[20vw] font-serif whitespace-nowrap text-white uppercase">
        {isRtl ? t.excellence : "EXCELLENCE"}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <h2 className="text-6xl md:text-8xl font-serif text-white mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                {stat.number}
              </h2>
              
              <div className="w-8 h-[1px] bg-white/30 mb-6 group-hover:w-16 group-hover:bg-white transition-all duration-500"></div>
              
              <p className="text-[10px] md:text-xs tracking-[0.4em] text-gray-400 uppercase font-bold leading-relaxed">
                {t[stat.labelKey]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer الخاص بالسكشن */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-32 text-center border-t border-white/10 pt-16"
        >
          <p className="text-gray-500 font-light text-lg mb-8 italic">
            {t.statsLegacyNote}
          </p>
          <button className="group flex items-center gap-4 mx-auto text-white text-[10px] tracking-[0.5em] uppercase hover:text-gray-400 transition-colors">
            {t.exploreBtn}
            <div className={`h-[1px] w-12 bg-white transition-all group-hover:w-20`}></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;