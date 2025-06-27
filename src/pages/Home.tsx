
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import VoiceButton from '../components/VoiceButton';
import { ShoppingBag, Heart, ShoppingCart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleVoiceClick = () => {
    setIsListening(!isListening);
  };

  const quickActions = [
    { icon: ShoppingBag, label: 'रेसिपी पाएं', color: 'bg-orange-100 text-orange-600', onClick: () => navigate('/search') },
    { icon: Heart, label: 'स्वास्थ्य टिप्स', color: 'bg-red-100 text-red-600' },
    { icon: ShoppingCart, label: 'खरीदारी सूची', color: 'bg-orange-100 text-orange-600' },
    { icon: Calendar, label: 'मील प्लान', color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="1. Home Screen..." />
      
      <main className="flex-1 px-4 py-6 pb-24">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                नमस्ते! मैं आपका खाना<br />बनाने का सहायक हूं
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                आप मुझसे रेसिपी, पोषण, और खाना बनाने की किसी भी चीज़ के बारे में पूछ सकते हैं
              </p>
            </div>
            <img 
              src="/lovable-uploads/7354766b-ec82-4f3a-a9a7-4a50fc522305.png" 
              alt="Food" 
              className="w-20 h-20 rounded-xl object-cover ml-4 flex-shrink-0"
            />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input 
              type="text" 
              placeholder="अपना सवाल यहाँ लिखें..."
              className="flex-1 bg-transparent text-gray-600 placeholder-gray-400 text-sm outline-none"
            />
            <button className="bg-orange-500 text-white p-2 rounded-full">
              <span className="text-sm">➤</span>
            </button>
          </div>
        </div>

        {/* Voice Section */}
        <div className="text-center mb-8">
          <VoiceButton isListening={isListening} onClick={handleVoiceClick} />
          <p className="text-gray-700 font-medium mt-4">
            बोलिए, क्या बनाना है?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${action.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-900 text-center">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Home;
