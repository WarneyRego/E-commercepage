import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, CreditCard, ArrowLeft, Trash2, CheckCircle } from "lucide-react";
import { useStore } from "../store/useStore";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasItems = cart.length > 0;

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      cart.forEach((item) => removeFromCart(item.id));
      setIsCheckingOut(false);
      setPaymentSuccess(false);
      setIsCartOpen(false);
    }, 2000);
  };

  const handleBackToCart = () => {
    setIsCheckingOut(false);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
    setIsCheckingOut(false);
    setPaymentSuccess(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isCheckingOut && !paymentSuccess && handleCloseCart()}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[#f8f7f4] dark:bg-[#0a0a0a] shadow-xl z-[101] overflow-hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {!isCheckingOut && !paymentSuccess && (
              <>
                <div className="p-3 sm:p-4 border-b border-light-border dark:border-[#1a1a1a] flex items-center justify-between bg-gradient-to-r from-[#f8f7f4] to-[#f5f2ed] dark:from-[#0a0a0a] dark:to-[#121212]">
                  <h2 className="text-lg sm:text-xl font-bold">Seu Carrinho</h2>
                  <button
                    onClick={handleCloseCart}
                    className="p-2 rounded-full hover:bg-light-border/20 dark:hover:bg-[#1a1a1a]/30 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gradient-to-b from-[#f8f7f4] to-[#f5f2ed]/30 dark:from-[#0a0a0a] dark:to-[#121212]/30">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-6">
                      <ShoppingBag className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 dark:text-gray-700 mb-3 sm:mb-4" />
                      <h3 className="text-lg sm:text-xl font-medium mb-2">Seu carrinho está vazio</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                        Adicione alguns produtos para começar suas compras.
                      </p>
                      <motion.button
                        onClick={handleCloseCart}
                        className="px-4 sm:px-6 py-2.5 bg-light-accent dark:bg-red-600 text-white rounded-lg text-sm sm:text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continuar Comprando
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          className="flex gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl bg-[#faf9f6]/80 dark:bg-[#121212]/80 backdrop-blur-sm border border-light-border dark:border-[#1a1a1a] shadow-sm"
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                        >
                          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-[#1a1a1a]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-xs sm:text-sm line-clamp-2">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-xs sm:text-sm">
                                R${item.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-light-border dark:border-[#1a1a1a] rounded-lg overflow-hidden">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(item.id, item.quantity - 1);
                                  }}
                                  disabled={item.quantity <= 1}
                                  className="px-2 py-1 bg-light-border/30 dark:bg-[#1a1a1a]/50 text-xs sm:text-sm disabled:opacity-50"
                                >
                                  -
                                </button>
                                <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm">{item.quantity}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(item.id, item.quantity + 1);
                                  }}
                                  className="px-2 py-1 bg-light-border/30 dark:bg-[#1a1a1a]/50 text-xs sm:text-sm"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromCart(item.id);
                                }}
                                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                
                {cart.length > 0 && (
                  <div className="p-3 sm:p-4 border-t border-light-border dark:border-[#1a1a1a] bg-gradient-to-b from-[#f5f2ed]/50 to-[#f8f7f4] dark:from-[#121212]/50 dark:to-[#0a0a0a]">
                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Subtotal:</span>
                        <span>R${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Frete:</span>
                        <span>{total >= 300 ? "Grátis" : "R$ 19,90"}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm sm:text-base">
                        <span>Total:</span>
                        <span>R${(total >= 300 ? total : total + 19.9).toFixed(2)}</span>
                      </div>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckout();
                      }}
                      className="w-full py-3 bg-light-accent dark:bg-red-600 text-white rounded-lg font-medium relative overflow-hidden group text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Finalizar Compra</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-red-500 dark:to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </motion.button>
                  </div>
                )}
              </>
            )}

            {isCheckingOut && !paymentSuccess && (
              <>
                <div className="p-3 sm:p-4 border-b border-light-border dark:border-[#1a1a1a] flex items-center justify-between bg-gradient-to-r from-[#f8f7f4] to-[#f5f2ed] dark:from-[#0a0a0a] dark:to-[#121212]">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBackToCart();
                      }}
                      className="p-2 mr-2 rounded-full hover:bg-light-border/20 dark:hover:bg-[#1a1a1a]/30 transition-colors"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <h2 className="text-lg sm:text-xl font-bold">Finalizar Compra</h2>
                  </div>
                  <button
                    onClick={handleCloseCart}
                    className="p-2 rounded-full hover:bg-light-border/20 dark:hover:bg-[#1a1a1a]/30 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gradient-to-b from-[#f8f7f4] to-[#f5f2ed]/30 dark:from-[#0a0a0a] dark:to-[#121212]/30">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-[#faf9f6]/80 dark:bg-[#121212]/80 p-3 sm:p-4 rounded-xl border border-light-border dark:border-[#1a1a1a]">
                      <h3 className="font-medium mb-2 sm:mb-3">Resumo do Pedido</h3>
                      <div className="space-y-1 sm:space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Itens ({cart.length}):</span>
                          <span>R${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Frete:</span>
                          <span>{total >= 300 ? "Grátis" : "R$ 19,90"}</span>
                        </div>
                        <div className="pt-2 border-t border-light-border dark:border-[#1a1a1a] mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>R${(total >= 300 ? total : total + 19.9).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#faf9f6]/80 dark:bg-[#121212]/80 p-3 sm:p-4 rounded-xl border border-light-border dark:border-[#1a1a1a]">
                      <h3 className="font-medium mb-2 sm:mb-3">Informações de Pagamento</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs sm:text-sm mb-1 text-gray-600 dark:text-gray-400">Número do Cartão</label>
                          <input 
                            type="text" 
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-light-border dark:border-[#222222] text-sm focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-red-600"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs sm:text-sm mb-1 text-gray-600 dark:text-gray-400">Validade</label>
                            <input 
                              type="text" 
                              placeholder="MM/AA"
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-light-border dark:border-[#222222] text-sm focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-red-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm mb-1 text-gray-600 dark:text-gray-400">CVV</label>
                            <input 
                              type="text" 
                              placeholder="123"
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-light-border dark:border-[#222222] text-sm focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-red-600"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm mb-1 text-gray-600 dark:text-gray-400">Nome no Cartão</label>
                          <input 
                            type="text" 
                            placeholder="Nome completo"
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-light-border dark:border-[#222222] text-sm focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-red-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 border-t border-light-border dark:border-[#1a1a1a] bg-gradient-to-b from-[#f5f2ed]/50 to-[#f8f7f4] dark:from-[#121212]/50 dark:to-[#0a0a0a]">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePayment();
                    }}
                    className="w-full py-3 bg-light-accent dark:bg-red-600 text-white rounded-lg font-medium relative overflow-hidden group text-sm sm:text-base flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CreditCard size={18} className="mr-2" />
                    <span className="relative z-10">Pagar R${(total >= 300 ? total : total + 19.9).toFixed(2)}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-red-500 dark:to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.button>
                </div>
              </>
            )}

            {paymentSuccess && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  className="mb-6 text-green-500 dark:text-green-400"
                >
                  <CheckCircle size={64} />
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Pagamento Confirmado!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Seu pedido foi processado com sucesso.
                </p>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaymentSuccess(false);
                    setIsCheckingOut(false);
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-3 bg-light-accent dark:bg-red-600 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continuar Comprando
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
