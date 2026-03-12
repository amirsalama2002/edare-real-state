import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, X, MapPin } from 'lucide-react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const communities = [
  { id: 1, nameKey: 'AlZorah', locationKey: 'AjmanCity', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'large', videoId: 'dQw4w9WgXcQ' },
  { id: 2, nameKey: 'AjmanCorniche', locationKey: 'SeaFront', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'small', videoId: 'dQw4w9WgXcQ' },
  { id: 3, nameKey: 'AlRawda', locationKey: 'Residential', image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'small', videoId: 'dQw4w9WgXcQ' },
  { id: 4, nameKey: 'AjmanHills', locationKey: 'LuxuryDistrict', image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260', size: 'medium', videoId: 'dQw4w9WgXcQ' }
];

const GlobalDiscoverSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  // دالة لجلب النصوص بأمان لتجنب الأخطاء
  const getText = (key) => {
    return t[key] || key;
  };

  return (
    <section className="bg-[#050505] py-24 px-6 md:px-20 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. العنوان (Header Style) */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 relative z-10">
        <div className="max-w-3xl text-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[1px] bg-[#c5a059]" />
            <span className="text-[rgb(197,160,89)] text-[10px] font-black uppercase tracking-[0.5em]">
              {getText('discover_badge')}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter"
          >
            {getText('exploreTitle')}
          </motion.h2>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="group relative border border-white/10 px-10 py-5 overflow-hidden transition-all duration-500"
        >
          <span className="relative z-10 text-[10px] font-black tracking-[0.3em] uppercase text-white group-hover:text-black">
            {getText('view_all')}
          </span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </motion.button>
      </div>

      {/* 2. شبكة العقارات (The Global Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[700px]">
        {communities.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            onClick={() => setActiveVideo(item.videoId)}
            className={`relative group overflow-hidden cursor-none rounded-[20px] shadow-2xl
              ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
              ${item.size === 'medium' ? 'md:col-span-2 md:row-span-1' : ''}
              ${item.size === 'small' ? 'md:col-span-1 md:row-span-1' : ''}`}
          >
            {/* Image مع Zoom Effect */}
            <img 
              src={item.image} 
              alt={getText(item.nameKey)} 
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
            
            {/* Play Button Overlay (يظهر عند الهوفر) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
               <div className="w-16 h-16 rounded-full bg-[#c5a059] flex items-center justify-center text-black shadow-2xl">
                  <Play fill="black" size={24} />
               </div>
            </div>

            {/* Content */}
            <div className={`absolute bottom-8 ${isRtl ? 'right-8 text-right' : 'left-8 text-left'} text-white z-10`}>
              <div className="flex items-center gap-2 mb-2 text-[#c5a059] translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <MapPin size={12} />
                <span className="text-[9px] font-black tracking-widest uppercase">
                  {getText(item.locationKey)}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase flex items-center gap-3 tracking-tighter">
                {getText(item.nameKey)}
                <ArrowUpRight size={20} className="text-[#c5a059] group-hover:rotate-45 transition-transform duration-500" />
              </h3>
            </div>

            {/* Custom Border Animation */}
            <div className="absolute inset-0 border-[0.5px] border-white/0 group-hover:border-white/20 transition-all duration-700 rounded-[20px] pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* 3. مشغل الفيديو (The Cinematic Portal) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setActiveVideo(null)} 
              className="absolute top-8 right-8 text-white hover:text-[#c5a059] transition-all"
            >
              <X size={48} strokeWidth={1} />
            </button>
            <motion.div 
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(197,160,89,0.2)]"
            >
               <iframe 
                 className="w-full h-full" 
                 src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} 
                 allow="autoplay; fullscreen"
                 title="Community Video"
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default GlobalDiscoverSection;