import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const ProgressTracker = ({ moodData }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{t.progressTitle}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis domain={[1, 10]} />
            <Tooltip 
              labelFormatter={formatDate}
              formatter={(value) => [value, t.moodLabel]}
            />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-600">{t.progressDescription}</p>
    </div>
  );
};

export default ProgressTracker;