import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      className="text-[#2D3748] hover:text-[#4A5568]"
    >
      {language === 'de' ? 'EN' : 'DE'}
    </Button>
  );
};

export default LanguageToggle;