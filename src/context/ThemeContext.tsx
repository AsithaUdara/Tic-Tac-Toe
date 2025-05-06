import React, { createContext, useState, useContext, useMemo } from 'react';
import type { ThemeType, AnimationSpeed, ThemeContextType, ThemeProviderProps } from '../types/game.types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme = 'neon', initialSpeed = 'normal' }) => {
  const [theme, setTheme] = useState<ThemeType>(initialTheme);
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>(initialSpeed);
  
  // Calculate animation duration based on speed
  const animationDuration = useMemo(() => {
    switch (animationSpeed) {
      case 'slow': return 800;
      case 'normal': return 500;
      case 'fast': return 300;
      default: return 500;
    }
  }, [animationSpeed]);
  
  // Theme-specific colors
  const colors = useMemo(() => {
    switch (theme) {
      case 'neon':
        return {
          panel: 'bg-gray-900 bg-opacity-90',
          accent: 'bg-gray-800 bg-opacity-70',
          primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
          square: 'bg-gray-800 hover:bg-gray-700',
          highlight: 'ring-2 ring-indigo-500 bg-gray-700',
          xColor: 'text-teal-400',
          oColor: 'text-pink-500',
          xColorHover: 'text-teal-400',
          oColorHover: 'text-pink-500',
          labelText: 'text-gray-400',
          cardText: 'text-white',
          navActive: 'text-white',
          navInactive: 'text-gray-300 hover:text-white',
          bg: 'bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700',
          header: 'bg-gradient-to-r from-indigo-900 to-gray-900',
          winColor: 'text-green-400',
          heading: 'text-indigo-400',
          button: 'bg-indigo-600 hover:bg-indigo-700',
          buttonHover: 'hover:bg-indigo-500'
        };
      case 'elegance':
        return {
          panel: 'bg-gray-900 bg-opacity-90',
          accent: 'bg-gray-800 bg-opacity-70',
          primary: 'bg-amber-600 hover:bg-amber-700 text-white',
          secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
          square: 'bg-gray-800 hover:bg-gray-700',
          highlight: 'ring-2 ring-amber-500 bg-gray-700',
          xColor: 'text-amber-400',
          oColor: 'text-amber-600',
          xColorHover: 'text-amber-300',
          oColorHover: 'text-amber-500',
          labelText: 'text-gray-400',
          cardText: 'text-white',
          navActive: 'text-white',
          navInactive: 'text-gray-300 hover:text-white',
          bg: 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700',
          header: 'bg-gradient-to-r from-gray-800 to-gray-900',
          winColor: 'text-amber-400',
          heading: 'text-amber-400',
          button: 'bg-amber-600 hover:bg-amber-700',
          buttonHover: 'hover:bg-amber-500'
        };
      case 'modern':
        return {
          panel: 'bg-slate-900 bg-opacity-90',
          accent: 'bg-slate-800 bg-opacity-70',
          primary: 'bg-teal-600 hover:bg-teal-700 text-white',
          secondary: 'bg-slate-700 hover:bg-slate-600 text-gray-100',
          square: 'bg-slate-800 hover:bg-slate-700',
          highlight: 'ring-2 ring-teal-500 bg-slate-700',
          xColor: 'text-teal-400',
          oColor: 'text-cyan-400',
          xColorHover: 'text-teal-300',
          oColorHover: 'text-cyan-300',
          labelText: 'text-gray-400',
          cardText: 'text-white',
          navActive: 'text-white',
          navInactive: 'text-gray-300 hover:text-white',
          bg: 'bg-gradient-to-b from-teal-900 via-slate-800 to-slate-700',
          header: 'bg-gradient-to-r from-teal-900 to-slate-900',
          winColor: 'text-teal-400',
          heading: 'text-teal-400',
          button: 'bg-teal-600 hover:bg-teal-700',
          buttonHover: 'hover:bg-teal-500'
        };
      default:
        return {
          panel: 'bg-gray-900 bg-opacity-90',
          accent: 'bg-gray-800 bg-opacity-70',
          primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
          square: 'bg-gray-800 hover:bg-gray-700',
          highlight: 'ring-2 ring-indigo-500 bg-gray-700',
          xColor: 'text-teal-400',
          oColor: 'text-pink-500',
          xColorHover: 'text-teal-400',
          oColorHover: 'text-pink-500',
          labelText: 'text-gray-400',
          cardText: 'text-white',
          navActive: 'text-white',
          navInactive: 'text-gray-300 hover:text-white',
          bg: 'bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700',
          header: 'bg-gradient-to-r from-indigo-900 to-gray-900',
          winColor: 'text-green-400',
          heading: 'text-indigo-400',
          button: 'bg-indigo-600 hover:bg-indigo-700',
          buttonHover: 'hover:bg-indigo-500'
        };
    }
  }, [theme]);
  
  // Context value
  const value = useMemo(() => ({
    theme,
    setTheme,
    animationSpeed,
    setAnimationSpeed,
    animationDuration,
    colors
  }), [theme, animationSpeed, animationDuration, colors]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;