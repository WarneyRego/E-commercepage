import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

function Banner(){
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isDarkMode = useStore((state) => state.isDarkMode);

  // Verificar se o dispositivo é mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

return(
<div className="relative w-full h-[140px] sm:h-[180px] md:h-[250px] center mb-3 sm:mb-5 md:mb-8 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md">
    <img 
      src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
      alt="Special Offer"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-2 sm:p-4 md:p-8">
      <div className="text-white max-w-[80%] sm:max-w-[70%] md:max-w-[60%]">
        <motion.h2 
          className="text-base sm:text-xl md:text-3xl font-bold mb-1 md:mb-3 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Promoção de Verão
        </motion.h2>
        <motion.p 
          className="text-xs sm:text-sm md:text-lg mb-2 md:mb-4 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isMobile ? 'Até 50% OFF' : 'Mais de 50% de Desconto em Produtos Selecionados'}
        </motion.p>
        <motion.div
          className="inline-block bg-[#faf9f6] dark:bg-dark-accent text-dark-bg dark:text-white px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Use o código: SUMMER50
        </motion.div>
      </div>
    </div>
  </div>
)

}export default Banner;