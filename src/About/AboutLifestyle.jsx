import React from 'react';
import { motion } from 'framer-motion';

const AboutLifestyle = ({ t, isRtl }) => {
  const services = [
    { id: "01", title: t.service1, img: "https://images.unsplash.com/photo-1600607687940-47a0f9259017?q=80&w=1200" },
    { id: "02", title: t.service2, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" },
    { id: "03", title: t.service3, img: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=1200" },
    { id: "04", title: t.service4, img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200" },
  ];

  return (
    <section className="py-24 md:py-40 bg-[#050505] text-white overflow-hidden border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-[1px] bg-amber-500"></span>
              <span className="text-amber-500 tracking-[0.5em] text-[10px] md:text-xs font-black uppercase">
                {t.lifestyleTag}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-serif leading-[0.9] italic font-light"
            >
              {t.lifestyleTitle}
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 text-base md:text-lg max-w-md font-light leading-relaxed border-l border-white/10 pl-6"
          >
            {t.lifestyleDesc}
          </motion.p>
        </div>

        {/* Cinematic Services Gallery */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-[70vh] gap-4">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative flex-1 group overflow-hidden cursor-pointer min-h-[400px] lg:min-h-full transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] lg:hover:flex-[1.5]"
            >
              {/* Image Container */}
              <div className="absolute inset-0">
                <img 
                  src={service.img} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                {/* Overlay Layers */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              </div>
              
              {/* Content Box */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
                <div className="overflow-hidden">
                  <motion.span className="block text-amber-500 font-mono text-sm tracking-tighter translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    // {service.id}
                  </motion.span>
                </div>
                
                <div>
                  <h4 className="text-2xl md:text-3xl font-serif mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                    {service.title}
                  </h4>
                  
                  {/* Decorative element: Reveal more info on hover if needed, or just a line */}
                  <div className="relative h-[2px] w-full bg-white/20 overflow-hidden">
                    <div className="absolute inset-0 bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                  </div>
                </div>
              </div>

              {/* Top light effect on hover */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Background subtle text */}
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-[0.03] hidden lg:block">
        <span className="text-[10vw] font-black uppercase whitespace-nowrap tracking-tighter">
          Edara Lifestyle
        </span>
      </div>
    </section>
  );
};

export default AboutLifestyle;