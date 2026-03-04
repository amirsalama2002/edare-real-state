import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, Mail, FileText, Video } from 'lucide-react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const Hero = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const videoRef = useRef(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('appLang') || 'en');
    };
    window.addEventListener('storage', handleStorageChange);
    
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay blocked");
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
  const videoUrl = "/public/296958_medium.mp4";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* خلفية الفيديو */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
      </div>

      {/* المحتوى النصي */}
      <div className={`absolute bottom-32 z-10 text-white max-w-5xl px-8 md:px-20 transition-all duration-1000 
        ${isRtl ? 'right-0 text-right' : 'left-0 text-left'}`}>
        
        <div className="flex items-center gap-4 mb-6">
          <span className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold text-white/80">
            {t.heroSubtitle}
          </span>
          <div className="h-[1px] w-20 bg-white/40"></div>
        </div>
        
        <h1 className="text-5xl md:text-8xl lg:text-[100px] font-serif leading-[1] tracking-tighter mb-10">
          {t.heroTitlePart1} <br /> 
          <span className="italic font-light">{t.heroTitlePart2}</span>
        </h1>

        <div className="flex gap-6">
          <button className="bg-white text-black px-12 py-5 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-500 hover:bg-gray-200">
            {t.exploreBtn}
          </button>
          
          <button className="border border-white/30 backdrop-blur-sm px-12 py-5 uppercase tracking-[0.2em] text-[10px] font-bold text-white transition-all duration-500 hover:bg-white/10">
            {t.contactBtn}
          </button>
        </div>
      </div>

      {/* --- الأزرار الجانبية العائمة (تعديل الـ Sidebar ليطابق صورة بن غاطي) --- */}
      <div className={`fixed top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4
        ${isRtl ? 'left-6' : 'right-6'}`}>
        
        <FloatingButton 
          icon={<Phone size={22} />} 
          label={t.callUs} 
          hoverBg="hover:bg-blue-600" 
        />
        
        <FloatingButton 
          icon={<MessageCircle size={24} />} 
          label={t.whatsapp} 
          hoverBg="hover:bg-green-600" 
        />

        <FloatingButton 
          icon={<Video size={22} />} 
          label="Video Call" 
          hoverBg="hover:bg-purple-600" 
        />

        {/* زر البروشور بشكل مميز */}
        <div className="group relative flex flex-col items-center">
           <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full cursor-pointer transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black text-white shadow-2xl">
              <FileText size={22} />
           </div>
           <span className={`absolute whitespace-nowrap px-4 py-2 bg-black/80 text-white text-[10px] uppercase tracking-widest rounded transition-all duration-300 opacity-0 group-hover:opacity-100 
             ${isRtl ? 'right-20' : 'left-[-140px]'}`}>
             {t.brochure}
           </span>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

// مكون الزر العائم الصغير
const FloatingButton = ({ icon, label, hoverBg }) => (
  <div className="group relative flex items-center justify-center">
    {/* التسمية التي تظهر عند الـ Hover */}
    <span className="absolute right-20 scale-0 group-hover:scale-100 transition-all duration-300 origin-right bg-white text-black text-[10px] font-bold py-1 px-3 rounded uppercase tracking-tighter whitespace-nowrap">
      {label}
    </span>
    
    <div className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full cursor-pointer text-white/90 transition-all duration-500 shadow-xl ${hoverBg} group-hover:text-white group-hover:scale-110 group-hover:shadow-white/10`}>
      {icon}
    </div>
  </div>
);

export default Hero;