import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, Home, Trees, Waves, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurCommunities = () => {
  // 1. منطق اللغة (Language Logic)
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const isRtl = lang === 'ar';

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 500); // للتأكد من التحديث الفوري
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 2. البيانات المترجمة (Translated Data)
  const communities = [
    {
      id: '01',
      name: isRtl ? 'مدينة الزوراء' : 'Al Zorah City',
      location: isRtl ? 'ساحل عجمان' : 'Ajman Coast',
      description: isRtl 
        ? 'تجربة معيشية استثنائية وسط محميات القرم الطبيعية والواجهات البحرية الساحرة.' 
        : 'An exceptional living experience amidst natural mangroves and enchanting waterfronts.',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260',
      stats: { 
        villas: '120+', 
        villasLabel: isRtl ? 'فيلا' : 'Villas',
        amenities: isRtl ? 'محمية طبيعية' : 'Nature Reserve' 
      },
      color: '#c5a059'
    },
    {
      id: '02',
      name: isRtl ? 'كورنيش عجمان' : 'Ajman Corniche',
      location: isRtl ? 'واجهة بحرية' : 'Sea Front',
      description: isRtl 
        ? 'نمط حياة حيوي يجمع بين رفاهية المدينة وهدوء البحر في قلب عجمان.' 
        : 'A vibrant lifestyle combining city luxury with the tranquility of the sea in the heart of Ajman.',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260',
      stats: { 
        villas: '85+', 
        villasLabel: isRtl ? 'وحدة' : 'Units',
        amenities: isRtl ? 'دخول للشاطئ' : 'Beach Access' 
      },
      color: '#3a5a40'
    },
    {
      id: '03',
      name: isRtl ? 'الروضة إستيت' : 'Al Rawda Estate',
      location: isRtl ? 'مركز سكني' : 'Residential Hub',
      description: isRtl 
        ? 'مجتمع سكني متكامل صُمم خصيصاً للعائلات التي تبحث عن الخصوصية والراحة.' 
        : 'An integrated residential community designed specifically for families seeking privacy and comfort.',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260',
      stats: { 
        villas: '200+', 
        villasLabel: isRtl ? 'منزل' : 'Homes',
        amenities: isRtl ? 'حدائق ومدارس' : 'Parks & Schools' 
      },
      color: '#1b263b'
    }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const MotionLink = motion(Link);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#050505] py-32 px-6 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      
      {/* Background Ambient Light */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ 
            backgroundColor: communities[activeTab].color,
            opacity: [0.05, 0.1, 0.05] 
          }}
          className={`absolute top-[-20%] ${isRtl ? 'right-[-10%]' : 'left-[-10%]'} w-[60%] h-[60%] blur-[150px] rounded-full transition-colors duration-1000`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-24 gap-8 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-[1px] bg-[#c5a059]" />
              <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.6em]">
                {isRtl ? 'عالمنا' : 'Our World'}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter"
            >
              {isRtl ? 'مجتمعات' : 'Exclusive'} <br /> 
              <span className="text-transparent stroke-white opacity-30">
                {isRtl ? 'حصرية' : 'Communities'}
              </span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-gray-400 max-w-sm text-sm leading-relaxed mb-4 border-[#c5a059] ${isRtl ? 'border-r-2 pr-6' : 'border-l-2 pl-6'}`}
          >
            {isRtl 
              ? 'نحن لا نبني بيوتاً، بل نصيغ مجتمعات تنبض بالحياة، حيث تلتقي الفخامة بالطبيعة في تناغم فريد.'
              : 'We don’t just build homes; we craft living communities where luxury meets nature in perfect harmony.'}
          </motion.p>
        </div>

        {/* The Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left/Right Side based on RTL: Text Content */}
          <div className={`lg:col-span-5 ${isRtl ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
            <div className="space-y-4">
              {communities.map((item, index) => (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setActiveTab(index)}
                  className={`relative p-8 cursor-pointer transition-all duration-500 rounded-2xl ${
                    activeTab === index ? 'bg-white/5 border border-white/10' : 'opacity-40 grayscale'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#c5a059] font-mono text-lg">{item.id}</span>
                    <MapPin size={16} className={activeTab === index ? 'text-[#c5a059]' : 'text-gray-600'} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 uppercase">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{item.description}</p>
                  
                  <AnimatePresence>
                    {activeTab === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-6 pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <Home size={14} className="text-[#c5a059]" />
                            <span className="text-[10px] text-white uppercase font-bold">
                              {item.stats.villas} {item.stats.villasLabel}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trees size={14} className="text-[#c5a059]" />
                            <span className="text-[10px] text-white uppercase font-bold">{item.stats.amenities}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* <MotionLink
              to="/communities"
              whileHover={{ x: isRtl ? -10 : 10 }}
              className="mt-12 flex items-center gap-4 text-white font-black uppercase text-xs tracking-widest group w-fit"
            >
              {isRtl ? 'استكشف جميع المناطق' : 'Explore All Regions'}
              <span className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#c5a059] group-hover:border-[#c5a059] transition-all ${isRtl ? 'rotate-180' : ''}`}>
                <ArrowRight size={16} />
              </span>
            </MotionLink> */}
          </div>

          {/* Right/Left Side based on RTL: Image Canvas */}
          <div className={`lg:col-span-7 ${isRtl ? 'order-1 lg:order-1' : 'order-1 lg:order-2'} relative h-[500px] md:h-[700px]`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.1, rotate: isRtl ? -2 : 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: isRtl ? 2 : -2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
              >
                <motion.img 
                  style={{ y }}
                  src={communities[activeTab].image} 
                  className="w-full h-[120%] object-cover"
                  alt="Community View"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute bottom-10 left-10 right-10 flex justify-between items-end"
                >
                  <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20">
                    <p className="text-[#c5a059] text-[10px] font-black tracking-widest uppercase mb-1">
                      {isRtl ? 'وجهة عالمية' : 'Premier Destination'}
                    </p>
                    <h4 className="text-2xl font-bold text-white uppercase">{communities[activeTab].location}يي</h4>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
      `}} />
    </section>
  );
};

export default OurCommunities;