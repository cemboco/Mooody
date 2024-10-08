import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Header = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="w-full bg-mooody-yellow py-2 px-4 flex justify-between items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => navigate('/home')}>{t.home}</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate('/confirmation-mood')}>{t.entries}</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate('/meditate')}>{t.meditateTitle}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <h1 className="text-2xl font-bold text-mooody-green">Mooody</h1>
      
      <Button
        onClick={() => navigate('/gratitude')}
        variant="outline"
        className="text-mooody-green border-mooody-green hover:bg-mooody-green hover:text-mooody-yellow"
      >
        {t.gratitudeLogTitle}
      </Button>
    </header>
  );
};

export default Header;