import React, { useEffect, useRef } from 'react';

const FloatingBalls = ({ children }) => {
  const containerRef = useRef(null);
  const ballsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const balls = ballsRef.current;
    let animationFrameId;

    const moveBalls = () => {
      balls.forEach((ball, index) => {
        const rect = ball.getBoundingClientRect();
        const speed = 0.5 + Math.random() * 0.5;
        let dx = (ball.dx || (Math.random() - 0.5) * speed);
        let dy = (ball.dy || (Math.random() - 0.5) * speed);

        let nextX = rect.left + dx;
        let nextY = rect.top + dy;

        // Check for collisions with container boundaries
        if (nextX <= 0 || nextX + rect.width >= container.clientWidth) {
          dx = -dx;
        }
        if (nextY <= 0 || nextY + rect.height >= container.clientHeight) {
          dy = -dy;
        }

        // Check for collisions with other balls
        balls.forEach((otherBall, otherIndex) => {
          if (index !== otherIndex) {
            const otherRect = otherBall.getBoundingClientRect();
            const dx = rect.left - otherRect.left;
            const dy = rect.top - otherRect.top;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (rect.width + otherRect.width) / 2;

            if (distance < minDistance) {
              // Collision detected, reverse direction
              ball.dx = -ball.dx;
              ball.dy = -ball.dy;
              otherBall.dx = -otherBall.dx;
              otherBall.dy = -otherBall.dy;
            }
          }
        });

        // Update ball position
        ball.style.left = `${nextX}px`;
        ball.style.top = `${nextY}px`;
        ball.dx = dx;
        ball.dy = dy;
      });

      animationFrameId = requestAnimationFrame(moveBalls);
    };

    moveBalls();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {React.Children.map(children, (child, index) => (
        React.cloneElement(child, { ref: (el) => (ballsRef.current[index] = el) })
      ))}
    </div>
  );
};

export default FloatingBalls;