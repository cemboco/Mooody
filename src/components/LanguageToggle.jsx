import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 left-4 z-50 bg-white"
    >
      <Globe className="h-4 w-4 mr-2" />
      {language === 'de' ? 'DE' : 'EN'}
    </Button>
  );
};

export default LanguageToggle;