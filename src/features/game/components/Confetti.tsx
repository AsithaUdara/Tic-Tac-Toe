import React, { useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';

// Define the props interface locally if there's an issue with importing it
interface ConfettiProps {
  show: boolean;
}

// Confetti effect for wins
const Confetti: React.FC<ConfettiProps> = ({ show }) => {
  const { colors, theme } = useTheme();
  const confettiRef = useRef<HTMLDivElement>(null);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40" ref={confettiRef}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              theme === 'elegance' ? 'bg-black' : 
              Math.random() > 0.5 ? colors.xColor.replace('text-', 'bg-') : colors.oColor.replace('text-', 'bg-')
            } animate-confetti`}
            style={{
              left: `${Math.random() * 100}%`,
              top: '-5%',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Confetti;