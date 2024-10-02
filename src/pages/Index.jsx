import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import MoodBalls from '../components/MoodBalls';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language] || {};
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const emotionsColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF', '#FF00FF', '#FF1493'];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center text-mooody-green overflow-hidden" style={{ backgroundImage: "url('/Bg.png')" }}>
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
        <LanguageToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <div className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate('/home')}>{t.home || 'Home'}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/confirmation-mood')}>{t.entries || 'Entries'}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsPrivacyPolicyOpen(true)}>{t.privacyPolicy || 'Privacy Policy'}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4">
        <MoodBalls showText={false} showHappyText={false} />
        <div className="hero-title">
          <div className="hero-content">
            <h1 className="hero-heading">
              Regulate your mood, unravel your{' '}
              <span className="emotions-text">
                {Array.from('emotions').map((letter, index) => (
                  <span key={index} style={{ color: emotionsColors[index % emotionsColors.length] }}>
                    {letter}
                  </span>
                ))}
              </span>
              .
            </h1>
            <p className="hero-subheading">
              Your feelings - whether they are of joy, sadness, fear, or excitement - are powerful messengers. Mooody provides the space you need to track and understand what those feelings are telling you.
            </p>
          </div>
          <div className="cta-container">
            <Button 
              className="cta-button bg-[#F87171] hover:bg-[#EF4444] text-white rounded-full"
              onClick={() => navigate('/mood')}
            >
              <span className="cta-text">I'm ready to build a relationship with myself</span>
              <ArrowRight className="cta-arrow" />
            </Button>
            <p className="cta-subtext">Try for free - No Credit Card Required.</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 text-center p-2 bg-gray-100 text-gray-500 text-xs italic z-30">
        {language === 'de' ? 
          "Diese App ersetzt keine professionelle psychologische oder medizinische Beratung. Bei ernsthaften mentalen Problemen oder Krisen suchen Sie bitte einen Spezialisten oder Therapeuten auf." :
          "This app does not replace professional psychological or medical advice. For serious mental health issues or crises, please consult a specialist or therapist."
        }
      </div>
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
    </div>
  );
};

export default Index;