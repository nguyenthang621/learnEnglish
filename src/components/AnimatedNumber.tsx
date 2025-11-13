import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number; // ms
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 200 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const initial = displayValue;
    const diff = value - initial;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.floor(initial + diff * progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value]);

  return <div className="ml-2">{displayValue}</div>;
};

export default AnimatedNumber;
