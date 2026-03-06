import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // هذا السطر يرجع الصفحة للبداية فوراً
    window.scrollTo(0, 0);
  }, [pathname]); // سيعمل الكود كلما تغير مسار الصفحة (Link)

  return null;
};

export default ScrollToTop;