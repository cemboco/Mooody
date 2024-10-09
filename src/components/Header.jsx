import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { translations } from '../utils/translations';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Header = () => {
  const navigate = useNavigate();
  const t = translations['en']; // Using English translations by default
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogClick = (destination) => {
    setIsModalOpen(false);
    navigate(destination);
  };

  return (
    <header className="w-full bg-mooody-yellow py-2 px-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex-1">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-black border-black hover:bg-black hover:text-mooody-yellow rounded-full px-6 py-2"
            >
              Log
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose an activity</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-2 mt-4">
              <Button onClick={() => handleLogClick('/gratitude')}>Gratitude Log</Button>
              <Button onClick={() => handleLogClick('/meditate')}>Meditation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Link to="/" className="flex-1 text-center">
        <h1 className="text-2xl font-bold text-black font-['Julius_Sans_One'] tracking-wider">
          mooody
        </h1>
      </Link>
      
      <div className="flex-1 flex justify-end items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-black">
              <div className="menu-icon">
                <span className="block w-5 h-0.5 bg-current mb-1"></span>
                <span className="block w-5 h-0.5 bg-current mb-1"></span>
                <span className="block w-5 h-0.5 bg-current"></span>
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