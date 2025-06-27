
import React from 'react';
import { Clock, Star, Bookmark } from 'lucide-react';

interface RecipeCardProps {
  title: string;
  image: string;
  duration: string;
  rating: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  image,
  duration,
  rating,
  isFavorite = false,
  onToggleFavorite
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-40 object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'
          } shadow-md`}
        >
          <Bookmark className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-orange-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
