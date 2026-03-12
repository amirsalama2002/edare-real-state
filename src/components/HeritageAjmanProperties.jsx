import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, BedDouble, Bath, MapPin, ArrowUpRight, X, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';

// استيراد تنسيقات Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const HeritageAjmanProperties = () => {
  const [lang] = useState(localStorage.getItem('appLang') || 'en');
  const [activeGallery, setActiveGallery] = useState(null);
  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  const properties = [
    { id: 1, title: t.prop_title_1, location: t.prop_loc_1, price: "1,200,000", beds: 3, baths: 2, area: "1,850", images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000", "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1000"] },
    { id: 2, title: t.prop_title_2, location: t.prop_loc_2, price: "5,800,000", beds: 6, baths: 5, area: "5,400", images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000", "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1000"] },
    { id: 3, title: t.prop_title_3, location: t.prop_loc_3, price: "950,000", beds: 2, baths: 2, area: "1,250", images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000"] },
    { id: 4, title: t.prop_title_4, location: t.prop_loc_4, price: "1,100,000", beds: 3, baths: 3, area: "2,100", images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000", "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000"] },
    { id: 5, title: t.prop_title_5, location: t.prop_loc_5, price: "3,200,000", beds: 4, baths: 4, area: "3,800", images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000", "https://images.unsplash.com/photo-1600607687940-c52af036999b?q=80&w=1000"] },
    { id: 6, title: t.prop_title_6, location: t.prop_loc_6, price: "750,000", beds: 1, baths: 1, area: "980", images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1000", "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1000"] }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 md:pt-40 pb-20 px-4 md:px-16 font-sans overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 🌌 الخلفية السينمائية */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#c5a059]/10 to-transparent pointer-events-none" />
      <div className="absolute top-40 left-[-10%] opacity-[0.02] pointer-events-none hidden lg:block select-none">
         <span className="text-[400px] font-black leading-none uppercase">Ajman</span>
      </div>

      {/* 🖼️ Fullscreen Gallery (تجربة موبايل ممتازة) */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex items-center justify-center p-0 md:p-10 backdrop-blur-2xl">
            <button onClick={() => setActiveGallery(null)} className="absolute top-6 right-6 text-white/70 hover:text-[#c5a059] transition-all z-[510] p-2 bg-white/10 rounded-full"><X size={28} /></button>
            <div className="w-full h-full max-w-7xl relative">
              <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop className="h-full">
                {activeGallery.images.map((img, i) => (
                  <SwiperSlide key={i}><img src={img} className="w-full h-full object-contain md:object-cover" alt="Property Detail" /></SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📜 المقدمة (Responsive Header) */}
      <div className="max-w-[1400px] mx-auto mb-16 md:mb-32 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-1 border border-[#c5a059]/30 rounded-full bg-[#c5a059]/5">
             <ShieldCheck size={16} className="text-[#c5a059]" />
             <span className="text-[#c5a059] uppercase tracking-[0.3em] text-[10px] font-bold">
               {isRtl ? "مجموعة النخبة" : "THE ELITE COLLECTION"}
             </span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {isRtl ? "عقارات عجمان" : "Ajman Heritage"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] via-[#f1d28c] to-[#c5a059] italic font-light text-2xl md:text-6xl lowercase tracking-normal">
                {isRtl ? "حيث تبدأ الحكايات" : "where luxury meets legacy"}
            </span>
          </h1>
        </motion.div>
      </div>

      {/* 🏆 الشبكة (Modern Responsive Grid) */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-24">
        {properties.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col group relative"
          >
            {/* الصورة بتصميم "Card" عالمي */}
            <div 
              className="relative h-[400px] md:h-[500px] mb-6 overflow-hidden cursor-pointer rounded-2xl md:rounded-none" 
              onClick={() => setActiveGallery(item)}
            >
              <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 4000 + (idx * 500) }} loop className="h-full">
                {item.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img src={img} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-110" alt="Property" />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* السعر - عائم (Floating) */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-white text-black px-4 py-2 text-xs font-black tracking-widest shadow-2xl">
                  {item.price} <span className="text-[10px] opacity-60 italic">AED</span>
                </div>
              </div>

              {/* طبقة تظليل ذكية */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            {/* تفاصيل العقار */}
            <div className="px-2">
              <div className="flex items-center gap-2 text-[#c5a059] text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">
                <MapPin size={12} strokeWidth={3} /> {item.location}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-white mb-6 group-hover:text-[#c5a059] transition-colors leading-tight">
                {item.title}
              </h3>
              
              {/* أيقونات المواصفات (Grid 3 columns) */}
              <div className="flex justify-between items-center border-y border-white/10 py-5 mb-6">
                <div className="flex flex-col items-center flex-1">
                   <BedDouble size={18} className="mb-1 text-[#c5a059] opacity-80" />
                   <span className="text-[10px] uppercase tracking-widest font-medium text-white/50">{item.beds} {isRtl ? "غرفة" : "Beds"}</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="flex flex-col items-center flex-1">
                   <Bath size={18} className="mb-1 text-[#c5a059] opacity-80" />
                   <span className="text-[10px] uppercase tracking-widest font-medium text-white/50">{item.baths} {isRtl ? "حمام" : "Baths"}</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="flex flex-col items-center flex-1">
                   <Maximize2 size={18} className="mb-1 text-[#c5a059] opacity-80" />
                   <span className="text-[10px] uppercase tracking-widest font-medium text-white/50">{item.area} <span className="text-[8px]">ft²</span></span>
                </div>
              </div>

              {/* زر تفاعلي عصري */}
              <motion.button 
                whileHover={{ gap: '20px' }}
                className="flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.4em] transition-all"
              >
                {isRtl ? "استكشف الآن" : "Explore Now"}
                <div className="h-[1px] w-8 bg-[#c5a059] group-hover:w-16 transition-all duration-500" />
                <ArrowUpRight size={16} className="text-[#c5a059]" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🏺 التذييل (Minimalist Footer) */}
      <div className="mt-40 py-20 border-t border-white/5 text-center">
         <div className="max-w-2xl mx-auto px-4">
            <h4 className="text-[#c5a059] text-xl md:text-3xl italic mb-6">{isRtl ? "حيث تبدأ الحكايات العظيمة" : "Where Great Stories Begin"}</h4>
            <p className="text-[10px] md:text-xs text-white/40 tracking-[0.3em] leading-loose uppercase">
              {isRtl ? "نقدم لك أرقى العقارات التي تليق بمقامك في إمارة عجمان العريقة" : "Exquisite properties curated for those who appreciate the finer things in life."}
            </p>
         </div>
      </div>
    </div>
  );
};

export default HeritageAjmanProperties;