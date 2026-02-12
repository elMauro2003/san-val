import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import FloatingFlowers from './components/FloatingFlowers';
import FloatingHearts from './components/FloatingHearts';
import LoveLetter from './components/LoveLetter';
import BackgroundAudio from './components/BackgroundAudio'; // o BackgroundAudioSimple
// import BackgroundAudioSimple from './components/BackgroundAudioSimple';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondos animados */}
      <ParticleBackground />
      <FloatingFlowers />
      <FloatingHearts />
      
      {/* 🎵 Audio de fondo */}
      <BackgroundAudio />
      {/* <BackgroundAudioSimple /> */}
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <LoveLetter />
      </div>

      {/* Footer decorativo */}
      <footer className="absolute bottom-0 left-0 right-0 text-center py-4 text-romantic-red/60 font-romantic text-lg z-20">
        Con cariño de Mauro para Jenny ❤️
      </footer>
    </div>
  );
}

export default App;