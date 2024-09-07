import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const moods = [
  {text: "wütend", color: "#FFC300"},
  {text: "selbstbewusst", color: "#DAF7A6"},
  {text: "optimistisch", color: "#FF5733"},
  {text: "taub", color: "#C70039"},
  {text: "müde", color: "#900C3F"},
  {text: "glücklich", color: "#581845"},
  {text: "traurig", color: "#FF8C00"},
  {text: "ängstlich", color: "#008080"},
  {text: "ruhig", color: "#FFA07A"},
  {text: "besorgt", color: "#20B2AA"},
  {text: "+", color: "#FFFFFF"}
];

const MoodSelectionPage = ({ show, onHomeClick }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedMoods, setSelectedMoods] = useState([]);

  const toggleMood = (mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else if (selectedMoods.length < 3) {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const circles = document.querySelectorAll('.mood-circle');
      circles.forEach(circle => {
        circle.style.left = `${Math.random() * 80}%`;
        circle.style.top = `${Math.random() * 80}%`;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-mooody-yellow transition-transform duration-500 ${show ? 'translate-x-0' : 'translate-x-[100%]'}`}>
      <div className="relative w-full h-full">
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`mood-circle absolute w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 ${selectedMoods.includes(mood) ? 'scale-110 shadow-lg' : ''}`}
            style={{
              backgroundColor: mood.color,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            onClick={() => toggleMood(mood)}
          >
            <span className="text-gray-200">{mood.text}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p>{t.selectMoodsInstruction}</p>
        {selectedMoods.length > 0 && (
          <Button className="mt-4 bg-mooody-green hover:bg-mooody-dark-green text-white">
            {t.continue}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MoodSelectionPage;