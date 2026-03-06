import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const PhilosophySection = () => {
  // 1. استخدام الحالة المبدئية من localStorage
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');

  // 2. مصلح مراقبة التغيير: نستخدم Interval لضمان التحديث في نفس اللحظة
  useEffect(() => {
    const checkLang = setInterval(() => {
      const currentLang = localStorage.getItem('appLang') || 'en';
      if (currentLang !== lang) {
        setLang(currentLang);
      }
    }, 500); // يفحص كل نصف ثانية

    return () => clearInterval(checkLang);
  }, [lang]);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <section className="relative py-24 md:py-40 bg-[#050505] text-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* خلفية نصية باهتة جداً (Watermark) */}
      <div className={`absolute top-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.02] select-none ${isRtl ? 'right-0' : 'left-0'}`}>
        <h2 className={`text-[20vw] font-black leading-none uppercase ${isRtl ? '-mr-20' : '-ml-20'}`}>
          {isRtl ? 'عمارة' : 'Architecture'}
        </h2>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* الجانب الأيسر: الصور المتداخلة */}
          <div className="w-full lg:w-1/2 relative h-[450px] md:h-[600px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-4/5 h-4/5 rounded-sm overflow-hidden border border-white/5`}
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000" 
                className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                alt="Modern Architecture"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`absolute bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-3/5 h-3/5 rounded-sm overflow-hidden border-8 border-[#050505] shadow-2xl z-20`}
            >
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000" 
                className="w-full h-full object-cover"
                alt="Interior Luxury"
              />
            </motion.div>
          </div>

          {/* الجانب الأيمن: المحتوى */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-yellow-600 font-bold text-xs uppercase tracking-[0.5em] mb-6 block">
                {t.philosophyTag}
              </span>
              
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1]">
                {/* معالجة النصوص البرمجية لضمان عمل split بشكل صحيح مع العربي */}
                {t.philosophyTitle.split(' ')[0]} <br />
                <span className="text-transparent stroke-text-white uppercase font-serif italic">
                   {t.philosophyTitle.split(' ').slice(1).join(' ')}
                </span>
              </h2>
              
              <p className={`text-gray-400 text-lg font-light leading-relaxed mb-12 max-w-lg ${isRtl ? 'border-r-2 pr-6' : 'border-l-2 pl-6'} border-yellow-600/30`}>
                {t.philosophyDesc}
              </p>

              {/* العدادات */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                {[
                  { num: t.stat1Num, label: t.stat1Label },
                  { num: t.stat2Num, label: t.stat2Label },
                  { num: t.stat3Num, label: t.stat3Label }
                ].map((stat, index) => (
                  <div key={index}>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{stat.num}</h3>
                    <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
      `}} />
    </section>
  );
};

export default PhilosophySection;