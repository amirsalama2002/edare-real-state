import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Send } from 'lucide-react';
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

  // منع السكرول عند فتح منيو الموبايل
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

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
            <Link to="/services-edara" className="hover:text-white transition-all duration-300 relative group">
              {t.launches}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
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
            <button className="lg:hidden text-white z-[110]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* --- منيو الموبايل (Full Screen Overlay) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.5, ease: 'circOut' }}
              className="lg:hidden fixed inset-0 z-[90] w-full h-screen bg-[#050505] flex flex-col items-center justify-center"
            >
              {/* صورة خلفية فنية خافتة */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
                  className="w-full h-full object-cover grayscale"
                  alt="bg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-8 w-full px-10">
                {[
                  { name: t.home, path: "/" },
                  { name: t.about, path: "/about-edara" },
                  { name: t.launches, path: "/services-edara" },
                  // { name: t.communities, path: "#communities" }
                ].map((link, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white text-4xl font-black uppercase tracking-tighter hover:text-yellow-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.button 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="mt-8 w-full max-w-[300px] bg-white text-black py-5 text-[11px] font-black uppercase tracking-[0.3em] rounded-sm"
                >
                  {t.register}
                </motion.button>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-8 mt-10"
                >
                  <a href="tel:+971XXXXXXXX" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60"><Phone size={20} /></a>
                  <button onClick={toggleLanguage} className="text-[10px] font-bold border border-yellow-600/40 text-yellow-600 px-8 py-2 rounded-full uppercase tracking-widest">{t.langName}</button>
                  <a href="https://wa.me/971XXXXXXXX" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60"><MessageCircle size={20} /></a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- زر "سجل اهتمامك" العائم للموبايل فقط (يظهر عند النزول) --- */}
      <AnimatePresence>
        {isScrolled && !isMobileMenuOpen && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[99] w-[90%] max-w-[350px]"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative w-full bg-white py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="absolute inset-0 bg-yellow-600/10 animate-pulse"></span>
              <span className="relative z-10 text-black text-[11px] font-black uppercase tracking-[0.2em]">
                {t.register}
              </span>
              <Send size={14} className="text-black relative z-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <RegisterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;