import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AcceptanceModal = ({ isOpen, onClose }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const romanticImages = [
    {
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="heartGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FF8E8E" />
            </linearGradient>
          </defs>
          <path
            d="M100,180 L100,180 C60,140 20,100 20,60 C20,30 40,10 70,10 C90,10 100,30 100,30 C100,30 110,10 130,10 C160,10 180,30 180,60 C180,100 140,140 100,180 Z"
            fill="url(#heartGradient1)"
            stroke="#FF6B6B"
            strokeWidth="4"
          >
            <animate
              attributeName="d"
              dur="2s"
              values="
                M100,180 L100,180 C60,140 20,100 20,60 C20,30 40,10 70,10 C90,10 100,30 100,30 C100,30 110,10 130,10 C160,10 180,30 180,60 C180,100 140,140 100,180 Z;
                M100,170 L100,170 C55,125 15,85 15,50 C15,25 35,5 65,5 C85,5 100,25 100,25 C100,25 115,5 135,5 C165,5 185,25 185,50 C185,85 145,125 100,170 Z;
                M100,180 L100,180 C60,140 20,100 20,60 C20,30 40,10 70,10 C90,10 100,30 100,30 C100,30 110,10 130,10 C160,10 180,30 180,60 C180,100 140,140 100,180 Z
              "
              repeatCount="indefinite"
              fill="freeze"
            />
          </path>
          <circle cx="70" cy="45" r="5" fill="white" opacity="0.8" />
          <circle cx="130" cy="45" r="5" fill="white" opacity="0.8" />
        </svg>
      ),
      message: "Viste, soy vidente y tu evidente! 💕"
    },
    {
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="flowerGradient">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </radialGradient>
          </defs>
          <g transform="translate(100,100)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <motion.circle
                  cx="0"
                  cy="-40"
                  r="20"
                  fill={i % 2 === 0 ? "#FF6B6B" : "#FF8E8E"}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                />
              </g>
            ))}
            <circle cx="0" cy="0" r="30" fill="url(#flowerGradient)" />
          </g>
        </svg>
      ),
      message: "Espero te haya gustado :) 🌹"
    },
    {
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="coupleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#FF8E8E" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="80" r="30" fill="#FFB6C1" />
          <circle cx="140" cy="80" r="30" fill="#FFB6C1" />
          <path d="M60 110 L140 110" stroke="#FF6B6B" strokeWidth="8" strokeLinecap="round" />
          <path d="M100 80 L100 140" stroke="#FF6B6B" strokeWidth="8" strokeLinecap="round" />
          <motion.circle
            cx="60"
            cy="80"
            r="10"
            fill="#FF6B6B"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.circle
            cx="140"
            cy="80"
            r="10"
            fill="#FF6B6B"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
          />
        </svg>
      ),
      message: "Feliz San Valentín señorita! 💓"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowMessage(true), 500);
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % romanticImages.length);
      }, 3000);
      return () => clearInterval(interval);
    } else {
      setShowMessage(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-gradient-to-br from-white via-romantic-light to-pink-50 rounded-3xl romantic-shadow z-50"
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ 
              type: "spring",
              damping: 15,
              stiffness: 200
            }}
          >
            {/* Confeti animado */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-romantic-red rounded-full"
                  initial={{ 
                    x: Math.random() * 400,
                    y: -20,
                    opacity: 1
                  }}
                  animate={{ 
                    y: 400,
                    x: (Math.random() - 0.5) * 200,
                    rotate: 360,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="relative p-6 flex flex-col items-center">
              <motion.button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl z-10"
                onClick={onClose}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>

              <motion.div
                key={currentImageIndex}
                className="w-40 h-40 md:w-56 md:h-56 mb-4"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.5 }}
              >
                {romanticImages[currentImageIndex].svg}
              </motion.div>

              <AnimatePresence mode="wait">
                {showMessage && (
                  <motion.div
                    key={currentImageIndex}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h2
                      className="font-romantic text-xl md:text-2xl text-romantic-red mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {romanticImages[currentImageIndex].message}
                    </motion.h2>
                    
                    <motion.p
                      className="font-elegant text-gray-600 text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Me debes un cafecito ☕
                    </motion.p>

                    <div className="flex justify-center gap-2 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-xl"
                          animate={{ 
                            y: [0, -8, 0],
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ 
                            duration: 1.5,
                            delay: i * 0.1,
                            repeat: Infinity
                          }}
                        >
                          ❤️
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AcceptanceModal;