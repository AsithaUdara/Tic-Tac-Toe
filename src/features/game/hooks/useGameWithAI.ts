import { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { 
  Player, 
  GameMode, 
  Difficulty, 
  GameState, 
  UseGameWithAIReturn 
} from '../../../types/game.types';

// Helper function to check game state
const checkGameState = (squares: Player[]): GameState => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
      return {
        isOver: true,
        winner: squares[a],
        isDraw: false,
        line: lines[i]
      };
    }
  }
  
  if (squares.every(square => square !== null)) {
    return {
      isOver: true,
      winner: null,
      isDraw: true
    };
  }
  
  return {
    isOver: false,
    winner: null,
    isDraw: false
  };
};

// Custom hook for AI gameplay
export function useGameWithAI(): UseGameWithAIReturn {
  const [history, setHistory] = useState<Player[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [gameMode, setGameMode] = useState<GameMode>('human');
  const [aiDifficulty, setAiDifficulty] = useState<Difficulty>('medium');
  const [humanPlayer, setHumanPlayer] = useState<Player>('X');
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  
  const { animationDuration } = useTheme();

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const currentPlayer = xIsNext ? 'X' : 'O';
  const aiPlayer = humanPlayer === 'X' ? 'O' : 'X';

  // Game state (win/draw)
  const gameState = useCallback((): GameState => {
    return checkGameState(currentSquares);
  }, [currentSquares]);

  // Handle a player's move
  const handlePlay = useCallback((nextSquares: Player[]): void => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }, [history, currentMove]);

  // Jump to a specific move in history
  const jumpTo = useCallback((nextMove: number): void => {
    setCurrentMove(nextMove);
  }, []);

  // Make AI move
  const makeAIMove = useCallback((squares: Player[]): number | null => {
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((index): index is number => index !== null);
    
    if (emptySquares.length === 0) return null;
    
    // For easy difficulty, make random moves
    if (aiDifficulty === 'easy') {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      return emptySquares[randomIndex];
    }
    
    // For medium difficulty, sometimes make random moves
    if (aiDifficulty === 'medium' && Math.random() < 0.3) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      return emptySquares[randomIndex];
    }
    
    // Check for immediate win
    for (const squareIndex of emptySquares) {
      const testSquares = squares.slice();
      testSquares[squareIndex] = aiPlayer;
      
      if (checkGameState(testSquares).winner === aiPlayer) {
        return squareIndex;
      }
    }
    
    // Check for immediate block
    const opponent = aiPlayer === 'X' ? 'O' : 'X';
    for (const squareIndex of emptySquares) {
      const testSquares = squares.slice();
      testSquares[squareIndex] = opponent;
      
      if (checkGameState(testSquares).winner === opponent) {
        return squareIndex;
      }
    }
    
    // Take center if available
    if (squares[4] === null) {
      return 4;
    }
    
    // Take corners if available
    const availableCorners = [0, 2, 6, 8].filter(corner => squares[corner] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available side
    const availableSides = [1, 3, 5, 7].filter(side => squares[side] === null);
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)];
    }
    
    // Fallback to any available move
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }, [aiDifficulty, aiPlayer]);
  
  // Process AI turn - clean implementation that can be called anywhere
  const processAITurn = useCallback(() => {
    setIsAIThinking(true);
    
    setTimeout(() => {
      const aiMoveIndex = makeAIMove(currentSquares);
      
      if (aiMoveIndex !== null) {
        const aiNextSquares = currentSquares.slice();
        aiNextSquares[aiMoveIndex] = currentPlayer;
        handlePlay(aiNextSquares);
      }
      
      setIsAIThinking(false);
    }, 600);
  }, [currentSquares, makeAIMove, currentPlayer, handlePlay]);
  
  // Start a new game with specific settings
  const startNewGame = useCallback((
    mode: GameMode = 'human', 
    difficulty: Difficulty = 'medium', 
    player: Player = 'X'
  ): void => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setGameMode(mode);
    setAiDifficulty(difficulty);
    setHumanPlayer(player);
    setIsAIThinking(false);
  }, []);
  
  // Effect to make AI move if it's AI's turn
  useEffect(() => {
    // Only run if we're in AI mode, game isn't over, and it's AI's turn
    if (
      gameMode === 'ai' && 
      !gameState().isOver && 
      currentPlayer === aiPlayer &&
      !isAIThinking &&
      history.length > 0
    ) {
      processAITurn();
    }
  }, [gameMode, gameState, currentPlayer, aiPlayer, isAIThinking, history.length, processAITurn]);

  // Handle human click on a square - simplified logic
  const handleSquareClick = useCallback((i: number): void => {
    // Don't allow clicks if:
    // - Square is filled
    // - Game is over
    // - AI is thinking
    // - It's not human's turn in AI mode
    if (
      currentSquares[i] || 
      gameState().isOver || 
      isAIThinking || 
      (gameMode === 'ai' && currentPlayer !== humanPlayer)
    ) {
      return;
    }
    
    // Make human move
    const nextSquares = currentSquares.slice();
    nextSquares[i] = currentPlayer;
    handlePlay(nextSquares);
    
    // AI turn is now handled by the useEffect
  }, [
    currentSquares,
    gameState,
    isAIThinking,
    gameMode,
    currentPlayer,
    humanPlayer,
    handlePlay
  ]);

  return {
    history,
    currentMove,
    currentSquares,
    xIsNext,
    gameState: gameState(),
    gameMode,
    aiDifficulty,
    humanPlayer,
    isAIThinking,
    isHumanTurn: gameMode === 'human' || currentPlayer === humanPlayer,
    handleSquareClick,
    jumpTo,
    startNewGame,
    setGameMode,
    setAiDifficulty,
    setHumanPlayer
  };
}

export default useGameWithAI;