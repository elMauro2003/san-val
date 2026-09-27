import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ValentineGame = ({ onAccept, onClose }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: -90, y: 0 });
  const [noButtonHovered, setNoButtonHovered] = useState(false);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  const noButtonRef = useRef(null);
  const containerRef = useRef(null);
  const yesButtonRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Frases divertidas para el botón "No"
  const noButtonPhrases = [
    "¡No! 😅",
    "¿Segura? 😳",
    "¡Tampoco! 🙈",
    "¡Ni loco! 🤪",
    "¡Error! 🏃‍♂️",
    "¡Casi! ✨",
    "¡Ups! 🎯",
    "¡Por ahí no! 😝",
    "¡Intenta de nuevo! 💫",
    "¡JA! No me atrapas 🦋",
    "¡Qué rápida! ⚡",
    "¡Esquiva! 🎮",
    "¡Ni de broma! 😜",
    "¡Otra vez! 🔄",
    "¡No te rindes! 💪",
    "¡Eres persistente! 🌟",
    "¡Me atrapaste... no! 🏃‍♀️",
    "¡Casi, casi! 📏",
    "¡Sigue intentando! 🎯",
    "¡Nunca me atraparás! 🦸‍♂️",
    "¡Por poco! 🎯",
    "¡Casi me tienes! 😱",
    "¡Eres rápida! ⚡",
    "¡No esta vez! 🙅‍♂️",
    "¡Sorpresa! 🎁"
  ];

  // Rastrear posición del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        mousePositionRef.current = {
          x: e.clientX - containerRect.left - containerRect.width / 2,
          y: e.clientY - containerRect.top - containerRect.height / 2
        };
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Verificar si dos rectángulos se solapan
  const checkOverlap = (rect1, rect2) => {
    return !(rect2.left > rect1.right || 
             rect2.right < rect1.left || 
             rect2.top > rect1.bottom || 
             rect2.bottom < rect1.top);
  };

  // Verificar si está cerca del mouse
  const isNearMouse = (buttonRect, mousePos, threshold = 60) => {
    if (!containerRef.current) return false;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2 - containerRect.left - containerRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2 - containerRect.top - containerRect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(buttonCenterX - mousePos.x, 2) + 
      Math.pow(buttonCenterY - mousePos.y, 2)
    );
    
    return distance < threshold;
  };

  // Generar posición segura para el botón No
  const generateSafePosition = (forceFarAway = false) => {
    if (!noButtonRef.current || !containerRef.current || !yesButtonRef.current) return null;

    const container = containerRef.current.getBoundingClientRect();
    const noButton = noButtonRef.current.getBoundingClientRect();
    const yesButton = yesButtonRef.current.getBoundingClientRect();
    
    const maxAttempts = 150;
    let attempts = 0;
    
    // Aumentar límites si forceFarAway es true
    const maxX = forceFarAway ? 150 : 140;
    const maxY = forceFarAway ? 80 : 70;
    
    while (attempts < maxAttempts) {
      // Generar posición aleatoria
      let newX = Math.random() * (maxX * 2) - maxX;
      let newY = Math.random() * (maxY * 2) - maxY;
      
      // Limitar a área visible
      newX = Math.max(Math.min(newX, maxX), -maxX);
      newY = Math.max(Math.min(newY, maxY), -maxY);
      
      // Simular rectángulo en la nueva posición
      const simulatedNoButtonRect = {
        left: container.left + container.width / 2 + newX - noButton.width / 2,
        right: container.left + container.width / 2 + newX + noButton.width / 2,
        top: container.top + container.height / 2 + newY - noButton.height / 2,
        bottom: container.top + container.height / 2 + newY + noButton.height / 2,
        width: noButton.width,
        height: noButton.height
      };
      
      // Verificar solapamiento con botón Sí
      const yesButtonRect = {
        left: yesButton.left,
        right: yesButton.right,
        top: yesButton.top,
        bottom: yesButton.bottom
      };
      
      const overlapsYes = checkOverlap(simulatedNoButtonRect, yesButtonRect);
      
      // Verificar cercanía al mouse (solo en desktop)
      let nearMouse = false;
      if (!isMobile && !forceFarAway) {
        nearMouse = isNearMouse(simulatedNoButtonRect, mousePositionRef.current, 60);
      }
      
      // Si forceFarAway es true, queremos que esté lo más lejos posible del mouse
      if (forceFarAway) {
        const distance = isNearMouse(simulatedNoButtonRect, mousePositionRef.current, 200);
        nearMouse = distance;
      }
      
      if (!overlapsYes && !nearMouse) {
        return { x: newX, y: newY };
      }
      
      attempts++;
    }
    
    // Si no encuentra posición perfecta, intentar al menos evitar el mouse y el botón Sí
    let fallbackX, fallbackY;
    
    if (forceFarAway) {
      // Si es un click, mover lo más lejos posible en dirección opuesta
      fallbackX = mousePositionRef.current.x > 0 ? -maxX + 10 : maxX - 10;
      fallbackY = mousePositionRef.current.y > 0 ? -maxY + 10 : maxY - 10;
    } else {
      fallbackX = Math.random() * 300 - 150;
      fallbackY = Math.random() * 160 - 80;
      
      if (!isMobile) {
        // Mover en dirección opuesta al mouse
        const awayX = mousePositionRef.current.x > 0 ? -100 : 100;
        const awayY = mousePositionRef.current.y > 0 ? -50 : 50;
        fallbackX = awayX + (Math.random() * 100 - 50);
        fallbackY = awayY + (Math.random() * 100 - 50);
      }
    }
    
    return { 
      x: Math.max(Math.min(fallbackX, maxX), -maxX),
      y: Math.max(Math.min(fallbackY, maxY), -maxY)
    };
  };

  // Manejar hover en botón No
  const handleNoHover = () => {
    if (!noButtonRef.current || !containerRef.current) return;
    
    setNoButtonHovered(true);
    setAttempts(prev => prev + 1);
    
    // Ciclar frases infinitamente
    setPhraseIndex(prev => (prev + 1) % noButtonPhrases.length);
    
    const safePosition = generateSafePosition(false);
    if (safePosition) {
      setNoButtonPosition(safePosition);
    }
    
    // El botón Sí se hace más grande
    setYesButtonScale(prev => Math.min(prev + 0.08, 1.8));
  };

  // 🚨 NUEVA FUNCIÓN: Manejar cuando LOGRA hacer click en el botón No
  const handleNoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Reproducir efecto de "casi" pero con castigo
    setNoButtonHovered(true);
    setAttempts(prev => prev + 5); // Castigo: 5 intentos extra
    
    // Frase especial por casi ganar
    setPhraseIndex(prev => (prev + 2) % noButtonPhrases.length);
    
    // 🎯 MOVER LEJOS DEL MOUSE Y SIN SOLAPAR
    const farAwayPosition = generateSafePosition(true); // true = forceFarAway
    if (farAwayPosition) {
      setNoButtonPosition(farAwayPosition);
    }
    
    // El botón Sí se hace MÁS GRANDE (castigo)
    setYesButtonScale(prev => Math.min(prev + 0.2, 2)); // +0.2 en lugar de +0.08
    
    // Feedback visual: temblor
    if (noButtonRef.current) {
      noButtonRef.current.style.transform = 'scale(0.9)';
      setTimeout(() => {
        if (noButtonRef.current) {
          noButtonRef.current.style.transform = '';
        }
      }, 200);
    }
  };

  // Manejar hover en botón Sí
  const handleYesHover = () => {
    setYesButtonScale(prev => Math.min(prev + 0.03, 2));
  };

  // Frase según el número de intentos
  const getMotivationalPhrase = () => {
    if (attempts === 0) return "Quieres seguir siendo mi Novia? 💕";
    if (attempts < 3) return "¡Inténtalo de nuevo!";
    if (attempts < 6) return "¡Ya casi! 💝";
    if (attempts < 10) return "No puedes escapar de tu destino... 💘";
    if (attempts < 15) return "Te veo enredá 💪❤️";
    if (attempts < 20) return "¡Ríndete! El Sí es tu única opción 🎉💖";
    if (attempts < 30) return "¿En serio sigues intentando? 🙈";
    if (attempts < 40) return "Tu no te rindes mi socia 🌟";
    if (attempts < 50) return "¡Acepta tu destino! ⭐";
    return "OK, ganaste... pero el Sí sigue ahí ❤️";
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-col items-center justify-start w-full h-full py-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: '400px' }}
    >
      {/* Emojis flotantes decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ 
              x: Math.random() * 100 - 50, 
              y: Math.random() * 100 - 50,
              opacity: 0.2
            }}
            animate={{ 
              x: [0, Math.random() * 30 - 15, 0],
              y: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
          >
            {i % 2 === 0 ? '❤️' : '💕'}
          </motion.div>
        ))}
      </div>

      {/* Título con animación */}
      <motion.h3
        className="font-romantic text-xl md:text-2xl text-romantic-red mb-4 text-center z-10 px-2"
        animate={{
          scale: [1, 1.05, 1],
          y: [0, -3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {getMotivationalPhrase()}
      </motion.h3>

      {/* Contador de intentos */}
      {attempts > 3 && (
        <motion.p
          className="text-xs text-romantic-pink mb-3 font-elegant"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Intentos: {attempts} {attempts > 20 ? '🏆' : attempts > 10 ? '😅' : '✨'}
        </motion.p>
      )}

      {/* Contenedor de botones */}
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center mb-2">
        {/* Botón SÍ */}
        <motion.button
          ref={yesButtonRef}
          className="absolute px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full font-romantic text-lg md:text-xl shadow-2xl z-20 whitespace-nowrap"
          style={{
            scale: yesButtonScale,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 30px rgba(72, 187, 120, 0.5)'
          }}
          animate={{
            boxShadow: [
              '0 0 30px rgba(72, 187, 120, 0.5)',
              '0 0 50px rgba(72, 187, 120, 0.8)',
              '0 0 30px rgba(72, 187, 120, 0.5)'
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ 
            scale: yesButtonScale * 1.1,
            boxShadow: '0 0 60px rgba(72, 187, 120, 0.9)'
          }}
          whileTap={{ scale: yesButtonScale * 0.95 }}
          onHoverStart={handleYesHover}
          onClick={onAccept}
        >
          ¡SÍ! ❤️
        </motion.button>

        {/* Botón NO (que huye inteligentemente) */}
        <motion.button
          ref={noButtonRef}
          className="absolute px-5 py-2.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full font-romantic text-base md:text-lg shadow-lg z-30 cursor-pointer whitespace-nowrap"
          animate={{
            x: noButtonPosition.x,
            y: noButtonPosition.y,
            scale: noButtonHovered ? [1, 1.1, 1] : 1,
            transition: {
              type: "spring",
              stiffness: isMobile ? 200 : 500,
              damping: isMobile ? 15 : 25,
              mass: 0.6
            }
          }}
          whileHover={!isMobile ? { 
            scale: 1.1,
            boxShadow: '0 0 20px rgba(255,99,71,0.6)'
          } : {}}
          onHoverStart={!isMobile ? handleNoHover : undefined}
          onClick={handleNoClick} // 🚨 AHORA USA LA NUEVA FUNCIÓN PARA TODOS
          onTouchStart={isMobile ? handleNoClick : undefined}
        >
          {noButtonPhrases[phraseIndex]}
        </motion.button>
      </div>

      {/* Mensaje juguetón */}
      <motion.p
        className="mt-2 text-gray-600 font-elegant text-xs md:text-sm text-center z-10 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isMobile 
          ? '¡El botón No siempre escapará! 📱' 
          : attempts > 15 
            ? '¡Nunca me atraparás! 🏃‍♂️' 
            : '¡Intenta presionar el botón No! 🖱️'}
      </motion.p>

      {/* Botón para cerrar */}
      <motion.button
        className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-xl z-40"
        onClick={onClose}
        whileHover={{ scale: 1.2, rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        ✕
      </motion.button>

      {/* Barra de progreso de persistencia */}
      {attempts > 15 && (
        <motion.div
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-romantic-red to-romantic-pink"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(100, (attempts - 15) * 2)}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ValentineGame;