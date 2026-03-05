import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const communities = [
  { id: 1, nameKey: 'Marassi', locationKey: 'NorthCoast', image: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'large' },
  { id: 2, nameKey: 'Mivida', locationKey: 'NewCairo', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'small' },
  { id: 3, nameKey: 'UptownCairo', locationKey: 'Mokattam', image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'small' },
  { id: 4, nameKey: 'Soul', locationKey: 'NorthCoast', image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'medium' }
];

const CommunitiesSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  
  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl text-start">
          <motion.h2 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            {t.exploreTitle}
          </motion.h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            {t.exploreDesc}
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="border border-white/20 px-8 py-4 text-[10px] tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-500"
        >
          {t.communities}
        </motion.button>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
        {communities.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative group overflow-hidden cursor-pointer rounded-sm min-h-[300px]
              ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
              ${item.size === 'medium' ? 'md:col-span-2 md:row-span-1' : ''}
              ${item.size === 'small' ? 'md:col-span-1 md:row-span-1' : ''}`}
          >
            {/* Image */}
            <img 
              src={item.image} 
              alt={t[item.nameKey]} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

            {/* Content */}
            <div className={`absolute bottom-8 ${isRtl ? 'right-8 text-right' : 'left-8 text-left'} text-white`}>
              <p className="text-[9px] tracking-[0.2em] text-gray-300 uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {t[item.locationKey]}
              </p>
              <h3 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
                {t[item.nameKey]}
                <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0 duration-500" />
              </h3>
            </div>

            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CommunitiesSection;