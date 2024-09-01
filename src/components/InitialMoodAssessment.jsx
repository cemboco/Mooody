import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const InitialMoodAssessment = ({ onAssessmentComplete }) => {
  const [moodValue, setMoodValue] = useState(5);

  const handleSliderChange = (value) => {
    setMoodValue(value[0]);
  };

  const handleSubmit = () => {
    onAssessmentComplete(moodValue);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Wie ist dein Gemütszustand?</h2>
      <div className="space-y-4">
        <Slider
          defaultValue={[5]}
          max={10}
          step={1}
          onValueChange={handleSliderChange}
        />
        <div className="flex justify-between text-sm">
          <span>Sehr schlecht (1)</span>
          <span>Hervorragend (10)</span>
        </div>
        <p className="text-center">Dein Gemütszustand: {moodValue}</p>
      </div>
      <Button onClick={handleSubmit} className="w-full">Weiter</Button>
    </div>
  );
};

export default InitialMoodAssessment;
