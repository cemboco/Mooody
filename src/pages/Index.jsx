import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import MoodBalls from '../components/MoodBalls';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language] || {};
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const englishText = "Your feelings are more than fleeting moments of emotion; they are the whispers of your inner self, guiding you toward your truest path. In a world that often encourages us to think, analyze, and rationalize, we sometimes forget to pause and listen to the quiet voice of our hearts. But your feelings—whether they are of joy, sadness, fear, or excitement—are powerful messengers, each carrying a truth that your mind alone cannot comprehend.";

  const germanText = "Deine Gefühle sind mehr als flüchtige Momente der Emotion; sie sind das Flüstern deines inneren Selbst, das dich auf deinen wahrhaftigsten Weg führt. In einer Welt, die uns oft ermutigt zu denken, zu analysieren und zu rationalisieren, vergessen wir manchmal innezuhalten und auf die leise Stimme unseres Herzens zu hören. Aber deine Gefühle – ob Freude, Traurigkeit, Angst oder Aufregung – sind mächtige Botschafter, die jeweils eine Wahrheit in sich tragen, die dein Verstand allein nicht erfassen kann.";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center text-mooody-green overflow-hidden" style={{ backgroundImage: "url('/Bg.svg')" }}>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shiftFromTop {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes clarify {
          from { filter: blur(5px); opacity: 0; }
          to { filter: blur(0); opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .shift-from-top {
          animation: shiftFromTop 1s ease-out forwards;
        }
        .fade-in-button {
          animation: fadeIn 1.3s ease-out forwards;
        }
        .clarify-text {
          animation: clarify 1s ease-out forwards;
        }
      `}</style>
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
          <a href="https://www.producthunt.com/posts/mooody-space?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-mooody&#0045;space" target="_blank" rel="noopener noreferrer" className="mb-4 inline-block">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=489379&theme=neutral&period=daily" alt="Mooody&#0046;Space - Track&#0032;Your&#0032;Emotions&#0044;&#0032;and&#0032;Find&#0032;Balance&#0032;with&#0032;Mooody&#0046; | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
          </a>
          <h1 className={`mooody-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 ${animate ? 'fade-in' : 'opacity-0'}`}>MOOODY.</h1>
          <div style={{ textAlign: 'center', color: '#020617', fontSize: '20px', fontFamily: 'Bricolage Grotesque', fontWeight: 500, lineHeight: '32px', wordWrap: 'break-word' }}>m o o o d y</div>
          <p className={`font-julius text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 font-bold ${animate ? 'shift-from-top' : 'opacity-0'}`}>{t.subtitle || 'Because "How are you?" is often not enough.'}</p>
          <div className={`flex justify-center ${animate ? 'fade-in-button' : 'opacity-0'}`}>
            <Button 
              className="bg-mooody-green hover:bg-mooody-dark-green text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => navigate('/mood')}
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
              }}
            >
              {t.notificationButton || 'How are you feeling?'}
            </Button>
          </div>
          <p className={`text-sm sm:text-base mt-4 sm:mt-8 mx-auto ${animate ? 'clarify-text' : 'opacity-0'}`} style={{ fontFamily: 'SUSE, sans-serif', fontSize: '14px', maxWidth: '80ch', lineHeight: '1.6' }}>
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