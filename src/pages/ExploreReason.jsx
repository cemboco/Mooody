import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import { Smile, Users, Brain, Heart, HelpCircle } from 'lucide-react';

const ExploreReason = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    { id: 'positive', label: t.reasonPositive, icon: <Smile className="h-5 w-5 text-yellow-500" /> },
    { id: 'relationships', label: t.reasonRelationships, icon: <Users className="h-5 w-5 text-blue-500" /> },
    { id: 'stress', label: t.reasonStress, icon: <Brain className="h-5 w-5 text-purple-500" /> },
    { id: 'understand', label: t.reasonUnderstand, icon: <Heart className="h-5 w-5 text-red-500" /> },
    { id: 'other', label: t.reasonOther, icon: <HelpCircle className="h-5 w-5 text-green-500" /> },
  ];

  const handleContinue = () => {
    if (selectedReason) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-mooody-yellow text-mooody-green p-4">
      <LanguageToggle />
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">{t.exploreReasonTitle}</h1>
        <RadioGroup value={selectedReason} onValueChange={setSelectedReason} className="space-y-4">
          {reasons.map((reason) => (
            <div key={reason.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center">
                <RadioGroupItem value={reason.id} id={reason.id} className="mr-4" />
                <Label htmlFor={reason.id}>{reason.label}</Label>
              </div>
              {reason.icon}
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={handleContinue}
          className="w-full mt-8 bg-mooody-green hover:bg-mooody-dark-green text-white text-lg py-3 rounded-full transition-colors shadow-lg"
          disabled={!selectedReason}
        >
          {t.continue}
        </Button>
      </div>
    </div>
  );
};

export default ExploreReason;