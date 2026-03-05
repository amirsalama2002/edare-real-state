import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const Footer = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  
  useEffect(() => {
    const handleStorageChange = () => setLang(localStorage.getItem('appLang') || 'en');
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        
        {/* الجزء العلوي: دعوة للعمل ضخمة (CTA) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif leading-none tracking-tighter"
          >
            {isRtl ? "لنصنع مستقبلك" : "Let’s Build"} <br />
            <span className="text-gray-500 italic">{isRtl ? "معاً" : "Your Legacy"}</span>
          </motion.h2>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-white text-black rounded-full px-12 py-12 text-[10px] tracking-[0.3em] font-black uppercase flex items-center justify-center hover:bg-gray-200 transition-all shadow-2xl"
          >
            {t.register}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          {/* العمود الأول: الهوية */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-serif mb-6">{t.company}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              {isRtl 
                ? "الريادة في خلق مجتمعات سكنية تتجاوز التوقعات، حيث تجتمع الفخامة بالتصميم العصري." 
                : "Leaders in creating residential communities that exceed expectations, where luxury meets modern design."}
            </p>
            <div className="flex gap-4 mt-8">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-500 hover:text-white transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* العمود الثاني: الروابط السريعة */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-8 font-black">
              {isRtl ? "اكتشف" : "Discover"}
            </h4>
            <ul className="space-y-4">
              {[t.home, t.launches, t.communities, t.about].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-all flex items-center gap-2 group">
                    <span className="h-[1px] w-0 bg-white group-hover:w-4 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: التواصل */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-8 font-black">
              {isRtl ? "اتصل بنا" : "Contact"}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-gray-400 text-sm italic">
                <MapPin size={16} className="text-white" />
                {isRtl ? "دبي، وسط المدينة، برج إعمار" : "Dubai, Downtown, Emaar Square"}
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Phone size={16} className="text-white" />
                +971 4 123 4567
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Mail size={16} className="text-white" />
                info@edara.com
              </li>
            </ul>
          </div>

          {/* العمود الرابع: النشرة البريدية (Newsletter) */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-8 font-black">
              {isRtl ? "النشرة الإخبارية" : "Newsletter"}
            </h4>
            <div className="relative border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder={isRtl ? "البريد الإلكتروني" : "Your Email"} 
                className="bg-transparent w-full text-sm focus:outline-none text-white placeholder:text-gray-700"
              />
              <button className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-0 text-white`}>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* الجزء السفلي: الحقوق */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">
            © 2026 {t.company}. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-gray-600 hover:text-white tracking-[0.2em] uppercase transition-colors">
              {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a href="#" className="text-[10px] text-gray-600 hover:text-white tracking-[0.2em] uppercase transition-colors">
              {isRtl ? "الشروط والأحكام" : "Terms & Conditions"}
            </a>
          </div>
        </div>

        {/* اسم الشركة ضخم جداً في النهاية (Branding) */}
        <div className="mt-20 overflow-hidden pointer-events-none">
          <h1 className="text-[18vw] font-serif leading-none text-white/[0.03] text-center whitespace-nowrap">
            {isRtl ? t.company : "EDARA PROPERTIES"}
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;