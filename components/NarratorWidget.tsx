import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Square } from 'lucide-react';

export const NarratorWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const getTextToRead = () => {
    // Read the main content of the page
    const mainContent = document.querySelector('main');
    return mainContent ? mainContent.innerText : "Tidak ada konten untuk dibaca.";
  };

  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const text = getTextToRead();
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.lang = 'id-ID'; // Indonesian
    newUtterance.rate = 1;
    newUtterance.pitch = 1;

    newUtterance.onend = () => {
      setIsPlaying(false);
    };

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
    setIsPlaying(true);
  };

  if (!isSupported) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={handlePlay}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-xl transition-all duration-300 ${
          isPlaying 
            ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
            : 'bg-secondary hover:bg-amber-600 text-white hover:scale-105'
        }`}
        title={isPlaying ? "Hentikan Narasi" : "Bacakan Halaman Ini"}
      >
        {isPlaying ? <Square size={24} fill="currentColor" /> : <Volume2 size={24} />}
        <span className="font-bold hidden md:inline">
          {isPlaying ? 'Stop Narasi' : 'Narator'}
        </span>
      </button>
    </div>
  );
};