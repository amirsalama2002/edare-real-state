import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, X, MapPin } from 'lucide-react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const communities = [
  { id: 1, nameKey: 'AlZorah', locationKey: 'AjmanCity', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'large', videoId: 'M-j_LvEK2ZA' },
  { id: 2, nameKey: 'AjmanCorniche', locationKey: 'SeaFront', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'small', videoId: 'M-j_LvEK2ZA' },
  { id: 3, nameKey: 'AlRawda', locationKey: 'Residential', image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'small', videoId: 'M-j_LvEK2ZA' },
  { id: 4, nameKey: 'AjmanHills', locationKey: 'LuxuryDistrict', image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'medium', videoId: 'M-j_LvEK2ZA' }
];

const GlobalDiscoverSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';
  const getText = (key) => t[key] || key;

  return (
    /* التعديل هنا: أضفت pt-20 للموبايل و pt-40 للشاشات الكبيرة لنزول السكشن بالكامل */
    <section className="bg-[#050505] pt-20 md:pt-40 pb-16 md:pb-32 px-4 md:px-20 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8 relative z-10">
        <div className="max-w-4xl text-start">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-12 h-[1px] bg-[#c5a059]" />
            <span className="text-[#c5a059] text-xs font-bold uppercase tracking-[0.5em]">{getText('discover_badge')}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }} 
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]"
          >
            {getText('exploreTitle')}
          </motion.h2>
        </div>
        
        {/* <motion.button 
          whileTap={{ scale: 0.95 }}
          className="group relative border border-white/20 px-10 py-5 rounded-full md:rounded-none overflow-hidden transition-all duration-500 hover:border-white"
        >
          <span className="relative z-10 text-[10px] font-black tracking-[0.3em] uppercase text-white group-hover:text-black">
            {getText('view_all')}
          </span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </motion.button> */}
      </div>

      {/* 2. Professional Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-auto md:h-[800px]">
        {communities.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            onClick={() => setActiveVideo(item.videoId)}
            className={`relative group overflow-hidden cursor-pointer rounded-[32px] md:rounded-[48px] min-h-[350px] md:min-h-full shadow-2xl transition-all duration-700
              ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
              ${item.size === 'medium' ? 'md:col-span-2' : ''}`}
          >
            <img 
              src={item.image} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" 
              alt={getText(item.nameKey)}
            />
            
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-700
              ${idx === 0 ? 'opacity-90' : 'opacity-100 group-hover:opacity-70'}`} 
            />
            
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700
              ${idx === 0 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100'}`}
            >
               <div className={`relative flex items-center justify-center
                 ${idx === 0 ? 'animate-pulse' : ''}`}
               >
                  {idx === 0 && <div className="absolute inset-0 rounded-full bg-[#c5a059]/20 scale-[1.5] animate-ping" />}
                  
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#c5a059] flex items-center justify-center text-black shadow-[0_0_50px_rgba(197,160,89,0.4)] backdrop-blur-sm relative z-10">
                    <Play fill="black" size={idx === 0 ? 32 : 28} className={isRtl ? 'mr-1' : 'ml-1'} />
                  </div>
               </div>
            </div>

            <div className={`absolute bottom-8 md:bottom-12 ${isRtl ? 'right-8 md:right-12' : 'left-8 md:left-12'} text-white z-20`}>
              <div className="flex items-center gap-3 mb-4 text-[#c5a059]">
                <MapPin size={16} />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{getText(item.locationKey)}</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black uppercase flex items-center gap-4 tracking-tighter leading-none">
                {getText(item.nameKey)}
                <div className="w-10 h-10 rounded-full border border-white/20 hidden md:flex items-center justify-center group-hover:bg-[#c5a059] group-hover:border-[#c5a059] transition-all duration-500">
                  <ArrowUpRight size={20} className="group-hover:text-black transition-colors" />
                </div>
              </h3>
            </div>

            <div className="absolute inset-0 border border-white/5 rounded-[32px] md:rounded-[48px] pointer-events-none group-hover:border-white/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* 3. Cinematic Video Portal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl flex items-center justify-center"
            onClick={() => setActiveVideo(null)}
          >
            <motion.button 
              whileHover={{ rotate: 90, scale: 1.1 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white z-[1100]"
            >
              <X size={48} strokeWidth={1} />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full h-full md:h-auto md:w-[92%] max-w-7xl aspect-video bg-black shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden md:rounded-[40px]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                title="Property Video"
                allow="autoplay; fullscreen"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GlobalDiscoverSection;