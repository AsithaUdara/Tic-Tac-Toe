import React from 'react';
import Square from './Square';
import type { Player } from '../../../types/game.types';

// Board component props interface
interface BoardProps {
  squares: Player[];
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
  currentPlayer: Player;
}

// Game board component
const Board: React.FC<BoardProps> = ({ squares, onSquareClick, winningLine, currentPlayer }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-2 p-1">
        {Array(9).fill(null).map((_, i) => (
          <Square 
            key={i}
            index={i}
            value={squares[i]} 
            onSquareClick={() => onSquareClick(i)} 
            isWinningSquare={winningLine ? winningLine.includes(i) : false}
            currentPlayer={currentPlayer}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;