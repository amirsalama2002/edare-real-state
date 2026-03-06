import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const BinghattiStyleServer = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* خلفية نصية ضخمة (Watermark) تشبه لمسات بن غاطي */}
      <div className={`absolute top-10 ${isRtl ? 'right-[-5%]' : 'left-[-5%]'} select-none pointer-events-none opacity-[0.03]`}>
        <h1 className="text-[15vw] font-black text-white leading-none uppercase">
          INFRASTRUCTURE
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* الجانب الأيمن: النصوص (التركيز على Bold Typography) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-orange-600"></div> {/* لمسة لون بن غاطي الشهير */}
                <span className="text-orange-600 font-black tracking-[0.4em] text-xs uppercase">
                  {t.serverTag}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95] uppercase tracking-tighter">
                {t.serverTitle}
              </h2>

              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-md">
                {t.serverDescMain}
              </p>

              {/* شبكة الأرقام (Stats Grid) */}
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div>
                  <h3 className="text-white text-3xl font-black mb-1">99.9%</h3>
                  <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">{t.uptime}</p>
                </div>
                <div>
                  <h3 className="text-white text-3xl font-black mb-1">256-BIT</h3>
                  <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">{t.encryption}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* الجانب الأيسر: الصورة (زوايا حادة وتصميم معماري) */}
          <div className="lg:col-span-7 relative mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative group"
            >
              {/* إطار هندسي خلف الصورة */}
              <div className={`absolute top-[-20px] ${isRtl ? 'right-[-20px]' : 'left-[-20px]'} w-full h-full border border-orange-600/30 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500`}></div>
              
              <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border-l-8 border-orange-600">
                <img 
                  src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Server Infrastructure" 
                  className="w-full h-[500px] md:h-[650px] object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
                {/* Overlay متدرج */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              </div>

              {/* كارت المعلومات العائم (Floating Info) */}
              <motion.div 
                whileHover={{ y: -10 }}
                className={`absolute bottom-10 ${isRtl ? 'left-[-40px]' : 'right-[-40px]'} bg-orange-600 p-8 md:p-12 shadow-[20px_20px_0px_rgba(0,0,0,1)] hidden md:block`}
              >
                <p className="text-white font-black text-4xl mb-2 leading-none tracking-tighter uppercase">
                  AJMAN<br/>DC-ONE
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">{t.serverStatus}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BinghattiStyleServer;