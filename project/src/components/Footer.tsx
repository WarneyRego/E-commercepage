import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useStore } from "../store/useStore";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className={`w-full mt-auto py-8 md:py-12 relative ${
      isDarkMode 
        ? 'bg-[#0a0a0a] border-t border-[#1a1a1a]' 
        : 'bg-[#f5f2ed] border-t border-light-border'
    }`}>
      {isDarkMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-10 w-1 h-20 bg-gradient-to-b from-red-500/0 via-red-500/20 to-red-500/0"></div>
          <div className="absolute top-2/3 left-10 w-1 h-20 bg-gradient-to-b from-red-600/0 via-red-600/20 to-red-600/0"></div>
          <div className="absolute bottom-20 right-1/4 w-20 h-1 bg-gradient-to-r from-red-700/0 via-red-700/20 to-red-700/0"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-light-accent to-amber-500 dark:from-red-600 dark:to-red-400 bg-clip-text text-transparent">Bear</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Oferecemos produtos de alta qualidade com design exclusivo e preços acessíveis.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-light-accent/10 dark:bg-red-600/10 flex items-center justify-center text-light-accent dark:text-red-500 hover:bg-light-accent/20 dark:hover:bg-red-600/20 transition-colors">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-light-accent/10 dark:bg-red-600/10 flex items-center justify-center text-light-accent dark:text-red-500 hover:bg-light-accent/20 dark:hover:bg-red-600/20 transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-light-accent/10 dark:bg-red-600/10 flex items-center justify-center text-light-accent dark:text-red-500 hover:bg-light-accent/20 dark:hover:bg-red-600/20 transition-colors">
                <FaTwitter size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-red-500 transition-colors">Início</a>
              </li>
              <li>
                <a href="#produtos" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-red-500 transition-colors">Produtos</a>
              </li>
              <li>
                <a href="#novidades" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-red-500 transition-colors">Novidades</a>
              </li>
              <li>
                <a href="#contato" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-red-500 transition-colors">Contato</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Informações</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-red-500 transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-red-500 transition-colors">Política de Privacidade</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-red-500 transition-colors">Termos e Condições</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-light-accent dark:hover:text-red-500 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5 text-light-accent dark:text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">Av. Paulista, 1000, São Paulo - SP</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-light-accent dark:text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-light-accent dark:text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">contato@bear.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock size={16} className="text-light-accent dark:text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">Seg - Sex: 9h às 18h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-light-border dark:border-[#1a1a1a] text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2023 Bear. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
