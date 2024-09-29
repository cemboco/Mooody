import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

const VolumeControl = ({ isPlaying, toggleAudio }) => {
  return (
    <Button
      onClick={toggleAudio}
      variant="ghost"
      size="icon"
      className="text-white hover:text-gray-200"
    >
      {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
    </Button>
  );
};

export default VolumeControl;