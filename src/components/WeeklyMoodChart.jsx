import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const WeeklyMoodChart = ({ moodData }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const last7Days = moodData.slice(-7);
  const chartData = last7Days.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', { weekday: 'short' }),
    mood: entry.mood
  }));

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{t.weeklyMoodChart}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Bar dataKey="mood" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyMoodChart;