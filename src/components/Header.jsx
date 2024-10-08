import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Header = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="w-full bg-mooody-yellow py-2 px-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-mooody-green">Mooody</h1>
      
      <Button
        onClick={() => navigate('/gratitude')}
        variant="outline"
        className="text-mooody-green border-mooody-green hover:bg-mooody-green hover:text-mooody-yellow rounded-full px-6 py-2"
      >
        {t.gratitudeLogTitle}
      </Button>
    </header>
  );
};

export default Header;