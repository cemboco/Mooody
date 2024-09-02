import React from 'react';
import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const NotificationButton = ({ onClick }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-[60] bg-white text-black hover:text-moodyText transition-colors"
    >
      <Bell className="h-4 w-4 mr-2" />
      {t.notificationButton}
    </Button>
  );
};

export default NotificationButton;