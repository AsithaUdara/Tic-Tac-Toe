import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import Square from './Square';
import type { BoardProps } from '../../../types/game.types';

const Board: React.FC<BoardProps> = ({ squares, onSquareClick, winningLine, currentPlayer }) => {
  const { animationDuration } = useTheme();
  
  // Calculate dynamic size for smaller screens
  const boardSize = typeof window !== 'undefined' 
    ? Math.min(300, window.innerWidth - 40) 
    : 300;
  
  // Check if a square is part of the winning line
  const isWinningSquare = (index: number): boolean => {
    return winningLine ? winningLine.includes(index) : false;
  };
  
  return (
    <div 
      className="relative grid grid-cols-3 gap-2 sm:gap-3"
      style={{ 
        width: boardSize,
        height: boardSize,
        animationDuration: `${animationDuration}ms`
      }}
    >
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square} // Can be null now
          onSquareClick={() => onSquareClick(i)}
          isWinningSquare={isWinningSquare(i)}
          index={i}
          currentPlayer={currentPlayer}
        />
      ))}
    </div>
  );
};

export default Board;