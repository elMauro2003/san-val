import React from 'react';
import { motion } from 'framer-motion';

const LoveMessage = ({ isOpen }) => {
  const loveText = `Espero que este pequeño detallito te guste y te saque al menos una sonrisa.
Ya podremos ir a comernos un heladito luego, o ver una peli, o hablar y darnos la muela de horas que nos damos por telefono, pero de frente.
No sabes cuantas risas me has sacado, y espero que sean muchas más, así como las noches de desvelo contando cualquier cosa, hasta lo más simple me resulta atractivo si me lo dices con tu forma sutil y ocurrente.

Esta es una fecha para amar, querer y sentir, así que quería que supieras que yo hoy pienso en tí, en esos ojitos preciosos que tienes.

Podría dedicarte párrafos enteros diciéndote cositas lindas, pero ¿cómo describes algo que es fuera de lo ordinario? 
¿Algo muy intenso, casi sublime, algo más allá de bueno? 🤔
Ah, sí: inefable.
Simplemente no puede ser descrito. Ni llegando al infinito sería suficiente.
Así que mejor no intento atraparlo con palabras.

Un besazo y un abrazo psicológico, de esos que no se ven pero se sienten. 💕`;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ delay: isOpen ? 0.3 : 0 }}
    >
      <div className="font-elegant text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
        {loveText}
      </div>
    </motion.div>
  );
};

export default LoveMessage;