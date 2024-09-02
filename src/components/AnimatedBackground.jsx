import React from 'react';

const AnimatedBackground = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-moody text-moodyText overflow-hidden">
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
        <div className="animated-title w-full h-full flex flex-col items-center justify-between">
          <div className="ball ball1"></div>
          <div className="ball ball2"></div>
          <div className="ball ball3"></div>
          <div className="ball ball4"></div>
          <div className="ball ball5"></div>
          <div className="ball ball6"></div>
          <div className="ball ball7"></div>
          <div className="ball ball8"></div>
          <div className="ball ball9"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;