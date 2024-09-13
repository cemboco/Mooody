import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'de';
  });

  const toggleLanguage = () => {
    setLanguage(prevLang => {
      const languages = ['de', 'en', 'fr', 'es'];
      const currentIndex = languages.indexOf(prevLang);
      const nextIndex = (currentIndex + 1) % languages.length;
      return languages[nextIndex];
    });
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
