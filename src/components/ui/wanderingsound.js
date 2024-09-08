import React, { useRef, useState } from 'react';

const WanderingSound = () => {
  // Reference to the audio element
  const audioRef = useRef(null);

  // State to manage volume
  const [volume, setVolume] = useState(1); // Default volume is 1 (max)

  // Function to play the sound
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // Function to pause the sound
  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Function to stop the sound
  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the start
    }
  };

  // Function to change volume
  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume); // Update state
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Set audio element volume
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      {/* Audio element */}
      <audio ref={audioRef} src="/wandering-6394.mp3" preload="auto" />

      {/* Play Button */}
      <button
        onClick={playSound}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
      >
        Play Sound
      </button>

      {/* Pause Button */}
      <button
        onClick={pauseSound}
        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
      >
        Pause Sound
      </button>

      {/* Stop Button */}
      <button
        onClick={stopSound}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
      >
        Stop Sound
      </button>

      {/* Volume Control Slider */}
      <div className="flex items-center space-x-4">
        <label htmlFor="volume" className="text-gray-700">
          Volume
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          className="w-32"
        />
      </div>
    </div>
  );
};

export default WanderingSound;
