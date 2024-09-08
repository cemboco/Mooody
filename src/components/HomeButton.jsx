import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const HomeButton = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Home className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate('/home')}>
          {t.home}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/confirmation-mood')}>
          {t.entries}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HomeButton;