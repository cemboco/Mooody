import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import NotificationButton from './NotificationButton';

const AnimatedTitle = ({ onNotificationClick }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="animated-title w-full h-full flex flex-col items-center justify-between">
      <div className="flex-grow flex items-center justify-center flex-col">
        <h1 className="mooody-title text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 rounded-moody mb-4 opacity-0 animate-fade-in-delayed" style={{ marginTop: '-5cm' }}>MOOODY</h1>
        <p className="text-2xl sm:text-3xl md:text-4xl mt-4 text-center max-w-2xl opacity-0 animate-fade-in-more-delayed relative z-10 font-hevilla" style={{ marginTop: '-7rem' }}>
          {t.subtitle}
        </p>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16" style={{ marginLeft: '-120px' }}>
        <div className="animate-fade-in-button">
          <NotificationButton onClick={onNotificationClick} />
        </div>
      </div>
    </div>
  );
};

export default AnimatedTitle;