import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import carrousel1 from "./carrousel.svg";
import carrousel2_mobile from "./stret1.svg";
import carrousel2 from "./carrousela.svg";
import red_sneaker_pc from "./tenis-vermelho-pc.png";
import mobile_carrousel1 from "./stret-red.svg";
import tenis_red_mobile from './tenis-red-mobile.svg'
import tenis_amarelo_pc from './tenis-amarelo-pcV1.png'
import yellow_sneaker_mobile from './tenis_amarelo_mobileV2.png'

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
  image_mobile: string;
  image2?: string;
  image_mobile2?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Referência em Streetwear",
    subtitle: "Onde a essência vale mais que a aparência!",
    description: "",
    cta: "",
    image: carrousel1,
    image_mobile: mobile_carrousel1,
    image2: carrousel2,
    image_mobile2: carrousel2_mobile,
  },
  {
    id: 2,
    title: "Frete Grátis para todo Brasil",
    subtitle: "Autenticidade não se compra, se veste!",
    description: "",
    cta: "",
    image: red_sneaker_pc,
    image_mobile: tenis_red_mobile,
    image2: tenis_amarelo_pc,
    image_mobile2: yellow_sneaker_mobile
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const { isDarkMode } = useStore();

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: {
      opacity: 0
    },
    center: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  };

  const getSlideImage = (slide: Slide): string => {
    if (window.innerWidth < 768) {
      return isDarkMode ? slide.image_mobile || slide.image : slide.image_mobile2 || slide.image;
    }
    return isDarkMode ? slide.image : slide.image2 || slide.image;
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', duration: 0.8 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${getSlideImage(slides[currentSlide])})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {slides[currentSlide].title}
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-6 md:mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {slides[currentSlide].subtitle}
            </motion.p>
           
          </div>
        </motion.div>
      </AnimatePresence>
      
    
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
