import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';
import { Server, ShieldCheck, Zap, Globe } from 'lucide-react';

const ServerSection = () => {
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
          
          {/* الجانب الأيسر: الصورة التقنية */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[500px] md:h-[700px] overflow-hidden rounded-sm shadow-2xl bg-[#0a0a0a] border border-white/5">
              <motion.img 
                style={{ y }}
                src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                className="absolute inset-0 w-full h-[120%] object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                alt="Datacenter Infrastructure"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            
            {/* المربع العائم - حالة النظام */}
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`absolute bottom-[-30px] ${isRtl ? 'left-[-20px]' : 'right-[-20px]'} bg-white p-8 md:p-10 shadow-2xl hidden md:block`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-black text-[10px] tracking-[0.3em] uppercase font-black">
                  {t.serverStatus}
                </p>
              </div>
              <p className="text-black font-serif text-2xl italic">
                {t.serverMotto}
              </p>
            </motion.div>
          </div>

          {/* الجانب الأيمن: المحتوى */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] tracking-[0.5em] text-blue-500 uppercase mb-6 block font-bold">
                {t.serverTag}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight tracking-tighter">
                {t.serverTitle}
              </h2>
              
              <div className="space-y-8">
                {/* مميزات السيرفر */}
                <div className="flex gap-6 items-start">
                  <ShieldCheck className="text-white/40 mt-1" size={24} />
                  <div>
                    <h4 className="text-white text-sm uppercase tracking-widest font-bold mb-2">{t.secureTitle}</h4>
                    <p className="text-gray-400 font-light leading-relaxed">{t.secureDesc}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <Zap className="text-white/40 mt-1" size={24} />
                  <div>
                    <h4 className="text-white text-sm uppercase tracking-widest font-bold mb-2">{t.speedTitle}</h4>
                    <p className="text-gray-400 font-light leading-relaxed">{t.speedDesc}</p>
                  </div>
                </div>
              </div>

              {/* زر التواصل */}
              <motion.div 
                className="mt-16 flex items-center gap-6"
                whileHover={{ x: isRtl ? -10 : 10 }}
              >
                <div className="h-[1px] w-16 bg-white/40"></div>
                <button className="text-white text-[10px] tracking-[0.3em] uppercase font-bold hover:text-blue-400 transition-colors">
                   {t.serverContact}
                </button>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServerSection;