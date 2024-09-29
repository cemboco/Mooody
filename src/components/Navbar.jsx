import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Navbar = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <nav className="w-full bg-[#FFF8E7] py-4 px-6 flex flex-col items-center">
      <img src="/header.png" alt="Header" className="w-full max-w-4xl mb-4" />
      <div className="flex justify-between items-center w-full max-w-4xl">
        <Button
          onClick={() => navigate('/confirmation-mood')}
          variant="outline"
          className="text-[#2D3748] hover:text-[#4A5568]"
        >
          {t.goToJournal || 'Go to Journal'}
        </Button>
        <h1 className="text-2xl font-bold text-[#2D3748]">mooody</h1>
        <Button
          onClick={toggleLanguage}
          variant="ghost"
          className="text-[#2D3748] hover:text-[#4A5568]"
        >
          {language === 'en' ? 'EN' : 'DE'}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;