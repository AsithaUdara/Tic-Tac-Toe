// src/features/game/utils/aiUtils.ts
import type { Player, GameState, MinimaxResult } from '../../../types/game.types';

export function getEmptySquares(squares: Player[]): number[] {
  return squares
    .map((square, index) => (square === null ? index : null))
    .filter((index): index is number => index !== null);
}

export function makeRandomMove(squares: Player[]): number | null {
  const emptySquares = getEmptySquares(squares);
  
  if (emptySquares.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
}

export function checkGameState(squares: Player[]): GameState {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
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
}

// Optimize minimax with alpha-beta pruning and depth limiting
export function minimax(
  squares: Player[], 
  player: Player, 
  aiPlayer: Player, 
  depth: number = 0, 
  isMaximizing: boolean = true,
  alpha: number = -Infinity,
  beta: number = Infinity,
  maxDepth: number = 6 // Limit recursion depth for better performance
): MinimaxResult {
  // Check terminal conditions
  const gameState = checkGameState(squares);
  
  if (gameState.isOver || depth >= maxDepth) {
    if (gameState.winner === aiPlayer) {
      return { score: 10 - depth, move: null };
    } 
    else if (gameState.winner && gameState.winner !== aiPlayer) {
      return { score: depth - 10, move: null };
    } 
    else {
      return { score: 0, move: null };
    }
  }
  
  const availableMoves = getEmptySquares(squares);
  
  if (availableMoves.length === 0) {
    return { score: 0, move: null };
  }
  
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMove: number | null = null;
  
  // Prioritize center and corners for first moves (optimization)
  if (depth === 0 && availableMoves.length > 6) {
    const priorityMoves = [4, 0, 2, 6, 8]; // Center and corners
    for (const priority of priorityMoves) {
      if (availableMoves.includes(priority)) {
        return { score: 0, move: priority };
      }
    }
  }
  
  for (const move of availableMoves) {
    const newSquares = squares.slice();
    newSquares[move] = player;
    
    const nextPlayer = player === 'X' ? 'O' : 'X';
    const { score } = minimax(
      newSquares, 
      nextPlayer, 
      aiPlayer, 
      depth + 1, 
      !isMaximizing,
      alpha,
      beta,
      maxDepth
    );
    
    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
      beta = Math.min(beta, bestScore);
    }
    
    // Alpha-beta pruning
    if (beta <= alpha) {
      break;
    }
  }
  
  return { score: bestScore, move: bestMove };
}

export function makeAIMove(
  squares: Player[], 
  aiPlayer: Player, 
  difficulty: string = 'medium'
): number | null {
  // For performance, handle first move specially
  const emptyCount = squares.filter(square => square === null).length;
  
  // First move for AI - make strategic choices without heavy calculation
  if (emptyCount === 9) {
    // Take center if first to move
    return 4;
  }
  
  if (emptyCount === 8) {
    // If human took center, take a corner
    if (squares[4] !== null) {
      const corners = [0, 2, 6, 8];
      return corners[Math.floor(Math.random() * corners.length)];
    }
    // Otherwise, take center
    return 4;
  }
  
  if (difficulty === 'easy') {
    return makeRandomMove(squares);
  }
  
  if (difficulty === 'medium') {
    if (Math.random() < 0.3) {
      return makeRandomMove(squares);
    }
  }
  
  // Set maxDepth based on the number of empty squares for performance
  let maxDepth = 6;
  if (emptyCount <= 5) maxDepth = 9; // Full search for endgame
  
  const { move } = minimax(squares, aiPlayer, aiPlayer, 0, true, -Infinity, Infinity, maxDepth);
  return move;
}