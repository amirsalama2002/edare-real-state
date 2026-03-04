import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// استيراد ملفات الترجمة
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const sliderData = [
  { id: 1, image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', typeKey: 'standaloneVillas', projectKey: 'mividaGardens', titleKey: 'vistaSprings' },
  { id: 2, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', typeKey: 'apartments', projectKey: 'marassiRedSea', titleKey: 'marinaViews' },
  { id: 3, image: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', typeKey: 'townhouses', projectKey: 'soulLuxury', titleKey: 'theCliff' },
  // يمكنك إضافة المزيد هنا بنفس النمط
];

function ImageSlider() {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [index, setIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // مراقبة تغيير اللغة من الـ Hero أو الـ Navbar
  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('appLang') || 'en');
    };
    window.addEventListener('storage', handleStorageChange);
    
    // تحديث Responsive
    const updateItems = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    updateItems();
    window.addEventListener('resize', updateItems);

    const interval = setInterval(handleStorageChange, 500);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', updateItems);
      clearInterval(interval);
    };
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleItems = () => {
    let items = [];
    for (let i = 0; i < itemsToShow; i++) {
      items.push(sliderData[(index + i) % sliderData.length]);
    }
    return items;
  };

  return (
    <div className="bg-black text-white py-20 overflow-hidden font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header Section */}
      <section className="container mx-auto px-6 text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] tracking-[0.5em] text-gray-500 uppercase mb-4 block font-bold"
        >
          {t.communities} {/* مسحوب من ملف الـ JSON */}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-serif mb-8 tracking-tight"
        >
          {t.launches} {/* مسحوب من ملف الـ JSON */}
        </motion.h2>
        <div className={`w-20 h-[1px] bg-white/20 mx-auto mb-8`}></div>
      </section>

      {/* Slider Area */}
      <div className="relative h-[65vh] md:h-[75vh] w-full">
        <div className="flex w-full h-full">
          <AnimatePresence mode="popLayout" initial={false}>
            {getVisibleItems().map((item, idx) => (
              <motion.div
                key={`${item.id}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative h-full flex-1 border-r border-white/5 overflow-hidden group cursor-pointer shadow-2xl`}
              >
                {/* Image */}
                <motion.img
                  src={item.image}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />

                {/* Label (Black Box) */}
                <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} bg-black px-6 py-3 z-20`}>
                  <span className="text-[9px] tracking-[0.2em] font-black text-white uppercase">
                    {/* هنا بتنادي على نوع العقار من الـ JSON بناء على المفتاح */}
                    {t[item.typeKey] || item.label} 
                  </span>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10 opacity-90" />

                {/* Content */}
                <div className={`absolute bottom-12 ${isRtl ? 'right-10 text-right' : 'left-10 text-left'} z-20 pr-6`}>
                  <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-2 font-bold">
                    {t[item.projectKey] || item.subLabel}
                  </p>
                  <h3 className="text-2xl md:text-4xl font-serif text-white leading-tight">
                    {t[item.titleKey] || item.title}
                  </h3>
                  
                  {/* خط ديكوري يظهر عند الـ Hover */}
                  <motion.div 
                    className="h-[2px] bg-white mt-4 w-0 group-hover:w-full transition-all duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="flex justify-center items-center py-12 gap-3">
        {sliderData.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-[3px] transition-all duration-700 ${
              index === i ? 'w-12 bg-white' : 'w-4 bg-gray-800 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;