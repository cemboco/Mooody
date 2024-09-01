import React from 'react';
import { Button } from "@/components/ui/button"
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const MoodRatingScale = ({ onRatingSelect }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <p className="text-xl mb-4 text-center px-4">{t.moodRatingQuestion}</p>
      <div className="grid grid-cols-5 gap-2 w-full px-4 sm:grid-cols-10 sm:gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
          <Button
            key={rating}
            onClick={() => onRatingSelect(rating)}
            variant="outline"
            className="w-full h-12 sm:h-16"
          >
            {rating}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodRatingScale;