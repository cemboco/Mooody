import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useAuth } from '../contexts/AuthContext';

const HomeButton = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const { isLoggedIn, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4 z-[60]">
          <Home className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate('/home')}>{t.home}</DropdownMenuItem>
        {isLoggedIn ? (
          <>
            <DropdownMenuItem onClick={() => navigate('/confirmation-mood')}>{t.entries}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { logout(); navigate('/home'); }}>{t.logout}</DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => navigate('/confirmation-mood')}>{t.entries}</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HomeButton;