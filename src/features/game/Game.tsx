import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useGameWithAI } from './hooks/useGameWithAI';
import GameStatus from './components/GameStatus';
import { Board } from './components';
import type { GameProps, GameState, Player } from '../../types/game.types';

// Game Panel Component
const Game: React.FC<GameProps> = ({ 
  onShowNotification, 
  onGameStateChange,
  gameMode,
  aiDifficulty,
  humanPlayer
}) => {
  const { colors } = useTheme();
  const {
    history,
    currentMove,
    currentSquares,
    xIsNext,
    gameState,
    isAIThinking,
    handleSquareClick,
    jumpTo,
    startNewGame,
    setGameMode: setGameModeInternal,
    setAiDifficulty: setAiDifficultyInternal,
    setHumanPlayer: setHumanPlayerInternal
  } = useGameWithAI();
  
  // Sync props with internal state when they change
  useEffect(() => {
    setGameModeInternal(gameMode);
  }, [gameMode, setGameModeInternal]);
  
  useEffect(() => {
    setAiDifficultyInternal(aiDifficulty);
  }, [aiDifficulty, setAiDifficultyInternal]);
  
  useEffect(() => {
    setHumanPlayerInternal(humanPlayer);
  }, [humanPlayer, setHumanPlayerInternal]);
  
  const gameInProgress = history.length > 1;
  const currentPlayer = xIsNext ? 'X' : 'O';
  
  // Track previous game state to prevent duplicate notifications
  const prevGameStateRef = useRef<GameState>({
    isOver: false,
    winner: null,
    isDraw: false
  });
  
  // Trigger notification when game ends - without creating infinite loops
  useEffect(() => {
    const hasWinnerChanged = prevGameStateRef.current.winner !== gameState.winner;
    const hasDrawChanged = prevGameStateRef.current.isDraw !== gameState.isDraw;
    const hasEndedChanged = prevGameStateRef.current.isOver !== gameState.isOver;
    
    if (gameState.isOver && currentMove > 0 && (hasWinnerChanged || hasDrawChanged || hasEndedChanged)) {
      if (gameState.winner) {
        onShowNotification(`${gameState.winner} wins!`);
      } else if (gameState.isDraw) {
        onShowNotification("It's a draw!");
      }
      
      // Notify parent component about game state changes
      if (onGameStateChange) {
        onGameStateChange(gameState);
      }
      
      // Update the ref to current state
      prevGameStateRef.current = { ...gameState };
    }
  }, [gameState, currentMove, onShowNotification, onGameStateChange]);
  
  // Start a new game
  const handleNewGame = () => {
    startNewGame(gameMode, aiDifficulty, humanPlayer);
    onShowNotification('New game started!');
  };
  
  return (
    <div className={`${colors.panel} rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-lg mx-auto transition-all duration-300
                     transform animate-fade-in backdrop-blur-sm`}>
      {/* Game status */}
      <GameStatus 
        gameState={gameState}
        currentPlayer={currentPlayer}
        isAIThinking={isAIThinking}
      />
      
      {/* Game info */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className={`flex items-center ${colors.accent} px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base`}>
            <span className={`${colors.labelText} mr-2`}>Mode:</span>
            <span className={`font-medium ${colors.cardText}`}>
              {gameMode === 'human' ? 'Human vs Human' : 'Human vs AI'}
            </span>
          </div>
          {gameMode === 'ai' && (
            <div className={`flex items-center ${colors.accent} px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base`}>
              <span className={`${colors.labelText} mr-2`}>AI:</span>
              <span className={`font-medium capitalize ${colors.cardText}`}>{aiDifficulty}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Board - optimize for smaller screens */}
      <div className="flex justify-center">
        <Board 
          squares={currentSquares} 
          onSquareClick={handleSquareClick}
          winningLine={gameState.winner ? gameState.line ?? null : null}
          currentPlayer={currentPlayer}
        />
      </div>
      
      {gameState.isOver && (
        <div className={`mt-6 p-4 ${colors.accent} rounded-md text-center animate-fade-in`}>
          <p className={`font-bold text-lg md:text-xl mb-3 ${colors.cardText}`}>
            {gameState.winner 
              ? `${gameState.winner} wins!` 
              : "It's a draw!"
            }
          </p>
          <button 
            className={`px-5 py-3 rounded-md ${colors.primary} shadow-lg transition-all duration-300
                      transform hover:scale-105 active:scale-95`}
            onClick={handleNewGame}
          >
            Play Again
          </button>
        </div>
      )}
      
      {!gameInProgress && (
        <div className="mt-6 text-center animate-pulse-subtle">
          <button 
            className={`px-8 py-4 rounded-md text-lg font-medium ${colors.primary} shadow-lg
                       transition-all duration-300 transform hover:scale-105 active:scale-95`}
            onClick={handleNewGame}
          >
            Start Game
          </button>
        </div>
      )}
      
      {/* Game History */}
      {gameInProgress && history.length > 1 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className={`text-sm ${colors.labelText} mb-2`}>Game History</h3>
          <div className="flex gap-2 pb-2 flex-wrap">
            <button
              className={`px-3 py-1 rounded-md text-sm ${colors.secondary} transition-all duration-200
                         transform hover:scale-105 active:scale-95`}
              onClick={() => jumpTo(0)}
            >
              Start
            </button>
            
            {history.slice(1).map((_: (Player | null)[], moveIndex: number) => {
              const move = moveIndex + 1;
              return (
                <button
                  key={move}
                  className={`px-3 py-1 rounded-md text-sm transition-all duration-200
                            transform hover:scale-105 active:scale-95
                            ${currentMove === move ? colors.primary : colors.secondary}`}
                  onClick={() => jumpTo(move)}
                >
                  #{move}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;