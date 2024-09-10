import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const ConfirmationMood = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-mooody-yellow text-mooody-green p-4">
      <LanguageToggle />
      <h1 className="text-3xl font-bold mb-8">{t.confirmationTitle}</h1>
      <p className="text-xl mb-8 text-center">{t.confirmationMessage}</p>
      <Button
        onClick={() => navigate('/home')}
        className="mb-4"
      >
        {t.backToHome}
      </Button>
      <Button
        onClick={() => navigate('/mood')}
        variant="outline"
      >
        {t.newMoodEntry}
      </Button>
    </div>
  );
};

export default ConfirmationMood;