import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const UserStats = ({ userCount, averageMoodImprovement }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="text-center mt-4">
      <p className="text-sm text-gray-600">
        {t.userStatsMessage
          .replace('{userCount}', userCount)
          .replace('{moodImprovement}', averageMoodImprovement.toFixed(1))}
      </p>
    </div>
  );
};

export default UserStats;