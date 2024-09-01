import React from 'react';
import { Button } from "@/components/ui/button"

const MoodRatingScale = ({ onRatingSelect }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-xl mb-4">Wie fühlst du dich jetzt auf einer Skala von 1-10?</p>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
          <Button
            key={rating}
            onClick={() => onRatingSelect(rating)}
            variant="outline"
            className="w-10 h-10"
          >
            {rating}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodRatingScale;