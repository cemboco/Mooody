import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const breathingTechniques = [
  {
    name: "Physiological Sigh",
    info: "Two inhales followed by a long exhale. Helps reduce stress quickly."
  },
  {
    name: "Box Breathing",
    info: "Inhale, hold, exhale, and hold again, each for 4 seconds. Improves focus and calmness."
  },
  {
    name: "4-7-8 Breathing",
    info: "Inhale for 4, hold for 7, exhale for 8. Promotes relaxation and better sleep."
  },
  {
    name: "Coherent Breathing",
    info: "Breathe at a rate of 5 breaths per minute. Balances the autonomic nervous system."
  },
  {
    name: "Belly Breathing",
    info: "Deep breaths that expand your abdomen. Reduces stress and improves oxygenation."
  }
];

const Breathing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-cover bg-center p-4 flex flex-col items-center" style={{ backgroundImage: "url('/Bg.png')" }}>
      <h1 className="text-4xl font-bold mb-4 font-['Julius_Sans_One'] text-center text-[#324054]">Breathing</h1>
      <p className="text-xl mb-8 text-center text-[#4A5568] max-w-2xl">
        Exercises to center your mind, improve focus, and reduce stress
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {breathingTechniques.map((technique, index) => (
          <div key={index} className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex items-center justify-between">
            <span className="text-lg font-semibold text-[#2D3748]">{technique.name}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5 text-[#4A5568]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{technique.info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
      <Button onClick={() => navigate('/mood')} className="mt-8 rounded-full">
        Back to Mood
      </Button>
    </div>
  );
};

export default Breathing;