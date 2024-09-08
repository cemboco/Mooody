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

  const englishText = "Your feelings are more than fleeting moments of emotion; they are the whispers of your inner self, guiding you toward your truest path. In a world that often encourages us to think, analyze, and rationalize, we sometimes forget to pause and listen to the quiet voice of our hearts. But your feelings—whether they are of joy, sadness, fear, or excitement—are powerful messengers, each carrying a truth that your mind alone cannot comprehend.";

  const germanText = "Deine Gefühle sind mehr als flüchtige Momente der Emotion; sie sind das Flüstern deines inneren Selbst, das dich auf deinen wahrhaftigsten Weg führt. In einer Welt, die uns oft ermutigt zu denken, zu analysieren und zu rationalisieren, vergessen wir manchmal innezuhalten und auf die leise Stimme unseres Herzens zu hören. Aber deine Gefühle – ob Freude, Traurigkeit, Angst oder Aufregung – sind mächtige Botschafter, die jeweils eine Wahrheit in sich tragen, die dein Verstand allein nicht erfassen kann.";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
        <LanguageToggle />
        <Button
          onClick={() => navigate('/home')}
          variant="outline"
          size="icon"
          className="ml-auto"
        >
          <Home className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4">
        <MoodBalls showText={false} showHappyText={false} />
        <div className="container text-center max-w-4xl relative z-10 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-0">
          <h1 className="mooody-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">MOOODY</h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">{t.subtitle}</p>
          <div className="flex justify-center">
            <Button 
              className="bg-mooody-green hover:bg-mooody-dark-green text-white text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors shadow-lg relative z-20"
              onClick={() => navigate('/mood')}
            >
              {t.notificationButton}
            </Button>
          </div>
          <p className="text-xs sm:text-sm mt-4 sm:mt-8 mx-auto" style={{ fontFamily: 'SUSE, sans-serif', fontSize: '14px', maxWidth: '80ch', lineHeight: '1.6' }}>
            {language === 'de' ? germanText : englishText}
          </p>
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