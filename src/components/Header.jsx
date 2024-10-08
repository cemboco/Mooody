import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="w-full bg-mooody-yellow py-2 px-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-mooody-green font-sans tracking-wider">
        M O O O D Y
      </Link>
      
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => navigate('/gratitude')}
          variant="outline"
          className="text-mooody-green border-mooody-green hover:bg-mooody-green hover:text-mooody-yellow rounded-full px-6 py-2"
        >
          {t.gratitudeLogTitle}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-mooody-green">
              <div className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => navigate('/home')}>{t.home}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate('/confirmation-mood')}>{t.entries}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate('/privacy-policy')}>{t.privacyPolicy}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;