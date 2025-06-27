
import React, { useState } from 'react';
import { ChevronLeft, FileImage, Triangle, MoreVertical } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false, onBack }) => {
  const [language, setLanguage] = useState<'Hindi' | 'English'>('Hindi');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'Hindi' ? 'English' : 'Hindi');
  };

  return (
    <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-lg font-medium truncate">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="text-sm bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-full transition-colors"
        >
          {language}
        </button>
        <FileImage className="w-6 h-6" />
        <Triangle className="w-6 h-6" />
        <MoreVertical className="w-6 h-6" />
      </div>
    </header>
  );
};

export default Header;
