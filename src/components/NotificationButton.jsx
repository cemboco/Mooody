import React from 'react';
import { Button } from "@/components/ui/button"
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const NotificationButton = ({ onClick }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="lg"
      className="fixed top-4 left-[calc(50%+120px)] transform -translate-x-1/2 z-[60] bg-white text-black hover:text-moodyText transition-colors text-xl px-6 py-3"
    >
      {t.notificationButton}
    </Button>
  );
};

export default NotificationButton;