import React, { useState, useEffect } from 'react';
import { displayMoney } from '../utils/functions';

const RunningTextCounter = ({ endValue, duration,step=1 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let requestId = null;

    const startAnimation = (timestamp) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }

      const progress = timestamp - startTimestamp;
      const increment = Math.ceil((endValue / duration) * progress * step);

      if (increment < endValue) {
        setCount(increment);
        requestId = requestAnimationFrame(startAnimation);
      } else {
        setCount(endValue);
      }
    };

    requestId = requestAnimationFrame(startAnimation);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [endValue, duration, step]);

  return (
    <div className="running-text-counter">
      <span>{displayMoney(count)}</span>
    </div>
  );
};
export default RunningTextCounter;