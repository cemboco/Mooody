import React, { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const MoodAnalysis = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [moodData, setMoodData] = useState([]);
  const [moodDistribution, setMoodDistribution] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
    const processedData = Object.entries(storedEntries).map(([date, entries]) => ({
      date,
      averageMood: entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    setMoodData(processedData);

    const distribution = {};
    Object.values(storedEntries).flat().forEach(entry => {
      distribution[entry.emotion] = (distribution[entry.emotion] || 0) + 1;
    });
    setMoodDistribution(Object.entries(distribution).map(([name, value]) => ({ name, value })));
  }, []);

  return (
    <div>
      <h2>{t.moodAnalysisTitle}</h2>
      <h3>{t.moodTrendsTitle}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={moodData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="averageMood" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <h3>{t.moodDistributionTitle}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={moodDistribution}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodAnalysis;
