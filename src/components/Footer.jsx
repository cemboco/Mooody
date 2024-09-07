import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-mooody-green text-white py-4 text-center">
      <p>&copy; 2024 Mooody. {t.footerText}</p>
    </footer>
  );
};

export default Footer;