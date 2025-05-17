import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ expiryTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpiring, setIsExpiring] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = expiryTime - now;
      return difference > 0 ? difference : 0;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      setIsExpiring(remaining > 0 && remaining <= 60000);

      if (remaining === 0 && onExpire) {
        onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime, onExpire]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className={`countdown-timer ${isExpiring ? 'expiring' : ''}`}>
      <div className="timer-display">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="timer-label">
        Tiempo restante para usar el código
      </div>
    </div>
  );
};

export default CountdownTimer; 