import React from 'react';
import { motion } from 'framer-motion';

const LoveMessage = ({ isOpen }) => {
  const loveText = `Mi amor,

Desde el momento en que llegaste a mi vida, todo cambió. Los colores son más brillantes, la música suena más dulce y cada día es una nueva aventura a tu lado.

Eres la razón por la que sonrío sin motivo, la persona que hace que mi corazón lata más rápido con solo pensar en ti. Cada momento a tu lado es un tesoro que guardo en lo más profundo de mi ser.

Contigo aprendí que el amor verdadero existe, que no es solo un cuento de hadas o una ilusión. Es real, es hermoso y es nuestro.

Hoy, en este día de San Valentín, quiero recordarte lo especial que eres para mí. No solo hoy, sino todos los días. Eres mi presente, mi futuro y mi siempre.

Te amo más de lo que las palabras pueden expresar. Eres mi sueño hecho realidad, mi lugar favorito en el mundo, mi hogar.

Con todo mi corazón,
Tu amor eterno 💕

P.D.: Cada latido de mi corazón lleva tu nombre.`;

  return (
    <motion.div
      className="h-full overflow-y-auto pr-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ delay: isOpen ? 0.3 : 0 }}
    >
      <div className="font-elegant text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base pb-4">
        {loveText}
      </div>
    </motion.div>
  );
};

export default LoveMessage;