import React, { useState } from 'react';
import { Mic, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ShoppingList = () => {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleAdd = () => {
    if (input.trim()) {
      setItems([...items, input.trim()]);
      setInput('');
    }
  };

  const handleRemove = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleVoiceInput = () => {
    if (!recognition) return alert('Speech recognition not supported');
    setIsListening(true);
    recognition.start();

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-orange-100 to-yellow-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white py-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            🛒 Smart Shopping List
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-6 max-w-2xl mx-auto w-full">
        {/* Input Section */}
        <div className="flex gap-3 mb-6 items-center bg-white shadow-md rounded-full px-5 py-3">
          <button type="button" onClick={handleVoiceInput}>
            <Mic
              className={`w-6 h-6 transition ${
                isListening ? 'text-red-500 animate-pulse' : 'text-orange-500 hover:text-red-500'
              }`}
            />
          </button>

          <Input
            type="text"
            placeholder="Add item to shopping list..."
            className="flex-1 border-none bg-transparent focus:outline-none text-gray-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <Button
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 rounded-full p-2 text-white"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* List Section */}
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white px-4 py-3 rounded-lg shadow hover:bg-yellow-100 transition"
            >
              <span className="text-gray-800 font-medium">{item}</span>
              <Button
                variant="ghost"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-400 text-white py-3 text-center mt-auto">
        <p className="text-sm font-medium">❤️ Eat well, buy smart!</p>
      </footer>
    </div>
  );
};

export default ShoppingList;
