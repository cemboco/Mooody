import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const HomeButton = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || {};
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 right-4 z-[60]">
            <Home className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => navigate('/home')}>{t.home || 'Home'}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/confirmation-mood')}>{t.entries || 'Entries'}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsPrivacyPolicyOpen(true)}>{t.privacyPolicy || 'Privacy Policy'}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
    </>
  );
};

export default HomeButton;
