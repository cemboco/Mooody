import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <nav className="w-full bg-[#FFF8E7] py-4 px-6 flex justify-between items-center">
      <div className="flex-1"></div>
      <div className="text-center flex-1">
        <h1 className="text-2xl font-bold text-[#2D3748]">mooody</h1>
      </div>
      <div className="flex items-center space-x-4 flex-1 justify-end">
        <Button
          onClick={() => navigate('/confirmation-mood')}
          variant="ghost"
          className="text-[#2D3748] hover:text-[#4A5568]"
        >
          {t.goToJournal || 'Go to Journal'}
        </Button>
        <Button
          onClick={toggleLanguage}
          variant="ghost"
          className="text-[#2D3748] hover:text-[#4A5568]"
        >
          {language === 'en' ? 'EN' : 'DE'}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;