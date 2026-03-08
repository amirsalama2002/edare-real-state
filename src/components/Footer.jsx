import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';
import RegisterModal from './RegisterModal'; 

const Footer = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
        
        {/* الجزء العلوي: دعوة للعمل (CTA) */}
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
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-white px-10 py-4 border border-white/10 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-black translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-black group-hover:text-white text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-500">
                {t.register}
              </span>
              <ArrowUpRight size={16} className="text-black group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
            </div>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
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

          {/* سكشن الروابط المحدث بـ React Router */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-8 font-black">
              {isRtl ? "اكتشف" : "Discover"}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t.home, path: '/' },
                { name: isRtl ? "من نحن" : "About Us", path: '/about-edara' },
                { name: isRtl ? "خدماتنا" : "Services", path: '/services-edara' },
              ].map((item, i) => (
                <li key={i}>
                  <Link 
                    to={item.path} 
                    className={`text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-2 group ${
                      isRtl ? 'hover:pr-2' : 'hover:pl-2'
                    }`}
                  >
                    <span className="h-[1px] w-0 bg-white group-hover:w-4 transition-all duration-500 ease-out shrink-0"></span>
                    <span className="tracking-wide uppercase text-[12px]">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* التواصل */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-8 font-black">
              {isRtl ? "اتصل بنا" : "Contact"}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-gray-400 text-sm italic">
                <MapPin size={16} className="text-white" />
                {isRtl ? "عجمان، الإمارات العربية المتحدة" : "Ajman, United Arab Emirates"}
              </li>
              <li className={`flex items-center gap-4 text-gray-400 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Phone size={16} className="text-white" />
                <span dir="ltr">+971 50 321 4077</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Mail size={16} className="text-white" />
                info@edara.com
              </li>
            </ul>
          </div>

          {/* النشرة الإخبارية */}
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

        {/* الحقوق */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">
            © 2026 {t.company}. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="text-[10px] text-gray-600 hover:text-white tracking-[0.2em] uppercase transition-colors">
              {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link to="/terms" className="text-[10px] text-gray-600 hover:text-white tracking-[0.2em] uppercase transition-colors">
              {isRtl ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>
          </div>
        </div>

        <div className="mt-20 overflow-hidden pointer-events-none">
          <h1 className="text-[15vw] font-serif leading-none text-white/[0.03] text-center whitespace-nowrap uppercase">
            {isRtl ? t.company : "EDARA PROPERTIES"}
          </h1>
        </div>
      </div>

      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;