import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // إظهار الزر بعد النزول 300 بيكسل
      const scrolled = window.scrollY;
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // حساب نسبة التمرير لرسم الدائرة
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[999] cursor-pointer"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* الدائرة الخلفية الرمادية الباهتة */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white/10"
              />
              {/* دائرة التقدم الذهبية المتحركة */}
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="176" // 2 * PI * r (2 * 3.14 * 28)
                initial={{ strokeDashoffset: 176 }}
                animate={{ strokeDashoffset: 176 - (176 * scrollProgress) / 100 }}
                className="text-yellow-600"
              />
            </svg>

            {/* الزر الداخلي */}
            <div className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-yellow-600 hover:text-black transition-colors duration-500 shadow-2xl">
              <ArrowUp size={20} strokeWidth={3} />
            </div>

            {/* تأثير نبض خفيف (Glow) */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-yellow-600/20 rounded-full blur-xl -z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;