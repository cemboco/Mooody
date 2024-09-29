import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Home } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <nav className="w-full bg-transparent py-4 px-6 flex justify-between items-center">
      {!isHomePage && (
        <Button
          onClick={() => navigate('/home')}
          variant="ghost"
          className="text-[#2D3748] hover:text-[#4A5568]"
        >
          <Home className="h-4 w-4 mr-2" />
          {t.home}
        </Button>
      )}
      <div className="text-center flex-1">
        <h1 className="text-2xl font-bold text-[#2D3748]">mooody</h1>
      </div>
      <div className="flex items-center space-x-4">
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