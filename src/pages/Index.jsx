import React, { useEffect, useState } from 'react';
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

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

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
        <div className="hero-title">
          <div className="hero-content">
            <h1 className="hero-heading font-['Bricolage_Grotesque'] text-[#334155] flex flex-col items-center justify-center w-full sm:w-[866px] h-[152px] text-[40px] sm:text-[80px] leading-[1.2] sm:leading-[76px] text-center tracking-[-3px] self-stretch">
              <span>Regulate your mood,</span>
              <span>unravel your <span className="inline-block">
                <span className="text-red-500">e</span>
                <span className="text-orange-500">m</span>
                <span className="text-yellow-500">o</span>
                <span className="text-green-500">t</span>
                <span className="text-blue-300">i</span>
                <span className="text-blue-700">o</span>
                <span className="text-purple-500">n</span>
                <span className="text-pink-500">s</span>
              </span></span>
            </h1>
            <p className="hero-subheading">
              Your feelings - whether they are of joy, sadness, fear, or excitement - are powerful messengers. Mooody provides the space you need to track and understand what those feelings are telling you.
            </p>
          </div>
          <div className="cta-container">
            <Button 
              className="cta-button box-border flex flex-row justify-center items-center py-3 px-8 gap-2 w-[359px] h-12 bg-[#F87171] border border-[#DC2626] rounded-full shadow-[inset_0px_-4px_3.2px_rgba(0,0,0,0.25)] hover:bg-[#F87171]/90 transition-colors"
              onClick={() => navigate('/mood')}
            >
              <span className="cta-text font-['Bricolage_Grotesque'] font-semibold text-base leading-6 text-center tracking-[-1px] text-white">
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
