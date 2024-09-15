import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const MoodAnalysis = ({ entries }) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Process entries for line chart
  const lineChartData = Object.entries(entries).map(([date, dayEntries]) => ({
    date,
    averageMood: dayEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayEntries.length
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Process entries for pie chart
  const moodCounts = Object.values(entries).flat().reduce((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(moodCounts).map(([emotion, count]) => ({
    name: t[emotion] || emotion,
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">{t.moodTrendsChart}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="averageMood" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">{t.moodDistributionChart}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodAnalysis;