import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import VolumeControl from '../components/VolumeControl';
import Navbar from '../components/Navbar';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#FFF8E7] text-[#2D3748] overflow-hidden relative flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center px-4 py-16 relative">
        <div className="text-center relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="block">Regulate your mood,</span>
            <span className="block">unravel your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">emotions</span>.</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your feelings—whether they are of joy, sadness, fear, or excitement—are powerful messengers. Mooody provides the space you need to track and understand what those feelings are telling you.
          </p>
          <Button
            onClick={() => navigate('/mood')}
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-8 py-3 rounded-full text-lg"
          >
            {t.getStartedButton || "I'm ready to build a relationship with myself"}
          </Button>
          <p className="mt-4 text-sm text-gray-600">{t.tryForFree || 'Try for free - No Credit Card Required'}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#4FD1C5" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      <div className="absolute bottom-4 left-4">
        <VolumeControl />
      </div>
    </div>
  );
};

export default Index;