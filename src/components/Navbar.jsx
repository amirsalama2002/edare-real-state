import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, ChevronRight, Globe, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const phoneNumber = "971503214077";

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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-16 
        ${isScrolled || isMobileMenuOpen ? 'bg-black/95 py-4 border-b border-white/5' : 'bg-transparent py-8'}`}
      >
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          
          {/* --- اللوجو --- */}
          <Link to="/" className="flex items-center gap-16 relative z-[110]">
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
            <Link to="/services-edara" className="hover:text-white transition-all duration-300 relative group">
              {t.launches}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* --- الأدوات والزر --- */}
          <div className="flex items-center gap-4 md:gap-8 relative z-[110]">
            <div className="hidden xl:flex items-center gap-8 text-white uppercase font-bold tracking-[0.15em] text-[10px]">
              <button onClick={toggleLanguage} className="cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-[11px] w-10 h-10 flex items-center justify-center border border-white/20 rounded-full">
                {t.langName}
              </button>
              <div className={`flex items-center gap-8 border-white/20 ${isRtl ? 'border-r pr-8' : 'border-l pl-8'}`}>
                <a href={`tel:+${phoneNumber}`} className="hover:text-yellow-600 transition-colors flex items-center gap-2">
                  <Phone size={14} /> {t.callUs}
                </a>
                <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors flex items-center gap-2">
                  <MessageCircle size={14} /> {t.whatsapp}
                </a>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:block border border-white/40 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              {t.register}
            </button>

            <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* --- منيو الموبايل (Amazon Style) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Dark Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-[120] backdrop-blur-sm lg:hidden"
              />

              {/* Sidebar Menu */}
              <motion.div 
                initial={{ x: isRtl ? '100%' : '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: isRtl ? '100%' : '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} w-[85%] max-w-[360px] h-screen bg-[#121212] z-[130] lg:hidden flex flex-col shadow-2xl overflow-hidden`}
              >
                {/* Amazon-style Header Profile */}
                <div className="bg-[#1a1a1a] p-6 pt-10 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <UserCircle size={24} className="text-white/40" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest leading-none mb-1">Welcome to</p>
                      <h2 className="text-sm font-bold text-white uppercase tracking-tighter">{t.company}</h2>
                    </div>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/50 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {/* Menu Links */}
                <div className="flex-1 overflow-y-auto pt-4 pb-10">
                  <div className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#c5a059]">Main Navigation</div>
                  
                  {[
                    { name: t.home, path: "/" },
                    { name: t.about, path: "/about-edara" },
                    { name: t.launches, path: "/services-edara" },
                  ].map((link, i) => (
                    <Link 
                      key={i}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/5 border-b border-white/[0.03] group transition-colors"
                    >
                      <span className="text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white">{link.name}</span>
                      <ChevronRight size={16} className="text-white/20 group-hover:text-[#c5a059] transition-colors" />
                    </Link>
                  ))}

                  {/* Actions Section */}
                  <div className="px-6 py-4 mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#c5a059]">Quick Actions</div>
                  
                  <div className="px-6 space-y-4 pt-2">
                    <button 
                      onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                      className="w-full bg-white text-black py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-sm shadow-xl flex items-center justify-center gap-2"
                    >
                      {t.register}
                    </button>

                    <button 
                      onClick={toggleLanguage}
                      className="w-full border border-white/10 text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-sm flex items-center justify-center gap-2 bg-white/5"
                    >
                      <Globe size={16} /> {t.langName}
                    </button>
                  </div>

                  {/* Contact Grid */}
                  <div className="grid grid-cols-2 gap-[1px] bg-white/5 mt-8 border-y border-white/5">
                    <a href={`tel:+${phoneNumber}`} className="bg-[#121212] flex flex-col items-center justify-center py-8 gap-2 active:bg-white/5 transition-colors">
                      <Phone size={20} className="text-[#c5a059]" />
                      <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">{t.callUs}</span>
                    </a>
                    <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer" className="bg-[#121212] flex flex-col items-center justify-center py-8 gap-2 active:bg-white/5 transition-colors">
                      <MessageCircle size={20} className="text-green-500" />
                      <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <RegisterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;