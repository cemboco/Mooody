import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="icon"
      className="fixed top-4 left-4 z-50"
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">{language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}</span>
    </Button>
  );
};

export default LanguageToggle;