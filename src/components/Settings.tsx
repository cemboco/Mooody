import React from 'react';
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Settings = ({ onClose }) => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const [notifications, setNotifications] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
    // Here you would typically implement the logic to enable/disable notifications
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Here you would typically implement the logic to switch between light and dark mode
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-2xl font-bold mb-4">{t.settings}</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="language">{t.language}</Label>
          <Button onClick={toggleLanguage}>
            {language === 'de' ? 'English' : 'Deutsch'}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">{t.notifications}</Label>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={handleNotificationToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">{t.darkMode}</Label>
          <Switch
            id="darkMode"
            checked={darkMode}
            onCheckedChange={handleDarkModeToggle}
          />
        </div>
      </div>

      <Button onClick={onClose} className="mt-6 w-full">
        {t.close}
      </Button>
    </div>
  );
};

export default Settings;