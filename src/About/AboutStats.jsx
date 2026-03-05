import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Counter = ({ value }) => {
  const num = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(num);
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [num, motionValue, springValue]);

  return <span>{displayValue}{suffix}</span>;
};

const AboutStats = ({ t, isRtl }) => {
  const stats = [
    { number: "25+", label: t?.statYears || "Years of Experience" },
    { number: "150+", label: t?.statProjects || "Luxury Projects" },
    { number: "12k+", label: t?.statFamilies || "Happy Families" },
    { number: "08", label: t?.statCities || "Global Cities" }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#050505] relative overflow-hidden border-y border-white/[0.03]">
      
      {/* الخلفية: تم تصغير حجم الـ Glow في الموبايل عشان ميعملش Scroll عرضي */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-amber-500/10 blur-[80px] md:blur-[120px] rounded-full"></div>
         <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/5 blur-[80px] md:blur-[120px] rounded-full"></div>
      </div>

      {/* النص الخلفي: مخفي في الشاشات الصغيرة جداً لضمان نظافة التصميم */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h2 className="text-[30vw] md:text-[25vw] font-black uppercase tracking-tighter text-transparent stroke-text opacity-[0.02] md:opacity-[0.03] select-none leading-none">
          {t?.excellence || "EXCELLENCE"}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center lg:items-start">
          
          {/* الجانب الأيسر: الهوية - Text align center on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 space-y-6 md:space-y-8 text-center lg:text-start"
          >
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="h-[1px] w-8 md:w-12 bg-amber-500/50"></div>
              <span className="text-amber-500 text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] font-black uppercase">
                {t?.excellence || "EXCELLENCE"}
              </span>
            </div>
            
            <h3 className={`text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.2] font-light ${isRtl ? 'md:leading-[1.4]' : ''}`}>
              <span className="text-white/40 italic block mb-2 text-xl md:text-2xl">{t?.statsLegacyTitle || "Our Legacy,"}</span>
              {t?.statsLegacyNote || "Building a legacy for generations."}
            </h3>
          </motion.div>

          {/* الجانب الأيمن: الأرقام - 1 column on mobile, 2 on tablet+ */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8 md:gap-x-12">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${isRtl ? 'text-center sm:text-right' : 'text-center sm:text-left'} group cursor-default`}
              >
                <div className="relative inline-block">
                  <h4 className="text-white text-5xl md:text-6xl lg:text-7xl font-serif mb-2 md:mb-4 flex items-center justify-center sm:justify-start gap-1 group-hover:text-amber-500 transition-colors duration-500">
                    <Counter value={stat.number} />
                  </h4>
                </div>
                
                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold group-hover:text-white/80 transition-colors duration-500">
                  {stat.label}
                </p>
                
                {/* الخط التفاعلي: Center on mobile, Side on desktop */}
                <div className="relative mt-4 md:mt-6 h-[1px] w-12 bg-white/10 overflow-hidden mx-auto sm:mx-0 group-hover:w-full transition-all duration-700 ease-in-out">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,1);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default AboutStats;