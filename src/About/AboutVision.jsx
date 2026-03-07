import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutVision = ({ t, isRtl }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative py-24 md:py-40 bg-[#050505] text-white overflow-hidden">
      
      {/* --- عنصر ديكوري: توهج ذهبي خافت في الزاوية لتعزيز الفخامة --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* خلفية نصية باهتة جداً - تم تعديلها لتناسب الخلفية السوداء */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[30vw] font-serif italic leading-none whitespace-nowrap text-white">
          {isRtl ? "رؤيتنا" : "Vision"}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* الجانب الأيسر: الصورة السينمائية */}
          <div className="w-full lg:w-5/12 relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200"
                alt="Leadership"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-in-out shadow-2xl"
              />
              {/* إطار ذهبي رفيع - تم تعديله للون Yellow-600 */}
              <div className="absolute inset-4 border border-yellow-600/30 group-hover:inset-2 transition-all duration-700"></div>
            </motion.div>
            
            {/* بطاقة الاسم العائمة - تم تحويلها للنمط الزجاجي المظلم */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={`absolute bottom-8 ${isRtl ? '-left-4 md:-left-8' : '-right-4 md:-right-8'} bg-white/5 backdrop-blur-2xl border border-white/10 p-8 text-white min-w-[250px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
            >
              <p className="text-yellow-600 font-mono text-[10px] tracking-[0.3em] mb-2 uppercase font-bold">
                {isRtl ? "رئيس مجلس الإدارة" : "Chairman & Founder"}
              </p>
              <h4 className="text-2xl font-serif tracking-tight leading-none text-white">
                {isRtl ? "سعادة / منذر " : "H.E. Monzer"}
              </h4>
            </motion.div>
          </div>

          {/* الجانب الأيمن: المحتوى الفلسفي */}
          <div className="w-full lg:w-7/12 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-yellow-600 tracking-[0.6em] text-[10px] font-black uppercase mb-6 block">
                {isRtl ? "كلمة القيادة" : "LEADERSHIP NOTE"}
              </span>
              
              <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-8 text-white">
                {isRtl ? 
                  "نحن لا نبني عقارات، بل نصيغ مستقبلاً يليق بإرث عجمان." : 
                  "We don't build properties; we craft a legacy for Ajman's future."
                }
              </h2>

              {/* خط مائل جانبي ذهبي بدلاً من الرمادي الباهت */}
              <div className={`space-y-6 text-gray-400 text-lg md:text-xl font-light leading-relaxed italic border-yellow-600/30 ${isRtl ? 'border-r-4 pr-8' : 'border-l-4 pl-8'}`}>
                <p>
                  {isRtl ? 
                    "في 'إدارة'، نؤمن أن الفخامة ليست مجرد مظهر، بل هي تجربة تبدأ من الفكرة وتنتهي بالابتسامة على وجوه عملائنا." : 
                    "At Edara, we believe luxury isn't just an appearance; it’s an experience that starts with a vision and ends with a smile on our clients' faces."
                  }
                </p>
                <p>
                  {isRtl ? 
                    "التزامنا نحو عجمان والإمارات يتجاوز الاستثمار؛ إنه انتماء حقيقي لكل زاوية في هذا الوطن." : 
                    "Our commitment to Ajman and the UAE goes beyond investment; it’s a true belonging to every corner of this nation."
                  }
                </p>
              </div>

              {/* التوقيع الفني المطور */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="mt-12 pt-8 border-t border-white/5 flex items-center gap-6"
              >
                <div className="h-16 w-16 rounded-full border border-yellow-600/20 bg-yellow-600/5 flex items-center justify-center italic font-serif text-2xl text-yellow-600 shadow-inner">
                  M.A
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-white/30 font-bold uppercase">Authorized Signature</p>
                  <div className="h-[1px] w-32 bg-gradient-to-r from-yellow-600/50 to-transparent mt-2"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutVision;