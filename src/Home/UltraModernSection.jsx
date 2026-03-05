import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const UltraModernSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(handleStorageChange, 500);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';
  
  const springX = useSpring(mousePos.x, { stiffness: 50, damping: 30 });
  const springY = useSpring(mousePos.y, { stiffness: 50, damping: 30 });

  return (
    <section className="relative min-h-[120vh] bg-white text-black overflow-hidden flex items-center justify-center py-20">
      
      {/* Watermark Logo الخلفية */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none"
      >
        <h1 className="text-[40vw] font-serif whitespace-nowrap uppercase">
            {t.company}
        </h1>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-start">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* الجانب الأول: معرض الصور */}
          <div className="relative w-full lg:w-1/2 h-[500px] md:h-[700px]">
            <motion.div 
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-0 w-full h-full z-10"
            >
              <img 
                src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Architecture"
              />
            </motion.div>

            <motion.div 
              style={{ x: springX, y: springY }}
              className={`absolute -bottom-10 ${isRtl ? '-right-10' : '-left-10'} w-64 h-80 z-20 border-[15px] border-white shadow-2xl hidden md:block`}
            >
              <img 
                src="https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                className="w-full h-full object-cover"
                alt="Detail"
              />
            </motion.div>
          </div>

          {/* الجانب الثاني: المحتوى */}
          <div className="w-full lg:w-1/2" dir={isRtl ? 'rtl' : 'ltr'}>
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-6xl md:text-8xl font-serif leading-none mb-12 tracking-tighter">
                {t.ultraCrafting} <br />
                <span className="text-gray-400 italic">
                    {t.ultraImpossible}
                </span>
              </h2>

              <div className="flex gap-8 mb-12">
                <div className="w-[1px] h-32 bg-black/20" />
                <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed max-w-md">
                   {t.ultraDescription}
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center px-10 py-5 bg-black text-white rounded-full overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase font-bold">
                    {t.ultraDiscoverBtn}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                />
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* الأرقام التسلسلية الجانبية */}
      <div className={`absolute bottom-20 ${isRtl ? 'left-10' : 'right-10'} flex flex-col gap-2`}>
        <span className="text-[10px] font-bold tracking-widest text-black/20 uppercase">01 — {t.ultraStep1}</span>
        <span className="text-[10px] font-bold tracking-widest text-black/100 uppercase">02 — {t.ultraStep2}</span>
        <span className="text-[10px] font-bold tracking-widest text-black/20 uppercase">03 — {t.ultraStep3}</span>
      </div>
    </section>
  );
};

export default UltraModernSection;