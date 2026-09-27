import React from 'react';
import { motion } from 'framer-motion';

const LoveMessage = ({ isOpen }) => {
  const loveText = 
  `
  El tiempo sigue avanzando, y con cada día que pasa me doy cuenta de que lo que siento por ti no se desgasta: crece. Crece en los silencios, en las rutinas, en los pequeños momentos que antes daba por sentados y que hoy valoro como tesoros. Y precisamente por eso hoy te escribo, no desde la comodidad de sentirme seguro, sino desde la honestidad de reconocer que fallé.

No fui el que debía ser en algún momento. Me equivoqué, y no quiero justificarlo ni esconderlo detrás de excusas. Sé que mis errores pudieron lastimarte, y que las palabras, por bonitas que sean, no borran lo que pasó. Pero también sé que el amor verdadero no se mide solo en los aciertos, sino en la valentía de reconocer los fallos y en la disposición de aprender de ellos.

No quiero un solo día sin ti. No quiero una sonrisa que no sea contigo, ni un plan que no te incluya, ni un futuro en el que no estés. Porque al final, todo lo que hago tiene sentido cuando pienso en compartirlo contigo.

Te pido perdón de corazón. No un perdón vacío, sino uno que venga acompañado de cambios reales, de paciencia, de escucha y de todo el amor que soy capaz de darte. Y si me das la oportunidad, quiero demostrarte con hechos que lo que siento no es solo un sentimiento bonito: es una decisión diaria de elegirte, cuidarte y no volver a fallarte.

Te amo. Hoy, mañana y cada día que el tiempo nos regale.                  
                    
  `;

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