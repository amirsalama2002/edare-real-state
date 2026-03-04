import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, FileText, Phone, Mail } from 'lucide-react';
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

  // رابط الفيديو
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

      {/* المحتوى النصي - مسحوب بالكامل من الملفات */}
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

      {/* الشريط الجانبي - مسحوب بالكامل من الملفات */}
      <div className={`fixed top-1/2 -translate-y-1/2 z-50 flex flex-col bg-black/30 backdrop-blur-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-700
        ${isRtl ? 'left-0 rounded-r-2xl' : 'right-0 rounded-l-2xl'}`}>
        
        <SidebarItem icon={<MessageCircle size={20} />} label={t.whatsapp} hoverClass="hover:bg-green-600/90" />

        <div className="relative flex flex-col items-center justify-center w-24 py-8 cursor-pointer border-b border-white/5 bg-white/5 text-white group">
          <FileText size={20} className="mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-[8px] uppercase tracking-widest font-black text-center px-1">
            {t.brochure}
          </span>
          <div className={`absolute top-0 h-full w-[4px] bg-white ${isRtl ? 'left-0' : 'right-0'}`}></div>
        </div>

        <SidebarItem icon={<Phone size={20} />} label={t.callUs} hoverClass="hover:bg-blue-600/90" />
        <SidebarItem icon={<Mail size={20} />} label={t.mail} hoverClass="hover:bg-red-900/90" />
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, hoverClass }) => (
  <div className={`flex flex-col items-center justify-center w-24 py-8 cursor-pointer border-b border-white/5 transition-all duration-500 group ${hoverClass}`}>
    <div className="text-white/80 group-hover:text-white transition-all">{icon}</div>
    <span className="text-[8px] uppercase tracking-widest text-gray-400 group-hover:text-white mt-3 text-center px-1 font-bold">
      {label}
    </span>
  </div>
);

export default Hero;