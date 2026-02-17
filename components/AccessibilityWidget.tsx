import React, { useState } from 'react';
import { Settings, Type, Eye, X } from 'lucide-react';
import { AccessibilityState } from '../types';

interface AccessibilityWidgetProps {
  settings: AccessibilityState;
  onUpdate: (settings: AccessibilityState) => void;
}

export const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({ settings, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHighContrast = () => onUpdate({ ...settings, highContrast: !settings.highContrast });
  const toggleLargeText = () => onUpdate({ ...settings, largeText: !settings.largeText });
  const toggleDyslexia = () => onUpdate({ ...settings, dyslexiaFont: !settings.dyslexiaFont });

  return (
    <div className="fixed left-4 bottom-4 z-50 flex flex-col items-start gap-2">
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-64 animate-fade-in-up">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 dark:text-white">Aksesibilitas</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500">
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={toggleHighContrast}
              className={`w-full flex items-center gap-2 p-2 rounded-md transition-colors ${
                settings.highContrast ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              <Eye size={18} />
              Kontras Tinggi
            </button>
            <button 
              onClick={toggleLargeText}
              className={`w-full flex items-center gap-2 p-2 rounded-md transition-colors ${
                settings.largeText ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              <Type size={18} />
              Teks Besar
            </button>
             <button 
              onClick={toggleDyslexia}
              className={`w-full flex items-center gap-2 p-2 rounded-md transition-colors ${
                settings.dyslexiaFont ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              <span className="font-serif italic font-bold">D</span>
              Font Ramah Disleksia
            </button>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105"
        aria-label="Menu Aksesibilitas"
      >
        <Settings size={24} />
      </button>
    </div>
  );
};