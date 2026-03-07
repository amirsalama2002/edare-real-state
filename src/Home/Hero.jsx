import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, Mail, FileText, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';
import RegisterModal from '../components/RegisterModal'; 

const Hero = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);

  const contactInfo = {
    phone: "971503214077",
    email: "hamirsalama@gmail.com",
    whatsapp: "971503214077",
    // تم إضافة رابط الكانفا هنا للتنظيم
    brochureUrl: "https://www.canva.com/design/DAHDPab7z54/pYlLaPiz83tdI7Nd0asQFQ/view?utm_content=DAHDPab7z54&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc090355155#9"
  };

  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    window.addEventListener('storage', handleStorageChange);
    
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented", error);
      });
    }

    const interval = setInterval(handleStorageChange, 500);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';
  const videoUrl = "/hero-video.mp4";

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* خلفية الفيديو */}
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 scale-105">
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      </div>

      {/* المحتوى النصي */}
      <div className={`absolute bottom-[15%] md:bottom-32 z-10 text-white w-full max-w-7xl px-6 md:px-20 transition-all duration-1000 ${isRtl ? 'right-0 text-right' : 'left-0 text-left'}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4 md:mb-6">
          <span className="uppercase tracking-[0.3em] text-[9px] md:text-xs font-bold text-white/70">{t.heroSubtitle}</span>
          <div className="h-[1px] w-12 md:w-20 bg-white/40"></div>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[11vw] md:text-8xl lg:text-[100px] font-serif leading-[1.1] tracking-tighter mb-8 md:mb-12">
          {t.heroTitlePart1} <br /> 
          <span className="italic font-light text-gray-400">{t.heroTitlePart2}</span>
        </motion.h1>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button className="w-full sm:w-auto bg-white text-black px-10 py-4 md:py-5 uppercase tracking-[0.2em] text-[9px] font-black transition-all duration-500 active:scale-95 shadow-2xl">
            {t.exploreBtn}
          </button>
          <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto border border-white/20 backdrop-blur-md px-10 py-4 md:py-5 uppercase tracking-[0.2em] text-[9px] font-black text-white transition-all duration-500 active:scale-95">
            {t.contactBtn}
          </button>
        </div>
      </div>

      {/* الأزرار العائمة */}
      <div className={`fixed bottom-6 md:top-1/2 md:-translate-y-1/2 z-50 flex md:flex-col gap-3 px-6 md:px-0 w-full md:w-auto justify-center ${isRtl ? 'md:left-8' : 'md:right-8'}`}>
        <FloatingButton icon={<Phone size={20} />} label={t.callUs} href={`tel:+${contactInfo.phone}`} color="bg-white/10" hoverBg="hover:bg-blue-600" isRtl={isRtl} />
        <FloatingButton icon={<MessageCircle size={22} />} label={t.whatsapp} href={`https://wa.me/${contactInfo.whatsapp}`} color="bg-white/10" hoverBg="hover:bg-green-600" isRtl={isRtl} />
        <FloatingButton icon={<Mail size={20} />} label={t.emailUs} href={`mailto:${contactInfo.email}`} color="bg-white/10" hoverBg="hover:bg-red-600" isRtl={isRtl} />

        <div className="hidden sm:flex">
          {/* تحديث رابط الكتيب هنا */}
          <FloatingButton 
            icon={<FileText size={20} />} 
            label={t.brochure} 
            href={contactInfo.brochureUrl} 
            color="bg-white/10" 
            hoverBg="hover:bg-white hover:text-black" 
            isRtl={isRtl} 
          />
        </div>
      </div>

      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={20} className="text-white" />
        </motion.div>
      </div>
    </div>
  );
};

const FloatingButton = ({ icon, label, hoverBg, color, isRtl, href }) => (
  <a 
    href={href}
    target="_blank" // سيفتح دائماً في نافذة جديدة
    rel="noopener noreferrer"
    className="group relative flex items-center justify-center flex-1 md:flex-none no-underline"
  >
    <span className={`absolute hidden md:block scale-0 group-hover:scale-100 transition-all duration-300 origin-center md:origin-right bg-white text-black text-[10px] font-bold py-2 px-4 rounded-full uppercase tracking-tighter whitespace-nowrap shadow-xl ${isRtl ? 'md:left-20' : 'md:right-20'}`}>
      {label}
    </span>
    <div className={`w-full h-14 md:w-16 md:h-16 flex items-center justify-center ${color} backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full cursor-pointer text-white/90 transition-all duration-500 shadow-2xl ${hoverBg} active:scale-90 group-hover:scale-110`}>
      {icon}
    </div>
  </a>
);

export default Hero;