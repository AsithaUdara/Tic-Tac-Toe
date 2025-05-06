import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { Player } from '../../../types/game.types';

// Square component props interface
interface SquareProps {
  value: Player | null; 
  onSquareClick: () => void;
  isWinningSquare: boolean;
  index: number;
  currentPlayer: Player;
}

// Square component with SVG animations
const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinningSquare, index, currentPlayer }) => {
  const { colors, animationDuration, theme } = useTheme();
  const [animationProgress, setAnimationProgress] = useState<number>(value ? 1 : 0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const prevValueRef = useRef<typeof value>(value);
  
  useEffect(() => {
    // Start animation when value changes from null to X or O
    if (value && value !== prevValueRef.current) {
      setAnimationProgress(0);
      const startTime = performance.now();
      
      const animate = (time: number): void => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        setAnimationProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
    
    prevValueRef.current = value;
  }, [value, animationDuration]);
  
  // Show preview of current player's mark on hover when square is empty
  const handleMouseEnter = (): void => {
    if (!value) {
      setIsHovered(true);
      setShowPreview(true);
    }
  };
  
  const handleMouseLeave = (): void => {
    setIsHovered(false);
    setShowPreview(false);
  };
  
  // SVG paths for X and O with drawing animation
  const getXPath = (progress: number): React.ReactElement => {
    // Draw X with two lines, animated by progress (0-1)
    const length = progress * 100;
    return (
      <>
        <line 
          x1="20" y1="20" 
          x2={20 + (length * 0.6)} y2={20 + (length * 0.6)} 
          stroke="currentColor" 
          strokeWidth="8" 
          strokeLinecap="round"
          className={theme === 'elegance' ? '' : 'drop-shadow-glow'}
        />
        {progress > 0.5 && (
          <line 
            x1="80" y1="20" 
            x2={80 - ((progress - 0.5) * 120)} y2={20 + ((progress - 0.5) * 120)} 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeLinecap="round"
            className={theme === 'elegance' ? '' : 'drop-shadow-glow'}
          />
        )}
      </>
    );
  };

  const getOPath = (progress: number): React.ReactElement => {
    // Draw O as a circle, animated by progress (0-1)
    const circumference = 2 * Math.PI * 30;
    const strokeDasharray = `${circumference * progress} ${circumference}`;
    
    return (
      <circle 
        cx="50" cy="50" r="30" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        className={theme === 'elegance' ? '' : 'drop-shadow-glow'}
      />
    );
  };
  
  // Base classes and conditional classes
  const baseClasses = `w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-200`;
  const stateClasses = value === 'X' ? colors.xColor : value === 'O' ? colors.oColor : '';
  const winningClasses = isWinningSquare ? `${colors.winColor}` : '';
  const hoverClasses = !value && isHovered ? 'bg-gray-800/50' : '';
  
  // Determine preview mark color
  const previewColor = currentPlayer === 'X' ? colors.xColor : colors.oColor;
  
  // Note: The 'index' prop is used for array key but not directly in this component
  // Keeping it for future use or parent component needs
  console.debug(`Square at index ${index} rendered`);
  
  return (
    <button 
      className={`${baseClasses} ${stateClasses} ${winningClasses} ${hoverClasses} 
      backdrop-blur-sm border border-gray-700 rounded-md relative overflow-hidden
      transform transition-transform duration-200 ${isHovered ? 'scale-105' : ''}
      ${isWinningSquare ? 'animate-pulse-subtle' : ''}`}
      onClick={onSquareClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {showPreview && !value && (
        <div className={`absolute inset-0 flex items-center justify-center opacity-20 ${previewColor}`}>
          <svg width="100" height="100" viewBox="0 0 100 100" className="w-2/3 h-2/3">
            {currentPlayer === 'X' ? 
              <g>
                <line x1="30" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                <line x1="70" y1="30" x2="30" y2="70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </g> : 
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="8" />
            }
          </svg>
        </div>
      )}
      {value && (
        <svg width="100" height="100" viewBox="0 0 100 100" className="w-3/4 h-3/4">
          {value === 'X' ? getXPath(animationProgress) : getOPath(animationProgress)}
        </svg>
      )}
      {isWinningSquare && (
        <div className="absolute inset-0 z-0 animate-pulse-win opacity-30"></div>
      )}
    </button>
  );
};

export default Square;