import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const VisionaryTeam = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  
  useEffect(() => {
    const checkLang = setInterval(() => {
      const currentLang = localStorage.getItem('appLang') || 'en';
      if (currentLang !== lang) setLang(currentLang);
    }, 500);
    return () => clearInterval(checkLang);
  }, [lang]);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* عنصر ديكوري: دائرة ضوئية عملاقة في الخلفية */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* الجانب الأول: فلسفة الشركة */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-yellow-500 font-bold text-[10px] tracking-[0.6em] uppercase block mb-6">
              {t.aboutTag}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase mb-8">
              {t.aboutTitle.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-transparent stroke-text-gold italic font-serif">
                {t.aboutTitle.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl mb-10 border-l-2 border-yellow-600/20 pl-6">
              {t.aboutDesc}
            </p>

            {/* القيم الجوهرية (Mini Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[t.values1, t.values2, t.values3].map((val, i) => (
                <div key={i} className="group cursor-default">
                  <div className="h-[1px] w-full bg-white/10 group-hover:bg-yellow-600 transition-colors mb-4"></div>
                  <p className="text-[10px] text-white/40 group-hover:text-white font-bold uppercase tracking-widest transition-colors">
                    {val}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* الجانب الثاني: التيم (تصميم تجريدي فني) */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative z-10 p-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-sm">
              <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">
                {t.teamTitle}
              </h3>
              <p className="text-gray-400 font-light mb-8 italic">
                "{t.teamDesc}"
              </p>
              
              {/* تمثيل تجريدي للتيم (دوائر فنية أو صور باهتة) */}
              <div className="flex -space-x-4 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((_, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10, scale: 1.1 }}
                    className="w-16 h-16 rounded-full border-2 border-[#050505] bg-neutral-800 overflow-hidden"
                  >
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                      alt="Team Member" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                    />
                  </motion.div>
                ))}
                <div className="w-16 h-16 rounded-full border-2 border-[#050505] bg-yellow-600 flex items-center justify-center text-black font-black text-xs cursor-pointer">
                  +25
                </div>
              </div>

              {/* اقتباس ختامي */}
              <div className="mt-12 pt-8 border-t border-white/5 text-[10px] text-white/30 uppercase tracking-[0.3em]">
                Excellence is not an act, but a habit.
              </div>
            </div>

            {/* عناصر هندسية خلف الكرت */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-yellow-600/20 -z-10"></div>
          </motion.div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text-gold {
          -webkit-text-stroke: 1px rgba(234, 179, 8, 0.4);
          color: transparent;
        }
      `}} />
    </section>
  );
};

export default VisionaryTeam;