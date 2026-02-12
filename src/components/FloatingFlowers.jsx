import React from 'react';
import { motion } from 'framer-motion';

const Flower = ({ color, style, animation }) => {
  // Usamos SVG en línea en lugar de URLs externas
  return (
    <motion.div
      className="absolute w-16 h-16 md:w-24 md:h-24 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={style}
      animate={animation}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.2, rotate: 15 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
        {/* Pétalos */}
        <motion.circle
          cx="50"
          cy="35"
          r="20"
          fill={color}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="35"
          cy="50"
          r="20"
          fill={color}
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="65"
          cy="50"
          r="20"
          fill={color}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="50"
          cy="65"
          r="20"
          fill={color}
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
        />
        {/* Centro de la flor */}
        <circle cx="50" cy="50" r="15" fill="#FFD700" />
        <circle cx="50" cy="50" r="8" fill="#FFA500" />
        {/* Hoja */}
        <motion.path
          d="M45 70 Q 40 85, 30 80"
          stroke="#4CAF50"
          strokeWidth="4"
          fill="none"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path
          d="M55 70 Q 60 85, 70 80"
          stroke="#4CAF50"
          strokeWidth="4"
          fill="none"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
};

const FloatingFlowers = () => {
  const flowers = [
    {
      color: '#FF6B6B', // Rojo romántico
      style: { top: '5%', left: '2%' },
      animation: { y: [0, 30, 0], rotate: [0, 10, 0] }
    },
    {
      color: '#FF8E8E', // Rosa
      style: { top: '15%', right: '3%' },
      animation: { y: [0, -30, 0], rotate: [0, -10, 0] }
    },
    {
      color: '#FF6B6B',
      style: { bottom: '8%', left: '5%' },
      animation: { y: [0, 25, 0], rotate: [0, 15, 0] }
    },
    {
      color: '#FF8E8E',
      style: { bottom: '15%', right: '5%' },
      animation: { y: [0, -25, 0], rotate: [0, -15, 0] }
    },
    {
      color: '#FF6B6B',
      style: { top: '40%', left: '8%' },
      animation: { y: [0, 20, 0], rotate: [0, 8, 0] }
    },
    {
      color: '#FF8E8E',
      style: { top: '45%', right: '8%' },
      animation: { y: [0, -20, 0], rotate: [0, -8, 0] }
    },
    {
      color: '#FFB6C1', // Rosa claro
      style: { top: '70%', left: '12%' },
      animation: { y: [0, 15, 0], rotate: [0, 12, 0] }
    },
    {
      color: '#FF69B4', // Rosa fuerte
      style: { bottom: '25%', right: '12%' },
      animation: { y: [0, -15, 0], rotate: [0, -12, 0] }
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {flowers.map((flower, index) => (
        <Flower key={index} {...flower} />
      ))}
    </div>
  );
};

export default FloatingFlowers;