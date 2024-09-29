import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

const VolumeControl = ({ isPlaying, toggleAudio }) => {
  return (
    <Button
      onClick={toggleAudio}
      variant="outline"
      size="icon"
      className="fixed bottom-16 left-4 z-50 bg-white"
    >
      {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </Button>
  );
};

export default VolumeControl;