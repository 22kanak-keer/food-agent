
import React from 'react';
import { Mic } from 'lucide-react';

interface VoiceButtonProps {
  isListening?: boolean;
  onClick?: () => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ isListening = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
        isListening 
          ? 'bg-orange-500 shadow-lg scale-110' 
          : 'bg-orange-500 hover:bg-orange-600 shadow-md'
      }`}
    >
      <Mic className="w-8 h-8 text-white" />
    </button>
  );
};

export default VoiceButton;
