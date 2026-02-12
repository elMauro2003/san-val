import React, { useEffect, useRef } from 'react';

const BackgroundAudioSimple = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Crear elemento de audio
    audioRef.current = new Audio('/audio/love-song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Mitad de volumen
    audioRef.current.preload = 'auto';

    // Intentar reproducir
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        console.log('🎵 Música romántica reproduciendo');
      } catch (error) {
        console.log('❌ Autoplay bloqueado. El usuario debe interactuar con la página.');
        
        // Opción 1: Intentar reproducir cuando el usuario interactúe
        const handleFirstInteraction = async () => {
          try {
            await audioRef.current.play();
            console.log('🎵 Música iniciada por interacción');
            document.removeEventListener('click', handleFirstInteraction);
          } catch (err) {
            console.error('Error al reproducir:', err);
          }
        };
        document.addEventListener('click', handleFirstInteraction);
        
        return () => {
          document.removeEventListener('click', handleFirstInteraction);
        };
      }
    };

    playAudio();

    // Limpiar al desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
};

export default BackgroundAudioSimple;