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
      className="fixed top-4 right-4 bg-white text-black shadow-lg rounded-full p-3 flex items-center space-x-2"
    >
      <span>{t.notificationButton}</span>
    </Button>
  );
};

export default NotificationButton;