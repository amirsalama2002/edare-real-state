import React from 'react';
import { motion } from 'framer-motion';

const AboutAjman = ({ t, isRtl }) => {
  return (
    <section className="py-32 bg-[#030303] overflow-hidden relative border-t border-white/5">
      {/* عنصر ديكوري خلفي (نص عملاق باهت) */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[15vw] font-black uppercase leading-none tracking-tighter">
          Heritage & Future
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* الجانب البصري - التصميم المتداخل المطور */}
          <div className="lg:w-1/2 relative h-[550px] w-full group">
            {/* الصورة الكبيرة - تمثل أفق عجمان الحديث */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute inset-0 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000" // أفق الإمارات الفخم
                alt="Ajman Modern Horizon"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
              />
            </motion.div>
            
            {/* الصورة الصغيرة الأمامية - تمثل تفاصيل المعمار والرفاهية */}
            <motion.div 
              initial={{ opacity: 0, y: 60, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className={`absolute -bottom-8 ${isRtl ? '-left-6 md:-left-12' : '-right-6 md:-right-12'} w-3/5 h-3/5 border-[1px] border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden z-20 rounded-md`}
            >
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200" // فيلا فاخرة بتفاصيل حديثة
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                alt="Luxury Detail"
              />
            </motion.div>

            {/* شارة تأسيس (لمسة عالمية) */}
            <div className={`absolute top-10 ${isRtl ? 'right-10' : 'left-10'} z-30 border border-amber-500/50 bg-black/40 backdrop-blur-md p-4`}>
                <p className="text-amber-500 font-mono text-xs tracking-tighter uppercase leading-none">Established in</p>
                <p className="text-white font-serif text-2xl">AJMAN</p>
            </div>
          </div>

          {/* الجانب النصي */}
          <div className="lg:w-1/2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-amber-500"></span>
                <span className="text-amber-500 tracking-[0.5em] text-[11px] font-black uppercase">
                  {t.ajmanTag}
                </span>
              </div>
              
              <h2 className="text-white text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                {t.ajmanTitle}
              </h2>
              
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl">
                {t.ajmanDesc}
              </p>
            </motion.div>

            {/* نقاط القوة بتصميم البطاقات الزجاجية */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {title: t.ajmanPoint1, desc: t.ajmanPoint1Desc},
                {title: t.ajmanPoint2, desc: t.ajmanPoint2Desc}
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i }}
                  className="group p-8 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-amber-500/50 transition-all duration-500 rounded-sm"
                >
                  <h4 className="text-white font-bold text-lg mb-3 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* شريط الإحداثيات السفلي المطور */}
      <div className="absolute bottom-0 left-0 w-full h-16 border-t border-white/5 flex items-center justify-center">
         <p className="text-white/10 font-mono text-[10px] tracking-[1em] uppercase animate-pulse">
           25.4052° N, 55.5136° E — EDARA HEADQUARTERS AJMAN
         </p>
      </div>
    </section>
  );
};

export default AboutAjman;