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
      className="bg-white text-black shadow-lg rounded-full px-6 py-3 text-xl font-semibold"
    >
      {t.notificationButton}
    </Button>
  );
};

export default NotificationButton;