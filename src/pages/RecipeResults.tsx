
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';

const RecipeResults: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('सभी');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const filters = ['फिल्टर', 'सभी', 'शाकाहारी', 'नॉन वेज', 'नाश्ता'];

  const recipes = [
    {
      id: 1,
      title: 'दाल तड़का',
      image: '/lovable-uploads/067791e7-a766-487d-966e-743e809e11d0.png',
      duration: '20 मिनट',
      rating: 4.8
    },
    {
      id: 2,
      title: 'पालक पनीर',
      image: '/lovable-uploads/067791e7-a766-487d-966e-743e809e11d0.png',
      duration: '35 मिनट',
      rating: 4.6
    },
    {
      id: 3,
      title: 'चिकन करी',
      image: '/lovable-uploads/067791e7-a766-487d-966e-743e809e11d0.png',
      duration: '45 मिनट',
      rating: 4.7
    },
    {
      id: 4,
      title: 'आलू गोभी',
      image: '/lovable-uploads/067791e7-a766-487d-966e-743e809e11d0.png',
      duration: '25 मिनट',
      rating: 4.5
    },
    {
      id: 5,
      title: 'मटर पनीर',
      image: '/lovable-uploads/067791e7-a766-487d-966e-743e809e11d0.png',
      duration: '30 मिनट',
      rating: 4.4
    },
    {
      id: 6,
      title: 'छोले भटूरे',
      image: '/lovable-uploads/067791e7-a766-487d-966e-743e809e11d0.png',
      duration: '40 मिनट',
      rating: 4.3
    }
  ];

  const toggleFavorite = (recipeId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(recipeId)) {
      newFavorites.delete(recipeId);
    } else {
      newFavorites.add(recipeId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="2. Recipe Results..." 
        showBack 
        onBack={() => navigate('/')} 
      />
      
      <main className="flex-1 px-4 py-6 pb-24">
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          आपके लिए सुझाई गई रेसिपी
        </h1>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter || (index === 0 && filter === 'फिल्टर')
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              duration={recipe.duration}
              rating={recipe.rating}
              isFavorite={favorites.has(recipe.id)}
              onToggleFavorite={() => toggleFavorite(recipe.id)}
            />
          ))}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default RecipeResults;
