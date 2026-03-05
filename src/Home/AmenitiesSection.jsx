import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palmtree, Waves, ShieldCheck, Coffee } from 'lucide-react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const amenitiesData = [
  { id: 1, icon: <Waves size={32} />, titleKey: "amenity1Title", descKey: "amenity1Desc" },
  { id: 2, icon: <Palmtree size={32} />, titleKey: "amenity2Title", descKey: "amenity2Desc" },
  { id: 3, icon: <ShieldCheck size={32} />, titleKey: "amenity3Title", descKey: "amenity3Desc" },
  { id: 4, icon: <Coffee size={32} />, titleKey: "amenity4Title", descKey: "amenity4Desc" }
];

const AmenitiesSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  
  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <section className="bg-black py-24 md:py-32 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10 text-start">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-500 text-[10px] tracking-[0.4em] uppercase font-black mb-4"
            >
              {t.amenitiesTag}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-white leading-tight"
            >
              {t.amenitiesTitle}
            </motion.h2>
          </div>
          <motion.p 
            className="text-gray-400 max-w-sm font-light text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {t.amenitiesDesc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenitiesData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 p-10 backdrop-blur-sm rounded-sm hover:bg-white/10 transition-all duration-500 group text-start"
            >
              <div className="text-blue-500 mb-8 group-hover:scale-110 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-4">
                {t[item.titleKey]}
              </h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {t[item.descKey]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;