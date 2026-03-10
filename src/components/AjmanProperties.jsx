import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, BedDouble, Bath, MapPin, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

// استيراد تنسيقات Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const AjmanProperties = () => {
  const [lang] = useState(localStorage.getItem('appLang') || 'en');
  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  // حالة لتخزين بيانات العقار المفتوح في النافذة المنبثقة
  const [activeGallery, setActiveGallery] = useState(null);

  const properties = [
    {
      id: 1,
      title: t.prop_title_1,
      location: t.prop_loc_1,
      price: "1,200,000",
      beds: 3,
      baths: 2,
      area: "1,850",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000",
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1000",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
        "https://images.unsplash.com/photo-1600607687940-c52af036999b?q=80&w=1000"
      ]
    },
    {
      id: 2,
      title: t.prop_title_2,
      location: t.prop_loc_2,
      price: "5,800,000",
      beds: 6,
      baths: 5,
      area: "5,400",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1000",
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=1000",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000"
      ]
    },
    {
      id: 3,
      title: t.prop_title_3,
      location: t.prop_loc_3,
      price: "950,000",
      beds: 2,
      baths: 2,
      area: "1,250",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000"
      ]
    },
    {
      id: 4,
      title: t.prop_title_4,
      location: t.prop_loc_4,
      price: "1,100,000",
      beds: 3,
      baths: 3,
      area: "2,100",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
        "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1000",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000"
      ]
    },
    {
      id: 5,
      title: t.prop_title_5,
      location: t.prop_loc_5,
      price: "3,200,000",
      beds: 4,
      baths: 4,
      area: "3,800",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
        "https://images.unsplash.com/photo-1600607687940-c52af036999b?q=80&w=1000",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1000"
      ]
    },
    {
      id: 6,
      title: t.prop_title_6,
      location: t.prop_loc_6,
      price: "750,000",
      beds: 1,
      baths: 1,
      area: "980",
      images: [
        "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1000",
        "https://images.unsplash.com/photo-1556912170-453f2c713249?q=80&w=1000",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1000",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000",
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1000"
      ]
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-6 md:px-16" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Lightbox / Gallery Overlay */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
          >
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-[110]">
              <div className="text-white font-serif text-xl">{activeGallery.title}</div>
              <button onClick={() => setActiveGallery(null)} className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="w-full h-[75vh] relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ type: 'fraction' }}
                className="h-full w-full custom-gallery-swiper"
              >
                {activeGallery.images.map((img, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center p-4">
                    <img src={img} className="max-w-full max-h-full object-contain" alt="gallery" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="max-w-[1800px] mx-auto mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-yellow-600 uppercase tracking-[0.5em] text-[10px] font-bold block mb-4"
        >
          {isRtl ? "مجموعة حصرية" : "Exclusive Collection"}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif tracking-tighter"
        >
          {isRtl ? "عقارات عجمان" : "Ajman Properties"} <br />
          <span className="text-gray-500 italic font-light text-3xl md:text-5xl">{isRtl ? "التميز في كل زاوية" : "Defining Luxury"}</span>
        </motion.h1>
      </div>

      {/* Grid Section - 6 Properties */}
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {properties.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden"
          >
            {/* Slider Area */}
            <div className="relative h-[400px] md:h-[450px] w-full group/slider overflow-hidden cursor-pointer" onClick={() => setActiveGallery(item)}>
              <Swiper
                modules={[Navigation, Pagination, EffectFade]}
                navigation={{
                  nextEl: `.sn-${item.id}`,
                  prevEl: `.sp-${item.id}`,
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                effect="fade"
                loop={true}
                className="h-full w-full"
              >
                {item.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <button className={`sp-${item.id} absolute top-1/2 left-4 z-30 -translate-y-1/2 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all text-white`}>
                <ChevronLeft size={18} />
              </button>
              <button className={`sn-${item.id} absolute top-1/2 right-4 z-30 -translate-y-1/2 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all text-white`}>
                <ChevronRight size={18} />
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none" />
              
              <div className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} z-20 bg-white text-black px-4 py-2 text-[11px] font-black tracking-widest`}>
                {item.price} <span className="text-[9px]">{isRtl ? "درهم" : "AED"}</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase tracking-widest mb-3">
                <MapPin size={12} className="text-yellow-600" />
                {item.location}
              </div>
              <h3 className="text-2xl font-serif mb-6 group-hover:text-yellow-600 transition-colors h-16">{item.title}</h3>
              
              <div className="flex items-center gap-6 border-t border-white/5 pt-6 text-gray-400 text-xs">
                <div className="flex items-center gap-2"><BedDouble size={16} /> <span>{item.beds}</span></div>
                <div className="flex items-center gap-2"><Bath size={16} /> <span>{item.baths}</span></div>
                <div className="flex items-center gap-2"><Maximize2 size={16} /> <span>{item.area}</span></div>
                
                <button className={`mr-auto p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500`}>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AjmanProperties;