import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { useStore } from './store/useStore';
import { Truck, CreditCard, ShieldCheck, ArrowUp, Sparkles, Gift } from 'lucide-react';

function App() {
  const { isDarkMode } = useStore();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      // Detectar seção ativa para animações
      const sections = ['inicio', 'produtos', 'novidades', 'contato'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop;
      const navbarHeight = 80; // Altura aproximada da navbar
      
      window.scrollTo({
        top: offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  // Variantes de animação para seções
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-500 
      ${isDarkMode 
        ? 'bg-dark-bg text-dark-text bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0a0a0a]' 
        : 'bg-[#f8f7f4] text-light-text bg-gradient-to-br from-[#f8f7f4] via-[#faf9f6] to-[#f8f7f4]'}`}>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Padrões de fundo para tema claro */}
        {!isDarkMode && (
          <>
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(245,158,11,0.2),transparent)]"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(circle_800px_at_0%_300px,rgba(245,158,11,0.2),transparent)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full opacity-5 bg-[radial-gradient(circle_800px_at_100%_80%,rgba(245,158,11,0.2),transparent)]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNWYzZjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoNnYzMGgtNlYzMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-[0.03]"></div>
          </>
        )}
        
        {/* Padrões de fundo para tema escuro */}
        {isDarkMode && (
          <>
            <div className="absolute top-0 left-0 w-full h-full opacity-15 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(229,62,62,0.25),transparent)]"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-15 bg-[radial-gradient(circle_800px_at_0%_300px,rgba(220,38,38,0.25),transparent)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full opacity-15 bg-[radial-gradient(circle_800px_at_100%_80%,rgba(185,28,28,0.25),transparent)]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEzMzAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoNnYzMGgtNlYzMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-[0.05]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]"></div>
            
            {/* Animação de pulso vermelho */}
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-600/5 animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-700/5 animate-pulse-slow delay-1000"></div>
            
            {/* Linhas vermelhas animadas */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/20 to-transparent animate-glow"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-700/20 to-transparent animate-glow-reverse"></div>
          </>
        )}
      </div>
      
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main className="container mx-auto px-3 sm:px-4 py-6 md:py-8 relative z-10 flex-grow">
        {/* Seção Início */}
        <motion.section 
          id="inicio" 
          className="mb-16 md:mb-24 relative pt-16 md:pt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full blur-3xl z-0"></div>
          
          <motion.div className="relative z-10" variants={itemVariants}>
            <HeroSlider />
          </motion.div>
          
          <motion.div 
            className="mt-8 md:mt-12 flex justify-center"
            variants={itemVariants}
          >
         
          </motion.div>
        </motion.section>
        
        {/* Products Section */}
        <section id="produtos" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Produtos</h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                Descubra nossa coleção de produtos de alta qualidade, projetados para proporcionar conforto e estilo.
              </p>
            </div>
            
            <ProductGrid />
          </div>
        </section>
        
        {/* Seção Novidades */}
        <motion.section 
          id="novidades" 
          className="mb-16 md:mb-24 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl z-0"></div>
          
          {isDarkMode && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/3 right-10 w-1 h-20 bg-gradient-to-b from-red-500/0 via-red-500/20 to-red-500/0"></div>
              <div className="absolute top-2/3 left-10 w-1 h-20 bg-gradient-to-b from-red-600/0 via-red-600/20 to-red-600/0"></div>
              <div className="absolute bottom-20 right-1/4 w-20 h-1 bg-gradient-to-r from-red-700/0 via-red-700/20 to-red-700/0"></div>
            </div>
          )}
          
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-block px-4 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-sm font-medium">
                Vantagens exclusivas
              </span>
            </div>
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Por que escolher a Bear?
            </motion.h2>
            <motion.p 
              className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 md:mb-12 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Oferecemos uma experiência de compra única, com benefícios exclusivos para nossos clientes.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-[#faf9f6]/90 dark:bg-[#121212]/90 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center border border-light-border dark:border-dark-border relative overflow-hidden group backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-light-accent/5 to-transparent dark:from-red-600/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-light-accent/10 dark:bg-red-600/10 p-4 rounded-xl mb-6 relative z-10">
                <Truck className="w-8 h-8 text-light-accent dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Frete Grátis</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10 text-sm md:text-base">Em compras acima de R$ 300, entregamos em todo o Brasil sem custo adicional.</p>
              <motion.div 
                className="w-full h-1 bg-gradient-to-r from-light-accent to-amber-500 dark:from-red-600 dark:to-red-400 rounded-full mt-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </motion.div>

            <motion.div 
              className="bg-[#faf9f6]/90 dark:bg-[#121212]/90 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center border border-light-border dark:border-dark-border relative overflow-hidden group backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-light-accent/5 to-transparent dark:from-red-600/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-light-accent/10 dark:bg-red-600/10 p-4 rounded-xl mb-6 relative z-10">
                <CreditCard className="w-8 h-8 text-light-accent dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Pagamento Seguro</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10 text-sm md:text-base">Parcele suas compras em até 12x sem juros, com total segurança nas transações.</p>
              <motion.div 
                className="w-full h-1 bg-gradient-to-r from-light-accent to-amber-500 dark:from-red-600 dark:to-red-400 rounded-full mt-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 0.8 }}
              ></motion.div>
            </motion.div>

            <motion.div 
              className="bg-[#faf9f6]/90 dark:bg-[#121212]/90 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center border border-light-border dark:border-dark-border relative overflow-hidden group backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-light-accent/5 to-transparent dark:from-red-600/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-light-accent/10 dark:bg-red-600/10 p-4 rounded-xl mb-6 relative z-10">
                <ShieldCheck className="w-8 h-8 text-light-accent dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Compra Garantida</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10 text-sm md:text-base">7 dias para troca ou devolução, garantindo sua satisfação com nossos produtos.</p>
              <motion.div 
                className="w-full h-1 bg-gradient-to-r from-light-accent to-amber-500 dark:from-red-600 dark:to-red-400 rounded-full mt-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.9, duration: 0.8 }}
              ></motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-10 md:mt-16 p-6 md:p-8 mx-4 md:mx-0 bg-gradient-to-r from-light-accent/20 to-amber-500/20 dark:from-red-600/10 dark:to-red-500/5 rounded-2xl shadow-lg border border-light-border/50 dark:border-dark-border/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-light-accent dark:bg-red-600 rounded-full">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold">Ganhe 10% de desconto</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Na sua primeira compra ao se cadastrar</p>
                </div>
              </div>
              <motion.button 
                className="w-full md:w-auto px-6 py-3 bg-light-accent dark:bg-red-600 text-white rounded-xl shadow-md hover:shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode && (
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/0 via-red-500/30 to-red-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                )}
                <span className="relative z-10">Cadastre-se agora</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
        
        {/* Contact Section */}
        <section id="contato" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Suporte ao cliente</h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                Estamos aqui para ajudar. Envie-nos uma mensagem e responderemos o mais breve possível.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <form className="bg-white dark:bg-[#0f0f0f] rounded-xl p-6 md:p-8 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-red-500"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-red-500"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-red-500"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-red-500"
                    placeholder="Sua mensagem"
                  ></textarea>
                </div>
                
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-amber-600 dark:hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      {/* Botão de voltar ao topo */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-amber-500 dark:bg-red-600 text-white shadow-lg z-40"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Voltar ao topo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      
      <Footer />
      <Cart />
    </div>
  );
}

export default App;