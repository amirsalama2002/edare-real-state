import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// تأكد من المسارات الصحيحة لملفات الـ JSON الخاصة بك
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const sliderData = [
  { id: 1, image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', typeKey: 'standaloneVillas', projectKey: 'mividaGardens', titleKey: 'vistaSprings' },
  { id: 2, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', typeKey: 'apartments', projectKey: 'marassiRedSea', titleKey: 'marinaViews' },
  { id: 3, image: 'https://cdn.properties.emaar.com/wp-content/uploads/2021/09/EGYPT-706x385.jpg', typeKey: 'townhouses', projectKey: 'soulLuxury', titleKey: 'theCliff' },
  { id: 4, image: 'https://cdn.properties.emaar.com/wp-content/uploads/2021/09/LEBANON2-1-706x385.jpg', typeKey: 'apartments', projectKey: 'marassiRedSea', titleKey: 'marinaViews' },
  { id: 5, image: 'https://cdn.properties.emaar.com/wp-content/uploads/2021/09/INDIA-1-706x385.jpg', typeKey: 'standaloneVillas', projectKey: 'mividaGardens', titleKey: 'vistaSprings' },
  { id: 6, image: 'https://cdn.properties.emaar.com/wp-content/uploads/2021/09/PAKISTAN-706x385.jpg', typeKey: 'townhouses', projectKey: 'soulLuxury', titleKey: 'theCliff' },
  { id: 7, image: 'https://cdn.properties.emaar.com/wp-content/uploads/2020/06/emaar-malls-320x415.jpg', typeKey: 'apartments', projectKey: 'marassiRedSea', titleKey: 'marinaViews' },
];

function ImageSlider() {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [index, setIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('appLang') || 'en');
    };
    window.addEventListener('storage', handleStorageChange);
    
    const updateItems = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1100) setItemsToShow(2);
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
    <div className="bg-black text-white py-24 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header Section */}
      <section className="container mx-auto px-6 text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] tracking-[0.4em] text-gray-500 uppercase mb-4 block font-bold"
        >
          {t.communities}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-serif mb-8 tracking-tight"
        >
          {t.launches}
        </motion.h2>
        <div className="w-20 h-[1px] bg-white/20 mx-auto"></div>
      </section>

      {/* Slider Area */}
      <div className="relative h-[70vh] md:h-[80vh] w-full flex">
        <AnimatePresence mode="popLayout" initial={false}>
          {getVisibleItems().map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              layout
              initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 50 : -50 }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="relative h-full flex-1 border-r border-white/10 overflow-hidden group cursor-pointer"
            >
              {/* Image with Ken Burns Effect */}
              <motion.img
                src={item.image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
              />

              {/* Label (Black Box) - Adjusted for RTL/LTR */}
              <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} bg-black px-6 py-4 z-20`}>
                <span className="text-[9px] md:text-[10px] tracking-[0.2em] font-black text-white uppercase whitespace-nowrap">
                  {t[item.typeKey] || "PROPERTIES"} 
                </span>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10 opacity-90" />

              {/* Content Box */}
              <div className={`absolute bottom-14 ${isRtl ? 'right-10' : 'left-10'} z-20 pr-6 pl-6`}>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-3 font-bold"
                >
                  {t[item.projectKey] || "EMAAR MISR"}
                </motion.p>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-4xl font-serif text-white leading-tight"
                >
                  {t[item.titleKey] || "The Modern Living"}
                </motion.h3>
                
                {/* Decorative Line - Responsive orientation */}
                <div className={`h-[2px] bg-white mt-6 w-0 group-hover:w-full transition-all duration-1000 ease-in-out`} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      <div className="flex justify-center items-center py-14 gap-4" dir="ltr">
        {sliderData.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-[2px] transition-all duration-700 ${
              index === i ? 'w-16 bg-white' : 'w-6 bg-gray-800 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;