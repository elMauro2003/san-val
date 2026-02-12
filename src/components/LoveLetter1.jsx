import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickOutside } from '../hooks/useClickOutside';
import LoveMessage from './LoveMessage';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const letterRef = useRef(null);

  useClickOutside(letterRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const toggleLetter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <motion.div
        ref={letterRef}
        className="relative cursor-pointer"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Sombra animada */}
        <motion.div
          className="absolute inset-0 bg-romantic-red/20 rounded-3xl blur-3xl"
          animate={{
            scale: isOpen ? 1.5 : 1,
            opacity: isOpen ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Carta principal - SIN efectos 3D problemáticos */}
        <motion.div
          className="relative w-[320px] md:w-[500px] min-h-[400px] md:min-h-[500px] bg-gradient-to-br from-white via-romantic-light to-pink-50 rounded-3xl romantic-shadow hover-glow overflow-hidden"
          animate={{
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          onClick={toggleLetter}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Frente de la carta - Aparece/desaparece con fade */}
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="front"
                className="absolute inset-0 flex flex-col items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Sello de cera animado */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-romantic-red to-red-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    rotate: isHovered ? [0, 15, -15, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white text-xl">❤️</span>
                </motion.div>

                {/* Decoración de la carta */}
                <motion.div
                  className="absolute left-4 top-4 text-4xl opacity-30"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  💌
                </motion.div>

                <motion.div
                  className="absolute right-4 bottom-4 text-4xl opacity-30"
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                  }}
                >
                  💕
                </motion.div>

                {/* Contenido principal del frente */}
                <motion.div
                  className="text-center"
                  animate={{
                    y: isHovered ? -10 : 0,
                  }}
                >
                  <motion.div
                    className="text-7xl mb-6"
                    animate={{
                      scale: isHovered ? [1, 1.3, 1] : 1,
                      rotate: isHovered ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    💝
                  </motion.div>
                  
                  <h2 className="font-romantic text-4xl md:text-5xl text-romantic-red mb-4">
                    Para ti
                  </h2>
                  
                  <p className="font-elegant text-gray-600 text-lg mb-6">
                    Con todo mi amor
                  </p>
                  
                  <motion.div
                    className="inline-block px-6 py-3 bg-gradient-to-r from-romantic-red to-romantic-pink text-white rounded-full font-romantic text-xl shadow-lg"
                    animate={{
                      scale: isHovered ? [1, 1.1, 1] : 1,
                      boxShadow: isHovered 
                        ? "0 0 30px rgba(255,107,107,0.7)" 
                        : "0 0 20px rgba(255,107,107,0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Ábreme ❤️
                  </motion.div>
                </motion.div>

                {/* Esquinas decorativas */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-romantic-red/30 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-romantic-red/30 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-romantic-red/30 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-romantic-red/30 rounded-br-3xl" />
              </motion.div>
            ) : (
              <motion.div
                key="back"
                className="absolute inset-0 bg-gradient-to-br from-white via-romantic-light to-pink-50 rounded-3xl p-6 md:p-8 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Decoración interior */}
                <div className="absolute top-2 left-2 text-3xl opacity-20 animate-pulse">
                  ✉️
                </div>
                <div className="absolute bottom-2 right-2 text-3xl opacity-20 animate-pulse">
                  💌
                </div>
                
                {/* Título del mensaje */}
                <motion.h3
                  className="font-romantic text-3xl md:text-4xl text-romantic-red mb-4 text-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Mi carta de amor
                </motion.h3>

                {/* Contenido del mensaje con scroll */}
                <div className="flex-1 overflow-hidden min-h-0">
                  <LoveMessage isOpen={isOpen} />
                </div>

                {/* Botón para cerrar */}
                <motion.button
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-romantic-red to-romantic-pink text-white rounded-full font-romantic text-lg shadow-lg hover:shadow-2xl self-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  Cerrar carta
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoveLetter;