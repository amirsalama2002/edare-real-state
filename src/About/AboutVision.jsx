import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutVision = ({ t, isRtl }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative py-24 md:py-40 bg-white text-black overflow-hidden">
      {/* خلفية نصية باهتة جداً لإعطاء عمق فني */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[30vw] font-serif italic leading-none whitespace-nowrap">
          {isRtl ? "رؤيتنا" : "Vision"}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* الجانب الأيسر: الصورة السينمائية */}
          <div className="w-full lg:w-5/12 relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200" // صورة توحي بالقيادة (رجل أعمال بستايل فخم)
                alt="Leadership"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              {/* إطار ذهبي رفيع يتحرك مع الـ Hover */}
              <div className="absolute inset-4 border border-amber-500/30 group-hover:inset-2 transition-all duration-500"></div>
            </motion.div>
            
            {/* بطاقة الاسم العائمة */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`absolute bottom-8 ${isRtl ? '-left-8' : '-right-8'} bg-black p-8 text-white min-w-[250px] shadow-2xl`}
            >
              <p className="text-amber-500 font-mono text-xs tracking-widest mb-2 uppercase">
                {isRtl ? "رئيس مجلس الإدارة" : "Chairman & Founder"}
              </p>
              <h4 className="text-2xl font-serif tracking-tight leading-none">
                {isRtl ? "سعادة / خليفة الهاشمي" : "H.E. Khalifa Al Hashemi"}
              </h4>
            </motion.div>
          </div>

          {/* الجانب الأيمن: المحتوى الفلسفي */}
          <div className="w-full lg:w-7/12 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-600 tracking-[0.6em] text-[10px] font-black uppercase mb-6 block">
                {isRtl ? "كلمة القيادة" : "LEADERSHIP NOTE"}
              </span>
              
              <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-8 text-neutral-900">
                {isRtl ? 
                  "نحن لا نبني عقارات، بل نصيغ مستقبلاً يليق بإرث عجمان." : 
                  "We don't build properties; we craft a legacy for Ajman's future."
                }
              </h2>

              <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed italic border-l-4 border-amber-500/20 pl-8">
                <p>
                  {isRtl ? 
                    "في 'إدارة'، نؤمن أن الفخامة ليست مجرد مظهر، بل هي تجربة تبدأ من الفكرة وتنتهي بالابتسامة على وجوه عائلاتنا." : 
                    "At Edara, we believe luxury isn't just an appearance; it’s an experience that starts with a vision and ends with a smile on our families' faces."
                  }
                </p>
                <p>
                  {isRtl ? 
                    "التزامنا نحو عجمان والإمارات يتجاوز الاستثمار؛ إنه انتماء حقيقي لكل زاوية في هذا الوطن." : 
                    "Our commitment to Ajman and the UAE goes beyond investment; it’s a true belonging to every corner of this nation."
                  }
                </p>
              </div>

              {/* التوقيع الفني */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 pt-8 border-t border-neutral-100 flex items-center gap-6"
              >
                <div className="h-16 w-16 rounded-full border border-amber-500/20 flex items-center justify-center italic font-serif text-2xl text-amber-600">
                  K.H
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase">Authorized Signature</p>
                  <div className="h-[1px] w-32 bg-neutral-200 mt-2"></div>
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