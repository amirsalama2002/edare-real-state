import React, { useState, useEffect } from 'react'; // ضيف دول
import en from "../i18n/en.json"; // استيراد الترجمة
import ar from "../i18n/ar.json";
import AboutMain from "../About/AboutMain";
import AboutStats from "../About/AboutStats";
import AboutAjman from '../About/AboutAjman';
import AboutLifestyle from '../About/AboutLifestyle';
import AboutVision from '../About/AboutVision';

export default function About() {
  // 1. إدارة اللغة في الصفحة الأب
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');

  useEffect(() => {
    const handleStorage = () => setLang(localStorage.getItem('appLang') || 'en');
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 500); // للتأكد من التزامن
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const t = lang === 'en' ? en : ar;
  const isRtl = lang === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 2. لازم تبعت t و isRtl لكل سكشن عشان يقرأ من الـ JSON */}
      <AboutMain t={t} isRtl={isRtl} />
      <AboutStats t={t} isRtl={isRtl} />
      <AboutAjman t={t} isRtl={isRtl} />
      {/* <AboutLifestyle t={t} isRtl={isRtl} /> */}
      <AboutVision t={t} isRtl={isRtl} />
    </div>
  );
}