import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // استيراد Link من راوتر
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';
import RegisterModal from '../components/RegisterModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [lang, setLang] = useState(() => localStorage.getItem('appLang') || 'en');
  
  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  useEffect(() => {
    localStorage.setItem('appLang', lang);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out px-6 md:px-16 
        ${isScrolled || isMobileMenuOpen ? 'bg-black/95 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'}`}
      >
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          
          {/* --- اللوجو --- */}
          <Link to="/" className="flex items-center gap-16">
            <div className="text-white cursor-pointer group text-center">
              <h1 className="text-2xl font-black tracking-[-0.05em] leading-none mb-0.5 uppercase">{t.company}</h1>
              <p className="text-[7px] tracking-[0.45em] font-light opacity-70 uppercase">{t.cuntrue}</p>
            </div>
          </Link>

          {/* --- روابط الديسكتوب --- */}
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
            <Link to="/" className="hover:text-white transition-all duration-300 relative group">
              {t.home}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about-edara" className="hover:text-white transition-all duration-300 relative group">
              {t.about}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {/* روابط الهوية (Sections) نتركها <a> لأنها Scroll داخلي */}
            <a href="#launches" className="hover:text-white transition-all duration-300 relative group">
              {t.launches}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#communities" className="hover:text-white transition-all duration-300 relative group">
              {t.communities}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* --- الأدوات والزر --- */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden xl:flex items-center gap-8 text-white uppercase font-bold tracking-[0.15em] text-[10px]">
              <button 
                onClick={toggleLanguage}
                className="cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-[11px] w-10 h-10 flex items-center justify-center border border-white/20 rounded-full"
              >
                {t.langName}
              </button>

              <div className={`flex items-center gap-8 border-white/20 ${isRtl ? 'border-r pr-8' : 'border-l pl-8'}`}>
                <a href="tel:+971XXXXXXXX" className="hover:opacity-60 transition-opacity flex items-center gap-2">
                  <Phone size={14} /> {t.callUs}
                </a>
                <a href="https://wa.me/971XXXXXXXX" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity flex items-center gap-2">
                  <MessageCircle size={14} /> {t.whatsapp}
                </a>
              </div>
            </div>

            {/* زر المودال (Desktop) */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:block relative overflow-hidden group border border-white/40 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:border-white"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                {t.register}
              </span>
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
            </button>

            {/* الهامبرغر موبايل */}
            <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* --- منيو الموبايل --- */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-lg transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen border-t border-white/10 py-10 shadow-2xl' : 'max-h-0'}`}>
          <div className="flex flex-col items-center gap-8 text-white uppercase text-[12px] tracking-[0.3em] font-bold">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>{t.home}</Link>
            <Link to="/about-edara" onClick={() => setIsMobileMenuOpen(false)}>{t.about}</Link>
            <a href="#launches" onClick={() => setIsMobileMenuOpen(false)}>{t.launches}</a>
            <a href="#communities" onClick={() => setIsMobileMenuOpen(false)}>{t.communities}</a>
            
            <button 
               onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
               className="bg-white text-black px-10 py-3 text-[10px] tracking-[0.2em] font-black uppercase hover:bg-gray-200 transition-all"
            >
               {t.register}
            </button>

            <div className="flex gap-10 pt-8 border-t border-white/10 w-full justify-center items-center">
              <a href="tel:+971XXXXXXXX"><Phone size={22} className="text-white/70" /></a>
              <a href="https://wa.me/971XXXXXXXX" target="_blank" rel="noreferrer"><MessageCircle size={22} className="text-white/70" /></a>
              <button onClick={toggleLanguage} className="text-[10px] border border-white/20 px-4 py-1.5 rounded-full uppercase tracking-widest">{t.langName}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* المودال */}
      <RegisterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;