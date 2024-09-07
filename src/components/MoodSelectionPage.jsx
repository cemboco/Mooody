import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Home } from 'lucide-react';

const moods = [
  {text: "wütend", color: "#FFC300", size: 80},
  {text: "selbstbewusst", color: "#DAF7A6", size: 90},
  {text: "optimistisch", color: "#FF5733", size: 85},
  {text: "taub", color: "#C70039", size: 75},
  {text: "müde", color: "#900C3F", size: 95},
  {text: "glücklich", color: "#581845", size: 88},
  {text: "traurig", color: "#FF8C00", size: 82},
  {text: "ängstlich", color: "#008080", size: 78},
  {text: "ruhig", color: "#FFA07A", size: 92},
  {text: "besorgt", color: "#20B2AA", size: 86},
  {text: "+", color: "#FFFFFF", size: 100},
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

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-mooody-yellow transition-transform duration-500 ${show ? 'translate-x-0' : 'translate-x-[100%]'}`}>
      <div className="relative w-full h-full">
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`mood-circle absolute flex items-center justify-center cursor-pointer transition-transform duration-300 ${selectedMoods.includes(mood) ? 'scale-110 shadow-lg' : ''}`}
            style={{
              backgroundColor: mood.color,
              width: `${mood.size}px`,
              height: `${mood.size}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            onClick={() => toggleMood(mood)}
          >
            <span className={`${mood.text === '+' ? 'text-5xl text-black' : 'text-gray-200'}`}>{mood.text}</span>
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
      <Button
        className="absolute top-4 right-4 bg-mooody-green hover:bg-mooody-dark-green text-white rounded-full p-2"
        onClick={onHomeClick}
      >
        <Home size={24} />
      </Button>
    </div>
  );
};

export default MoodSelectionPage;