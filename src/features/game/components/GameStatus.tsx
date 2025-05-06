import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { Player, GameState } from '../../../types/game.types';

// Game Status component props interface
interface GameStatusProps {
  gameState: GameState;
  currentPlayer: Player;
  isAIThinking: boolean;
}

// Game Status component
const GameStatus: React.FC<GameStatusProps> = ({ gameState, currentPlayer, isAIThinking }) => {
  const { colors } = useTheme();
  
  let statusText = '';
  let statusClass = `font-semibold text-lg md:text-xl mb-6 text-center transition-colors duration-300`;
  
  if (gameState.isOver) {
    if (gameState.winner) {
      statusText = `Winner: ${gameState.winner}`;
      statusClass += gameState.winner === 'X' ? ` ${colors.xColor}` : ` ${colors.oColor}`;
      statusClass += ' animate-pulse';
    } else {
      statusText = "Game ended in a draw!";
      statusClass += ' text-gray-400';
    }
  } else if (isAIThinking) {
    statusText = "AI is thinking...";
    statusClass += ' text-gray-300 animate-pulse';
  } else {
    statusText = `${currentPlayer}'s turn`;
    statusClass += currentPlayer === 'X' ? ` ${colors.xColor}` : ` ${colors.oColor}`;
  }
  
  return <div className={statusClass}>{statusText}</div>;
};

export default GameStatus;