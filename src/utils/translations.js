import React from 'react';
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MoodAnalysis = () => {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const moodData = [
    { name: 'Happy', value: 10 },
    { name: 'Sad', value: 20 },
    { name: 'Tired', value: 30 },
    { name: 'Angry', value: 40 },
    { name: 'Stressed', value: 50 },
  ];

  return (
    <div>
      <h2>{translations.de.moodAnalysisTitle}</h2>
      <h3>{translations.de.moodTrendsTitle}</h3>
      <LineChart width={500} height={300} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
      </LineChart>
      <h3>{translations.de.moodDistributionTitle}</h3>
      <PieChart width={400} height={400}>
        <Pie data={moodData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
        <Pie data={moodData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MoodAnalysis;
