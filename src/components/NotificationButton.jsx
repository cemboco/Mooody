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
      className="fixed top-4 right-4 bg-white text-black shadow-lg rounded-full p-4 text-lg font-semibold"
    >
      {t.notificationButton}
    </Button>
  );
};

export default NotificationButton;