import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Tag, Heart, Filter, ChevronDown, Truck, Clock, Percent, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Product } from '../types';
import street from './streetweare.png'
import street2 from './streetye.png'
import Banner from './Banner';

const categories = [
  { id: 'all', name: 'Todos os itens', icon: Tag },
  { id: 'men', name: 'Tênis', icon: Tag },
  { id: 'women', name: 'Jaquetas e Moletons', icon: Tag },
  { id: 'accessories', name: 'Acessórios', icon: Tag },
];

const products: Product[] = [
  {
    id: '1',
    name: 'New Balance 237',
    price: 346.55,
    description: 'É confeccionado em couro camurça com recortes em material têxtil',
    image: 'https://cdn.dooca.store/1290/products/237-linem-off-white-4_640x640+fill_ffffff.jpg?v=1712168303&webp=0',
    category: 'men',
    rating: 4.3,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['white', 'black', 'gray']
  },
  {
    id: '2',
    name: 'Nike Court Vision Mid Branco',
    price: 409.99,
    description: 'Substituindo o couro por materiais sintéticos ele é confeccionado com pelo menos 20% de materiais reciclados',
    image: 'https://cdn.dooca.store/1290/products/tenis-1_1600x1600+fill_ffffff.jpg?v=1681236150',
    category: 'men',
    rating: 4.8,
    sizes: ['S', 'M', 'L'],
    colors: ['black', 'brown']
  },
  {
    id: '3',
    name: 'Corteiz x Nike Air Max 95 "Gutta Green"',
    price: 399.99,
    description: 'Projetado em conjunto com a marca de streetwear com sede em Londres, o Corteiz x Nike Air Max 95 SP',
    image: 'https://acdn.mitiendanube.com/stores/002/944/067/products/design-sem-nome-6730f409e81e31e6bb17188064430060-1024-1024.webp',
    category: 'men',
    rating: 3.7,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['blue', 'red', 'white']
  },
  {
    id: '4',
    name: 'Moletom TheSaint x Tsubasa Crewneck Overhead Kick (Off White)',
    price: 159.99,
    description: 'A peça é confeccionada em tecido de alta qualidade, unindo estilo e durabilidade',
    image: 'https://s.hipnoise.com.br/product/2024/12/tsaint-55.jpg',
    category: 'women',
    rating: 4.7,
    sizes: ['ONE SIZE'],
    colors: ['black', 'gold']
  },
  {
    id: '5',
    name: 'Jaqueta TheSaint Jeans Estonada Oversized',
    price: 199.99,
    description: 'Apresenta caimento mais amplo, dando uma sensação de estar usando um número maior.',
    image: 'https://s.hipnoise.com.br/product/2024/05/tsaint-020.jpg',
    category: 'women',
    rating: 4.4,
    sizes: ['30', '32', '34', '36'],
    colors: ['blue', 'black']
  },
  {
    id: '6',
    name: 'Shoulder Bag - Indomável 1/1',
    price: 89.99,
    description: 'Shoulder Bag em material sintético dublado e forro em nylon 600 impermeável. ',
    image: 'https://thumb.braavo.me/alltribe/1000/2627913136.webp',
    category: 'accessories',
    rating: 4.4,
    sizes: ['30', '32', '34', '36'],
    colors: ['blue', 'black']
  },
  {
    id: '7',
    name: 'Adidas Forum Low Branco e Azul',
    price: 499.99,
    description: 'O tênis Adidas Forum Low combina estilo retrô com conforto moderno, perfeito para o dia a dia.',
    image: 'https://authenticfeet.vteximg.com.br/arquivos/ids/276142-1000-1000/GY5833-1.jpg',
    category: 'men',
    rating: 4.7,
    sizes: ['39', '40', '41', '42', '43'],
    colors: ['white', 'blue']
  },
 

 
  {
    id: '13',
    name: 'Puma Suede Classic XXI Vermelho',
    price: 379.99,
    description: 'O clássico Puma Suede agora com uma versão atualizada, mantendo o estilo icônico com mais conforto.',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/374915/05/sv01/fnd/BRA/fmt/png/Suede-Classic-XXI-Sneakers',
    category: 'men',
    rating: 4.5,
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: ['red', 'white']
  },
  
  
];


interface Filters {
  priceRange: [number, number]; 
  rating: number | null;
  category: string[];
}

const ProductGrid = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('popular');
  const [priceRange, setPriceRange] = useState(1000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { 
    isDarkMode, 
    addToCart, 
    filters, 
    setFilters,
    searchQuery, 
    setIsCartOpen, 
    selectedCategory, 
    setSelectedCategory 
  } = useStore();

  // Inicialização de filtros
  const initialFilters: Filters = {
    priceRange: [0, 1000],
    rating: 0,
    category: []
  };


  useEffect(() => {

    setFilters({
      priceRange: [0, 1000],
      rating: 0,
      category: []
    });
  }, [setFilters]);

  useEffect(() => {
    if (filters) {
      setPriceRange(filters.priceRange[1] || 1000);
      setRatingFilter(filters.rating || 0);
    }
  }, [filters]);

  // Corrigindo a lógica de filtragem
  const filteredProducts = products.filter(product => {
    // Filtro de categoria
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    
    // Filtro de preço
    if (product.price > priceRange) return false;
    
    // Filtro de avaliação
    if (ratingFilter > 0 && product.rating < ratingFilter) return false;
    
    // Filtro de tamanho
    if (selectedSize && !product.sizes.includes(selectedSize)) return false;
    
    // Filtro de busca
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default: // popular
        return 0; // Keep original order
    }
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleRatingClick = (rating: number) => {
    setRatingFilter(prevRating => prevRating === rating ? 0 : rating);
  };

  // Corrigindo a função de atualização de preço
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(prevSize => prevSize === size ? null : size);
  };



  return (
    <>
      {/* Banner promocional */}
      <div className="relative h-[200px] md:h-[300px] mb-8 md:mb-12 rounded-2xl md:rounded-3xl overflow-hidden group shadow-hover">
        <img 
          src={isDarkMode ? street : street2} 
          alt="Special Offer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
          <div className="p-4 md:p-8 text-white max-w-md">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
             
            </motion.h2>
         
          </div>
        </div>
      </div>
   
      {/* Categorias */}
      <div className="mb-4 md:mb-8 overflow-x-auto">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-1 md:p-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {categories.map(({ id, name, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`flex items-center justify-center space-x-1 md:space-x-2 py-2 md:py-3 px-2 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                selectedCategory === id 
                  ? 'bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent border border-light-accent/30 dark:border-dark-accent/30' 
                  : 'bg-white/90 dark:bg-dark-secondary/90 hover:bg-light-accent/5 dark:hover:bg-dark-accent/5 border border-light-border dark:border-dark-border'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={14} className={`md:w-4 md:h-4 ${selectedCategory === id ? 'text-light-accent dark:text-dark-accent' : ''}`} />
              <span className="truncate">{name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Filtros e ordenação */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 md:gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
      

          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1 md:space-x-2 py-2 px-3 rounded-lg bg-white/90 dark:bg-dark-secondary/90 border border-light-border dark:border-dark-border text-xs sm:text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Filter size={14} className="sm:w-4 sm:h-4" />
            <span>Filtros</span>
            <ChevronDown size={14} className={`sm:w-4 sm:h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </motion.button>

          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <span className="text-light-text/70 dark:text-dark-text/70 hidden sm:inline">Ordenar por:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="py-2 px-3 rounded-lg bg-white/90 dark:bg-dark-secondary/90 border border-light-border dark:border-dark-border focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent text-xs sm:text-sm"
            >
              <option value="popular">Mais populares</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
              <option value="rating">Melhor avaliação</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {sortedProducts.length} produtos encontrados
          </div>
        </div>
      </div>
      
      {/* Painel de filtros */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="mb-4 md:mb-6 bg-white/90 dark:bg-dark-secondary/90 rounded-xl p-3 sm:p-4 md:p-6 border border-light-border dark:border-dark-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {/* Filtro de preço */}
              <div>
                <h3 className="text-sm md:text-base font-medium mb-2 sm:mb-3">Preço</h3>
                <div className="flex flex-col space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    className="w-full h-2 accent-light-accent dark:accent-dark-accent"
                  />
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>R$ 0</span>
                    <span>R$ {priceRange}</span>
                  </div>
                </div>
              </div>

             

              {/* Filtro de avaliação */}
              <div>
                <h3 className="text-sm md:text-base font-medium mb-2 sm:mb-3">Avaliação</h3>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className="focus:outline-none p-1"
                    >
                      <Star
                        size={18}
                        className={`${
                          star <= ratingFilter
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs sm:text-sm">
                    {ratingFilter > 0 ? `${ratingFilter}+ estrelas` : 'Todas'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <motion.button
                onClick={() => {
                  setRatingFilter(0);
                  setPriceRange(1000);
                  setSelectedSize(null);
                }}
                className="text-xs sm:text-sm text-light-accent dark:text-dark-accent hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Limpar filtros
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    
      {/* Grid de produtos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white dark:bg-dark-secondary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-light-border dark:border-dark-border group"
            whileHover={{ y: -5 }}
            onHoverStart={() => setHoveredProduct(product.id)}
            onHoverEnd={() => setHoveredProduct(null)}
          >
            {/* Imagem do produto */}
            <div className="relative h-32 sm:h-48 md:h-56 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Botões de ação */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="p-2 rounded-full bg-white/80 dark:bg-dark-primary/80 backdrop-blur-sm shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    size={16}
                    className={`${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </motion.button>
              </div>
              
              {/* Badge de frete grátis */}
              {product.id === '1' && (
                <div className="absolute bottom-2 left-2 bg-green-500/90 text-white text-[10px] sm:text-xs px-2 py-1 rounded-md flex items-center space-x-1">
                  <Truck size={12} className="sm:w-3 sm:h-3" />
                  <span>Frete Grátis</span>
                </div>
              )}
              
              {/* Badge de promoção */}
              {product.id === '3' && (
                <div className="absolute bottom-2 left-2 bg-red-500/90 text-white text-[10px] sm:text-xs px-2 py-1 rounded-md flex items-center space-x-1">
                  <Percent size={12} className="sm:w-3 sm:h-3" />
                  <span>-15%</span>
                </div>
              )}
            </div>
            
            {/* Informações do produto */}
            <div className="p-2 sm:p-3 md:p-4">
              <div className="flex items-center space-x-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={`${
                      i < product.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-1">
                  ({product.rating})
                </span>
              </div>
              
              <h3 className="font-medium text-xs sm:text-sm md:text-base line-clamp-2 mb-1 sm:mb-2 min-h-[2.5rem] sm:min-h-[2.75rem]">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs sm:text-sm md:text-base">
                    R${product.price.toFixed(2)}
                  </span>
                  {product.id === '3' && (
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 line-through ml-1">
                      R$129,90
                    </span>
                  )}
                </div>
                
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="p-2 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart size={16} className="sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;