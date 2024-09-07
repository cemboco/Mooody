import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import MoodBalls from '../components/MoodBalls';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => {/* Handle home button click */}}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
        <MoodBalls showText={false} />
        <div className="container text-center max-w-2xl relative z-10">
          <h1 className="mooody-title text-5xl sm:text-6xl md:text-7xl font-bold mb-6">MOOODY</h1>
          <p className="text-xl sm:text-2xl mb-8">{t.subtitle}</p>
          <Button 
            className="bg-mooody-green hover:bg-mooody-dark-green text-white text-xl px-6 py-3 rounded-full transition-colors shadow-lg relative z-20"
            onClick={() => navigate('/mood')}
          >
            {t.notificationButton}
          </Button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 text-center p-2 bg-gray-100 text-gray-500 text-xs italic z-30">
        {language === 'de' ? 
          "Diese App ersetzt keine professionelle psychologische oder medizinische Beratung. Bei ernsthaften mentalen Problemen oder Krisen suchen Sie bitte einen Spezialisten oder Therapeuten auf." :
          "This app does not replace professional psychological or medical advice. For serious mental health issues or crises, please consult a specialist or therapist."
        }
      </div>
    </div>
  );
};

export default Index;