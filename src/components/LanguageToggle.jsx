import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  const getLanguageLabel = () => {
    switch (language) {
      case 'de': return 'DE';
      case 'en': return 'EN';
      case 'fr': return 'FR';
      case 'es': return 'ES';
      default: return language.toUpperCase();
    }
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 left-4 z-50 bg-white"
    >
      <Globe className="h-4 w-4 mr-2" />
      {getLanguageLabel()}
    </Button>
  );
};

export default LanguageToggle;
