import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import VolumeControl from '../components/VolumeControl';
import Navbar from '../components/Navbar';
import AnimatedTitle from '../components/AnimatedTitle';
import ProductHuntBadge from '../components/ProductHuntBadge';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate('/mood');
  };

  return (
    <div className="h-screen w-full bg-[#FFF8E7] text-[#2D3748] overflow-hidden relative flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center px-4 relative">
        <AnimatedTitle onNotificationClick={handleNotificationClick} />
        <div className="absolute bottom-4 left-4">
          <VolumeControl />
        </div>
        <div className="absolute bottom-4 right-4">
          <ProductHuntBadge />
        </div>
      </div>
    </div>
  );
};

export default Index;