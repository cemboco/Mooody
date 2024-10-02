import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import NotificationButton from './NotificationButton';

const AnimatedTitle = ({ onNotificationClick }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="hero-title">
      <h1 className="mooody-title text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 rounded-moody mb-4 opacity-0 animate-fade-in-delayed">MOOODY</h1>
      <p className="text-2xl sm:text-3xl md:text-4xl mt-4 text-center max-w-2xl opacity-0 animate-fade-in-more-delayed relative z-10 font-hevilla">
        {t.subtitle}
      </p>
      <div className="mt-16">
        <div className="animate-fade-in-button">
          <NotificationButton onClick={onNotificationClick} />
        </div>
      </div>
    </div>
  );
};

export default AnimatedTitle;