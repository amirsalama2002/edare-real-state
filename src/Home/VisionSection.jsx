import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const VisionSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <section className="relative bg-[#050505] py-32 md:py-48 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 md:px-20 text-start">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* الجانب الأيسر: الصورة */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[500px] md:h-[700px] overflow-hidden rounded-sm shadow-2xl">
              <motion.img 
                style={{ y }}
                src="https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                className="absolute inset-0 w-full h-[120%] object-cover opacity-80"
                alt="Luxury Architecture"
              />
              <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none"></div>
            </div>
            
            {/* المربع العائم */}
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`absolute bottom-[-30px] ${isRtl ? 'left-[-20px]' : 'right-[-20px]'} bg-white p-8 md:p-12 shadow-2xl hidden md:block`}
            >
              <p className="text-black text-[10px] tracking-[0.3em] uppercase font-black mb-2">
                {t.mottoTag}
              </p>
              <p className="text-black font-serif text-2xl italic">
                {t.mottoText}
              </p>
            </motion.div>
          </div>

          {/* الجانب الأيمن: النصوص */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] tracking-[0.5em] text-gray-500 uppercase mb-6 block font-bold">
                {t.visionTag}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight tracking-tighter">
                {t.visionTitle}
              </h2>
              
              <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed">
                <p>{t.visionPara1}</p>
                <p>{t.visionPara2}</p>
              </div>

              {/* زر Call to Action */}
              <motion.div 
                className="mt-12 flex items-center gap-6"
                whileHover={{ x: isRtl ? -10 : 10 }}
              >
                <div className="h-[1px] w-16 bg-white/40"></div>
                <button className="text-white text-[10px] tracking-[0.3em] uppercase font-bold">
                   {t.about}
                </button>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionSection;