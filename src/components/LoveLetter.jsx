import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickOutside } from '../hooks/useClickOutside';
import LoveMessage from './LoveMessage';
import ValentineGame from './ValentineGame';
import AcceptanceModal from './AcceptanceModal';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const letterRef = useRef(null);
  const contentRef = useRef(null);

  // Detectar altura de la ventana para responsive
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useClickOutside(letterRef, () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        setShowGame(false);
        setShowAcceptanceModal(false);
      }, 300);
    }
  });

  const toggleLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleAccept = () => {
    setShowGame(false);
    setShowAcceptanceModal(true);
  };

  const handleCloseAcceptanceModal = () => {
    setShowAcceptanceModal(false);
  };

  const handleBackToLetter = () => {
    setShowGame(false);
  };

  // Calcular altura dinámica basada en el contenido
  const getLetterHeight = () => {
    if (!isOpen) return '400px';
    if (showAcceptanceModal) return '500px';
    if (showGame) return '550px';
    return '500px';
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-y-auto">
      <motion.div
        ref={letterRef}
        className="relative cursor-pointer my-8"
        animate={{
          scale: isHovered && !isOpen ? 1.05 : 1,
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

        {/* Carta principal - SIN overflow hidden para permitir scroll */}
        <motion.div
          className="relative w-[320px] md:w-[500px] bg-gradient-to-br from-white via-romantic-light to-pink-50 rounded-3xl romantic-shadow hover-glow"
          animate={{
            scale: isOpen ? 1.1 : 1,
            height: getLetterHeight(),
          }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          onClick={!isOpen ? toggleLetter : undefined}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{ overflow: 'visible' }}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* FRENTE DE LA CARTA */
              <motion.div
                key="front"
                className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl"
                style={{ 
                  background: 'inherit',
                  overflow: 'hidden'
                }}
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
                    Para ti mi amor <br /> ;)
                  </h2>
                  
                  <p className="font-elegant text-gray-600 text-lg mb-6">
                    {/* Con mucho cariño ;) */}
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
              /* INTERIOR DE LA CARTA */
              <motion.div
                key="back"
                className="absolute inset-0 bg-gradient-to-br from-white via-romantic-light to-pink-50 rounded-3xl p-6 md:p-8 flex flex-col"
                style={{ 
                  background: 'inherit',
                  overflow: 'visible'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Decoración interior */}
                <div className="absolute top-2 left-2 text-3xl opacity-20">
                  ✉️
                </div>
                <div className="absolute bottom-2 right-2 text-3xl opacity-20">
                  💌
                </div>
                
                {/* Título del mensaje */}
                <motion.h3
                  className="font-romantic text-3xl md:text-4xl text-romantic-red mb-4 text-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  💌
                </motion.h3>

                {/* Contenedor con scroll SOLO para el mensaje de texto */}
                <AnimatePresence mode="wait">
                  {!showGame ? (
                    <motion.div
                      key="message"
                      className="flex-1 flex flex-col"
                      style={{ minHeight: 0 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Scroll SOLO aquí, en el mensaje */}
                      <div className="flex-1 overflow-y-auto min-h-0 pr-2" style={{ maxHeight: '300px' }}>
                        <LoveMessage isOpen={isOpen} />
                      </div>
                      
                      {/* Botón fijo debajo del scroll */}
                      <motion.button
                        className="mt-4 px-6 py-3 bg-gradient-to-r from-romantic-red to-romantic-pink text-white rounded-full font-romantic text-lg shadow-lg hover:shadow-2xl self-center flex-shrink-0"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowGame(true);
                        }}
                      >
                        ¿Quieres saber que pasa despúes? 💘
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="game"
                      className="flex-1 flex flex-col"
                      style={{ minHeight: 0, overflow: 'visible' }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex-1 overflow-y-auto min-h-0">
                        <ValentineGame 
                          onAccept={handleAccept}
                          onClose={handleBackToLetter}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal de aceptación */}
      <AcceptanceModal 
        isOpen={showAcceptanceModal}
        onClose={handleCloseAcceptanceModal}
      />
    </div>
  );
};

export default LoveLetter;