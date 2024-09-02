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
      className="fixed top-4 left-[calc(50%+120px)] transform -translate-x-1/2 z-[60] bg-[#9AE66E] hover:bg-[#8AD65E] text-black font-hevilla text-xl px-6 py-3 rounded-full transition-colors"
    >
      {t.notificationButton}
    </Button>
  );
};

export default NotificationButton;