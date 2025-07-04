import React, { useState, useEffect, useRef } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  Calendar,
  Mic,
  Image,
  Camera,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const Home: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recipeList, setRecipeList] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('ब्राउज़र स्पीच रिकग्निशन को सपोर्ट नहीं करता।');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN';

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const part = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += part;
        } else {
          interim += part;
        }
      }
      setTranscript(interim);
      if (final) {
        setFinalTranscript(final);
        setTranscript('');
        handleSubmit(final, selectedFile);
      }
    };

    recognition.onerror = () => {
      setResponseText('🎤 कुछ समस्या हुई।');
    };

    recognitionRef.current = recognition;
  }, [selectedFile]);

  const startListening = () => {
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
  };

  const toggleListening = () => {
    isListening ? stopListening() : startListening();
  };

  const handleSubmit = async (query: string, image?: File | null) => {
    if (!query.trim() && !image) return;

    // Meal plan detection logic
    const lowerQuery = query.toLowerCase();
    const mealKeywords = ['meal plan', 'खाने का प्लान', 'खाना प्लान', 'mealplan', 'डाइट प्लान'];
    const matchedKeyword = mealKeywords.find((word) => lowerQuery.includes(word));

    setIsLoading(true);
    setResponseText('');
    setRecipeList([]);

    const formData = new FormData();
    formData.append('query', query);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('https://n8n.idea360.tech/webhook/food-agent', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      const answer = data.answer || '✅ जवाब मिल गया';
      setResponseText(answer);

      const matches = answer.match(/•\s*(.*?)(?=\n|$)/g);
      if (matches) {
        const cleaned = matches.map((line) => line.replace(/•\s*/, '').trim());
        setRecipeList(cleaned);
      } else {
        setRecipeList([]);
      }

      // Navigate to meal plan if matched
      if (matchedKeyword && answer) {
        navigate('/mealplan', { state: { mealPlan: answer } });
      }
    } catch (err) {
      setResponseText('❌ कुछ गड़बड़ हो गई');
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: ShoppingBag, label: 'रेसिपी पाएं', color: 'bg-orange-100 text-orange-600', onClick: () => navigate('/search') },
    { icon: Heart, label: 'स्वास्थ्य टिप्स', color: 'bg-red-100 text-red-600' },
    { icon: ShoppingCart, label: 'खरीदारी सूची', color: 'bg-orange-100 text-orange-600' },

    {
      icon: Calendar,
      label: 'मील प्लान',
      color: 'bg-orange-100 text-orange-600',
      onClick: () => {
        if (responseText.trim()) {

        } 
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 px-4 py-6 pb-24">
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                नमस्ते! मैं आपका खाना<br />बनाने का सहायक हूं
              </h1>
              <p className="text-gray-600 text-sm">
                रेसिपी, पोषण और खाने से जुड़ी जानकारी पूछ सकते हैं
              </p>
            </div>
            <img
              src="/lovable-uploads/7354766b-ec82-4f3a-a9a7-4a50fc522305.png"
              alt="Food"
              className="w-20 h-20 rounded-xl object-cover ml-4"
            />
          </div>

          {selectedImage && (
            <div className="mt-4 mb-4">
              <img src={selectedImage} alt="Selected" className="w-full max-w-xs rounded-lg shadow-md" />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            id="galleryInput"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                setSelectedImage(URL.createObjectURL(file));
              }
            }}
          />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            id="cameraInput"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                setSelectedImage(URL.createObjectURL(file));
              }
            }}
          />

          <div className="flex items-center p-2 bg-gray-100 rounded-lg relative">
            <input
              type="text"
              value={transcript || finalTranscript}
              onChange={(e) => setFinalTranscript(e.target.value)}
              placeholder="अपना सवाल लिखें..."
              className="flex-1 bg-transparent text-sm px-2 py-2 outline-none"
            />
            <div className="flex items-center gap-2 pr-2">
              <label htmlFor="galleryInput" className="cursor-pointer text-gray-600">
                <Image className="w-5 h-5" />
              </label>
              <label htmlFor="cameraInput" className="cursor-pointer text-gray-600">
                <Camera className="w-5 h-5" />
              </label>
              <button onClick={toggleListening} className={`text-gray-600 ${isListening ? 'animate-pulse text-orange-600' : ''}`}>
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSubmit(finalTranscript, selectedFile)}
                disabled={isLoading}
                className={`p-1 rounded-full text-white ${isLoading ? 'bg-gray-400' : 'bg-orange-500'}`}
              >
                {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <span className="text-sm">➤</span>
                )}
              </button>
            </div>
          </div>

          {responseText && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-900 whitespace-pre-line">{responseText}</p>
            </div>
          )}

          {recipeList.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">🍽 सुझाई गई रेसिपी:</h2>
              {recipeList.map((recipe, index) => (
                <div key={index} className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded shadow-sm">
                  <h3 className="text-md font-bold text-orange-700">• {recipe}</h3>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center mb-10">
          <button
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full ${isListening ? 'bg-orange-600 animate-pulse' : 'bg-orange-500'} text-white flex items-center justify-center shadow-lg`}
          >
            <Mic className="w-12 h-12" />
          </button>
          <p className="text-gray-700 font-medium mt-4 text-center text-base">
            बोलिए, क्या बनाना है?
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                onClick={action.onClick}
                className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
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
