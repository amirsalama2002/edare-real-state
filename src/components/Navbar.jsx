import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Globe, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';
import RegisterModal from '../components/RegisterModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // منع السكرول عند فتح المنيو
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.about, path: "/about-edara" },
    { name: t.launches, path: "/services-edara" },
  ];

  return (
    <>
      <nav
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out
        ${isScrolled 
          ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'py-10 bg-transparent'}`}
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 flex justify-between items-center">
          
          {/* --- Logo Area (Desktop & Mobile) --- */}
          <Link to="/" className="relative z-[110] group">
            <motion.div className="text-white flex flex-col items-center">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-none uppercase group-hover:text-[#c5a059] transition-colors duration-500">
                {t.company}
              </h1>
              <div className="flex items-center gap-2 w-full">
                <span className="h-[1px] bg-[#c5a059] flex-1"></span>
                <p className="text-[7px] md:text-[8px] tracking-[0.45em] font-light opacity-80 uppercase">{t.cuntrue}</p>
                <span className="h-[1px] bg-[#c5a059] flex-1"></span>
              </div>
            </motion.div>
          </Link>

          {/* --- Desktop Elegant Navigation (No Changes) --- */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-[#c5a059] transition-all duration-500 
                    ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}>
                  </span>
                </Link>
              ))}
            </div>
            <div className="h-6 w-[1px] bg-white/20 mx-2"></div>
            <div className="flex items-center gap-6">
              <button onClick={toggleLanguage} className="text-white/70 hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-all">
                <Globe size={12} className="text-[#c5a059]" /> {t.langName}
              </button>
              <button onClick={() => setIsModalOpen(true)} className="group relative px-8 py-3 bg-[#c5a059] overflow-hidden">
                <div className="absolute inset-0 w-0 bg-white transition-all duration-500 group-hover:w-full"></div>
                <span className="relative text-black text-[11px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-black">
                  {t.register} <ArrowUpRight size={14} />
                </span>
              </button>
            </div>
          </div>

          {/* --- Mobile Trigger (Modern Icon) --- */}
          <button 
            className="lg:hidden relative z-[110] w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="flex flex-col gap-1.5 items-center">
              <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 4 : 0 }} className="h-[1.5px] w-5 bg-white"></motion.span>
              <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="h-[1.5px] w-5 bg-[#c5a059]"></motion.span>
              <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -4 : 0 }} className="h-[1.5px] w-5 bg-white"></motion.span>
            </div>
          </button>
        </div>

        {/* --- Mobile Menu (The "World Class" Experience) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[100] bg-black"
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] bg-[#c5a059] rounded-full blur-[120px]"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between px-8 pt-32 pb-10">
                {/* Links Section */}
                <div className="space-y-4">
                  <p className="text-[#c5a059] font-mono text-[10px] tracking-[0.5em] uppercase mb-8">{t.launches} / Select</p>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: isRtl ? 50 : -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                    >
                      <Link 
                        to={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-end justify-between py-2 border-b border-white/5"
                      >
                        <span className="text-5xl font-black text-white uppercase tracking-tighter transition-all group-active:text-[#c5a059] group-active:italic">
                          {link.name}
                        </span>
                        <ArrowRight className="mb-2 text-[#c5a059] opacity-0 group-active:opacity-100" size={24} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Interaction Section */}
                <div className="space-y-6">
                  <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    <a href={`tel:+${phoneNumber}`} className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/10 py-6 rounded-3xl active:scale-95 transition-transform">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <Phone size={20} className="text-[#c5a059]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{t.callUs}</span>
                    </a>
                    <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/10 py-6 rounded-3xl active:scale-95 transition-transform">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <MessageCircle size={20} className="text-green-500" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">WhatsApp</span>
                    </a>
                  </motion.div>

                  <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-3"
                  >
                    <button 
                      onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} 
                      className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 transition-transform"
                    >
                      {t.register}
                    </button>
                    <button 
                      onClick={toggleLanguage} 
                      className="w-full border border-white/20 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 bg-white/5"
                    >
                      <Globe size={16} className="text-[#c5a059]" /> {t.langName}
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Close Button */}
              {/* <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-8 text-white/50 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2"
              >
                Close <X size={18} strokeWidth={1} />
              </motion.button> */}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;