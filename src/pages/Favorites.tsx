
import React from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { User, Heart, Clock, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
  const navigate = useNavigate();

  const favoriteRecipes = [
    {
      id: 1,
      title: 'स्वादिष्ट व्यंजन 1',
      image: '/lovable-uploads/e0f77a06-e900-41a4-b311-592991884604.png',
      duration: '30 मिनट'
    },
    {
      id: 2,
      title: 'स्वादिष्ट व्यंजन 2',
      image: '/lovable-uploads/e0f77a06-e900-41a4-b311-592991884604.png',
      duration: '30 मिनट'
    }
  ];

  const categories = [
    { name: 'दोब की गई रेसिपी', active: true },
    { name: 'गतिविधि', active: false },
    { name: 'बेज', active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="4. My Fav.pdf" 
        showBack 
        onBack={() => navigate('/')} 
      />
      
      <main className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">रमेश्या जी</h1>
            <p className="text-gray-600">खाना बनाने के शौकीन</p>
          </div>

          {/* Stats */}
          <div className="flex justify-around mb-8">
            <div className="text-center">
              <Heart className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">पसंदीदा रेसिपी</div>
            </div>
            <div className="text-center">
              <Clock className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-gray-900">5 घंटे</div>
              <div className="text-sm text-gray-600">कुल समय बचाया</div>
            </div>
            <div className="text-center">
              <Trash2 className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-gray-900">2 किलो</div>
              <div className="text-sm text-gray-600">कचरा कम किया</div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  category.active
                    ? 'border-pink-500 text-pink-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Recipe Cards */}
          <div className="grid grid-cols-2 gap-4">
            {favoriteRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 mb-2 text-sm">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    तैयारी का समय: {recipe.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Favorites;
