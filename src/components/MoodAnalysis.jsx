import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

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
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t.moodAnalysisTitle}</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{t.moodTrendsTitle}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="averageMood" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">{t.moodDistributionTitle}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={moodDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {moodDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodAnalysis;