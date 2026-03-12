import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, ChevronRight, Globe, Home, Info, Briefcase } from 'lucide-react';
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
    // منع السكرول في الصفحة الخلفية عند فتح المنيو
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
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 md:px-16 
        ${isScrolled || isMobileMenuOpen ? 'bg-black py-4 border-b border-white/5' : 'bg-transparent py-8'}`}
      >
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          
          {/* --- اللوجو --- */}
          <Link to="/" className="flex items-center gap-16 relative z-[110]">
            <div className="text-white cursor-pointer text-center">
              <h1 className="text-2xl font-black tracking-[-0.05em] leading-none mb-0.5 uppercase">{t.company}</h1>
              <p className="text-[7px] tracking-[0.45em] font-light opacity-70 uppercase">{t.cuntrue}</p>
            </div>
          </Link>

          {/* --- روابط الديسكتوب (ثابتة) --- */}
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
          <div className="flex items-center gap-4 relative z-[110]">
            <div className="hidden xl:flex items-center gap-8 text-white uppercase font-bold tracking-[0.15em] text-[10px]">
              <button onClick={toggleLanguage} className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                {t.langName}
              </button>
              <div className={`flex items-center gap-8 border-white/20 ${isRtl ? 'border-r pr-8' : 'border-l pl-8'}`}>
                <a href={`tel:+${phoneNumber}`} className="flex items-center gap-2 hover:text-yellow-600 transition-colors"><Phone size={14} /> {t.callUs}</a>
                <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-green-500 transition-colors"><MessageCircle size={14} /> {t.whatsapp}</a>
              </div>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="hidden sm:block border border-white/40 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-500">
              {t.register}
            </button>

            {/* زر المنيو - موبايل */}
            <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* --- منيو الموبايل (Full Screen & Solid Black) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-[100] bg-black w-full h-screen overflow-hidden flex flex-col"
            >
              {/* تفاصيل جمالية خفيفة جداً في الخلفية لكسر الملل */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
              </div>

              <div className="relative z-20 flex flex-col h-full pt-40 px-10 pb-16 justify-between">
                
                {/* روابط القائمة */}
                <div className="flex flex-col gap-4">
                  {[
                    { name: t.home, path: "/", icon: <Home size={24} /> },
                    { name: t.about, path: "/about-edara", icon: <Info size={24} /> },
                    { name: t.launches, path: "/services-edara", icon: <Briefcase size={24} /> },
                  ].map((link, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: isRtl ? 50 : -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i + 0.2 }}
                    >
                      <Link 
                        to={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-6 border-b border-white/10 group active:opacity-60"
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-white/40 group-hover:text-white">{link.icon}</span>
                          <span className="text-white text-4xl font-extrabold tracking-tighter uppercase italic">
                            {link.name}
                          </span>
                        </div>
                        <ChevronRight size={24} className="text-white/20" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* الجزء السفلي: تسجيل واتصال */}
                <div className="space-y-12">
                  <motion.button 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full bg-white text-black py-6 text-sm font-black uppercase tracking-[0.4em] rounded-none shadow-2xl active:bg-gray-200 transition-colors"
                  >
                    {t.register}
                  </motion.button>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col gap-8"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <a href={`tel:+${phoneNumber}`} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 active:bg-white active:text-black transition-all">
                          <Phone size={24} />
                        </a>
                        <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 active:bg-green-600 transition-all">
                          <MessageCircle size={24} />
                        </a>
                      </div>
                      <button 
                        onClick={toggleLanguage} 
                        className="text-[12px] font-black border-2 border-white text-white px-8 py-4 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                      >
                        {t.langName}
                      </button>
                    </div>
                  </motion.div>
                </div>
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