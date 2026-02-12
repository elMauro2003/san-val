import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    size: Math.random() * 40 + 20,
    rotation: Math.random() * 360,
    color: i % 2 === 0 ? 'text-red-400' : 'text-pink-400'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute ${heart.color} opacity-30 hover:opacity-100 transition-opacity duration-300`}
          style={{
            left: heart.left,
            top: '110%',
            fontSize: heart.size,
            rotate: heart.rotation,
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.random() * 100 - 50],
            rotate: [heart.rotation, heart.rotation + 360],
            scale: [1, 1.2, 0.8],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ❤️
        </motion.div>
      ))}
      
      {/* Corazones adicionales con hover effect */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`static-heart-${i}`}
          className="absolute text-romantic-red/20 text-4xl cursor-pointer pointer-events-auto"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
          whileHover={{
            scale: 1.5,
            opacity: 1,
            rotate: 15,
            color: 'var(--color-romantic-red)',
            transition: { duration: 0.2 }
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;