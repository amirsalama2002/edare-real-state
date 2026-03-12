import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Globe, ArrowRight } from 'lucide-react';
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

  // حركات الأنميشن العالمية للموبايل
  const menuVariants = {
    closed: { x: isRtl ? "-100%" : "100%", transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
    opened: { x: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } }
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    opened: i => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <>
      <nav 
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out px-6 md:px-16 
        ${isScrolled || isMobileMenuOpen ? 'bg-black/95 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'}`}
      >
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-16 relative z-[110]">
            <div className="text-white cursor-pointer group text-center">
              <h1 className="text-2xl font-black tracking-[-0.05em] leading-none mb-0.5 uppercase">{t.company}</h1>
              <p className="text-[7px] tracking-[0.45em] font-light opacity-70 uppercase">{t.cuntrue}</p>
            </div>
          </Link>

          {/* روابط الديسكتوب - لم تتغير */}
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
            {[ {n: t.home, p: "/"}, {n: t.about, p: "/about-edara"}, {n: t.launches, p: "/services-edara"} ].map((link, i) => (
              <Link key={i} to={link.p} className="hover:text-white transition-all duration-300 relative group">
                {link.n}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-8">
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
              className="hidden sm:block relative overflow-hidden group border border-white/40 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-500"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">{t.register}</span>
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
            </button>

            <button className="lg:hidden text-white z-[110] p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* --- منيو الموبايل الاحترافي --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="lg:hidden fixed inset-0 z-[90] w-full h-screen bg-[#080808] flex flex-col justify-between pt-32 pb-12"
            >
              {/* خلفية فنية خفيفة للموبايل */}
              <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[#c5a059]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="relative z-10 flex flex-col px-10 gap-1">
                {[
                  { name: t.home, path: "/" },
                  { name: t.about, path: "/about-edara" },
                  { name: t.launches, path: "/services-edara" },
                ].map((link, i) => (
                  <motion.div key={i} custom={i} variants={linkVariants} initial="closed" animate="opened">
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="text-white text-5xl font-black uppercase tracking-tighter transition-all active:text-[#c5a059] active:italic">
                        {link.name}
                      </span>
                      <ArrowRight className={`text-[#c5a059] opacity-0 group-active:opacity-100 ${isRtl ? 'rotate-180' : ''}`} size={24} />
                    </Link>
                    <div className="w-full h-[1px] bg-white/5" />
                  </motion.div>
                ))}
              </div>

              {/* الجزء السفلي: أزرار التواصل (Mobile Focused) */}
              <div className="relative z-10 px-6 space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="grid grid-cols-2 gap-4">
                  <a href={`tel:+${phoneNumber}`} className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/10 py-6 rounded-2xl active:bg-white active:text-black transition-all">
                    <Phone size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t.callUs}</span>
                  </a>
                  <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/10 py-6 rounded-2xl active:bg-green-600 transition-all">
                    <MessageCircle size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t.whatsapp}</span>
                  </a>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col gap-4">
                  <button 
                    onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full bg-[#c5a059] text-black py-5 text-[12px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
                  >
                    {t.register} <ArrowRight size={16} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                  
                  <button onClick={toggleLanguage} className="w-full border border-white/20 text-white py-4 rounded-xl flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-widest bg-white/5">
                    <Globe size={16} /> {t.langName}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;