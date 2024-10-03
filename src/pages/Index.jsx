import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import LanguageToggle from '@/components/LanguageToggle';
import MoodBalls from '@/components/MoodBalls';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PrivacyPolicyModal from '@/components/PrivacyPolicyModal';
import { ArrowRight } from 'lucide-react';

const useLanguage = () => {
  const [language, setLanguage] = useState('en');
  return { language, setLanguage };
};

const translations = {
  en: {
    home: 'Home',
    entries: 'Entries',
    privacyPolicy: 'Privacy Policy',
  },
  de: {
    home: 'Startseite',
    entries: 'Einträge',
    privacyPolicy: 'Datenschutzrichtlinie',
  },
};

const ColorfulText = ({ text }: { text: string }) => {
  const colors = ['text-red-500', 'text-yellow-500', 'text-green-500', 'text-blue-500', 'text-purple-500', 'text-pink-500'];
  return (
    <span>
      {text.split('').map((letter, index) => (
        <span key={index} className={colors[index % colors.length]}>
          {letter}
        </span>
      ))}
    </span>
  );
};

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const navigate = useNavigate();
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

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
            <DropdownMenuItem onSelect={() => navigate('/home')}>{t.home}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate('/confirmation-mood')}>{t.entries}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setIsPrivacyPolicyOpen(true)}>{t.privacyPolicy}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4">
        <MoodBalls showText={false} showHappyText={false} />
        <div className="hero-title max-w-6xl w-full px-4">
          <div className="hero-content">
            <h1 className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight mb-6 text-center">
              Regulate your mood, unravel your <ColorfulText text="emotions" />.
            </h1>
            <p className="hero-subheading max-w-3xl mx-auto text-lg text-slate-600 mb-8 text-center">
              Your feelings—whether they are of joy, sadness, fear, or excitement—are powerful messengers. Mooody provides the space you need to track and understand what those feelings are telling you.
            </p>
          </div>
          <div className="cta-container flex flex-col items-center">
            <Button 
              className="cta-button box-border flex flex-row justify-center items-center py-3 px-8 gap-2 w-full max-w-md h-12 bg-[#F87171] border border-[#DC2626] rounded-full shadow-[inset_0px_-4px_3.2px_rgba(0,0,0,0.25)] hover:bg-[#F87171]/90 transition-colors"
              onClick={() => navigate('/mood')}
            >
              <span className="cta-text font-['Hanken_Grotesk'] font-semibold text-base leading-6 text-center tracking-[-1px] text-white">
                I'm ready to build a relationship with myself
              </span>
              <ArrowRight className="cta-arrow w-4 h-4 text-white" />
            </Button>
            <p className="cta-subtext font-['Geist'] font-normal text-xs leading-4 text-center tracking-[-0.5px] text-[#020617] mt-3">
              Try for free - No Credit Card Required.
            </p>
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
