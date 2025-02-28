import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ShoppingBag, Sun, Menu, X } from "lucide-react";
import { useStore } from "../store/useStore";

interface NavbarProps {
  activeSection?: string;
  scrollToSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection = 'inicio', scrollToSection }) => {
  const { isDarkMode, toggleDarkMode, cart, setIsCartOpen } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Prevenir scroll quando o menu mobile estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header 
      className={` top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-[#f8f7f4]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md shadow-sm' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-light-accent to-amber-500 dark:from-red-600 dark:to-red-400 bg-clip-text text-transparent"
          >
            Bear
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <a 
            href="#inicio" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'inicio' 
                ? 'text-light-accent dark:text-red-500' 
                : 'text-gray-600 dark:text-gray-300 hover:text-light-accent dark:hover:text-red-500 hover:bg-light-accent/5 dark:hover:bg-red-500/5'
            }`}
          >
            Início
          </a>
          <a 
            href="#produtos" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('produtos');
            }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'produtos' 
                ? 'text-light-accent dark:text-red-500' 
                : 'text-gray-600 dark:text-gray-300 hover:text-light-accent dark:hover:text-red-500 hover:bg-light-accent/5 dark:hover:bg-red-500/5'
            }`}
          >
            Produtos
          </a>
          <a 
            href="#novidades" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('novidades');
            }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'novidades' 
                ? 'text-light-accent dark:text-red-500' 
                : 'text-gray-600 dark:text-gray-300 hover:text-light-accent dark:hover:text-red-500 hover:bg-light-accent/5 dark:hover:bg-red-500/5'
            }`}
          >
            Novidades
          </a>
          <a 
            href="#contato" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contato');
            }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'contato' 
                ? 'text-light-accent dark:text-red-500' 
                : 'text-gray-600 dark:text-gray-300 hover:text-light-accent dark:hover:text-red-500 hover:bg-light-accent/5 dark:hover:bg-red-500/5'
            }`}
          >
            Contato
          </a>
        </nav>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-light-accent/10 dark:hover:bg-red-500/10 transition-colors"
            aria-label="Alternar tema"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-light-accent/10 dark:hover:bg-red-500/10 transition-colors relative"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-light-accent dark:bg-red-600 text-white text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-light-accent/10 dark:hover:bg-red-500/10 transition-colors md:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#f8f7f4] dark:bg-[#0a0a0a] z-50 flex flex-col"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('inicio');
                  setIsMenuOpen(false);
                }}
                className="text-xl font-bold bg-gradient-to-r from-light-accent to-amber-500 dark:from-red-600 dark:to-red-400 bg-clip-text text-transparent"
              >
                Bear
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-light-accent/10 dark:hover:bg-red-500/10 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center space-y-6 p-4">
              <a 
                href="#inicio" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('inicio');
                  setIsMenuOpen(false);
                }}
                className={`text-xl font-medium ${
                  activeSection === 'inicio' 
                    ? 'text-light-accent dark:text-red-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Início
              </a>
              <a 
                href="#produtos" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('produtos');
                  setIsMenuOpen(false);
                }}
                className={`text-xl font-medium ${
                  activeSection === 'produtos' 
                    ? 'text-light-accent dark:text-red-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Produtos
              </a>
              <a 
                href="#novidades" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('novidades');
                  setIsMenuOpen(false);
                }}
                className={`text-xl font-medium ${
                  activeSection === 'novidades' 
                    ? 'text-light-accent dark:text-red-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Novidades
              </a>
              <a 
                href="#contato" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contato');
                  setIsMenuOpen(false);
                }}
                className={`text-xl font-medium ${
                  activeSection === 'contato' 
                    ? 'text-light-accent dark:text-red-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Contato
              </a>
            </div>
            
            <div className="container mx-auto px-4 py-6 flex justify-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-lg bg-light-accent/10 dark:bg-red-500/10 text-light-accent dark:text-red-500 transition-colors"
                aria-label="Alternar tema"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="p-3 rounded-lg bg-light-accent/10 dark:bg-red-500/10 text-light-accent dark:text-red-500 transition-colors relative"
                aria-label="Abrir carrinho"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-light-accent dark:bg-red-600 text-white text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
