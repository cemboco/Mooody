import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const UserStats = ({ userCount, averageMoodImprovement }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const message = userCount === 1 ? t.userStatsMessageSingular : t.userStatsMessagePlural;

  return (
    <div className="text-center mt-4">
      <p className="text-sm text-gray-600">
        {message
          .replace('{userCount}', userCount)
          .replace('{moodImprovement}', averageMoodImprovement.toFixed(1))}
      </p>
    </div>
  );
};

export default UserStats;