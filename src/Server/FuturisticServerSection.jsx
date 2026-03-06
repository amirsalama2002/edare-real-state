import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const FuturisticServerSection = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
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

  return (
    <section className="relative min-h-screen bg-[#020202] py-24 flex items-center justify-center overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* تأثير الإضاءة التفاعلي خلف المحتوى */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* عناصر ديكورية متحركة في الخلفية */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* العنوان الخيالي */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 border border-blue-500/30 rounded-full bg-blue-500/5 backdrop-blur-md"
            >
              <span className="text-blue-400 text-[10px] tracking-[0.5em] font-bold uppercase">
                {t.ultraTag}
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">
              {t.ultraTitle}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {t.ultraDesc}
            </p>
          </div>

          {/* الكروت الزجاجية (The Glass Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl group overflow-hidden"
              >
                {/* تأثير الضوء عند التحويم */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 mb-6 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                    {/* أيقونة تخيلية */}
                    <span className="font-mono text-xl">0{item}</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-4">{t[`ultraFeatureTitle${item}`]}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t[`ultraFeatureDesc${item}`]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* الجزء السفلي: الـ Core */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 p-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full"
          >
            <div className="bg-[#020202] rounded-full py-4 px-10 flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {['AI_DRIVEN', 'QUANTUM_READY', 'ZERO_LATENCY', 'GLOBAL_EDGE'].map((tech) => (
                <span key={tech} className="text-[10px] font-mono text-gray-600 tracking-widest hover:text-blue-400 transition-colors cursor-crosshair">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FuturisticServerSection;