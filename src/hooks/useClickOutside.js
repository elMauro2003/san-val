import { useEffect } from 'react';

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Si el ref no está definido o el click fue dentro del elemento, no hacer nada
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    // Usar setTimeout para evitar conflictos con el evento de clic del toggle
    const handleClickOutside = (e) => {
      setTimeout(() => listener(e), 0);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
};