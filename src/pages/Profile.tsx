
import React, { useState } from 'react';

import BottomNavigation from '../components/BottomNavigation';
import { Camera, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      
      <main className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <button className="text-gray-600">
                <span className="text-lg">‹</span>
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                प्रोफाइल सेटिंग्स
              </h1>
              <button className="text-blue-500 font-medium">✓</button>
            </div>

            {/* Profile Photo */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-blue-500 font-medium">फ़ोटो बदलें</p>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-gray-900">व्यक्तिगत जानकारी</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      आपका नाम
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="नाम दर्ज करें"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      आयु
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="आयु चुनें"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      लिंग
                    </label>
                    <div className="flex gap-4">
                      {['पुरुष', 'महिला', 'अन्य'].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value={option}
                            checked={formData.gender === option}
                            onChange={handleInputChange}
                            className="mr-2 text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      संपर्क (वैकल्पिक)
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="ईमेल या फ़ोन नंबर"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Food Preferences */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">🏠</span>
                  <span className="font-medium text-gray-900">खाना पसंद</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
