import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { HeaderProps } from '../../../types/game.types';

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="container mx-auto px-4">
      <nav className="flex flex-row items-center justify-between py-3">
        {/* Logo - Responsive font size */}
        <div className="text-2xl sm:text-3xl font-bold">
          <span className={colors.xColor}>Tic</span>
          <span className="text-white">-</span>
          <span className="text-amber-400">Tac</span>
          <span className="text-white">-</span>
          <span className={colors.oColor}>Toe</span>
        </div>
        
        {/* Mobile menu button - only visible on small screens */}
        <button 
          className="md:hidden flex items-center p-2 rounded-md text-white hover:bg-opacity-20 hover:bg-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12"></path> // X icon when open
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18"></path> // Hamburger icon when closed
            )}
          </svg>
        </button>
        
        {/* Elegant Navigation tabs - horizontal on desktop, dropdown on mobile */}
        <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:static left-0 right-0 top-16 md:top-auto 
                        flex-col md:flex-row md:space-x-8 bg-gray-900 md:bg-transparent p-4 md:p-0 z-50
                        md:shadow-none shadow-lg md:rounded-none transition-all duration-300`}>
          
          {/* Game Tab */}
          <div className="relative group">
            <button
              className={`px-2 py-2 text-center w-full md:w-auto transition-all duration-300 text-base
                       ${activeTab === 'game' 
                         ? 'text-white font-medium' 
                         : 'text-gray-300 hover:text-white'}`}
              onClick={() => {
                setActiveTab('game');
                setMenuOpen(false);
              }}
            >
              Game
            </button>
            <div className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 transform 
                          ${activeTab === 'game' 
                            ? `${colors.xColor.replace('text-', 'bg-')} scale-x-100` 
                            : 'bg-transparent scale-x-0 group-hover:scale-x-100 group-hover:bg-white group-hover:bg-opacity-30'}`}>
            </div>
          </div>
          
          {/* Settings Tab */}
          <div className="relative group">
            <button
              className={`px-2 py-2 text-center w-full md:w-auto transition-all duration-300 text-base
                       ${activeTab === 'settings' 
                         ? 'text-white font-medium' 
                         : 'text-gray-300 hover:text-white'}`}
              onClick={() => {
                setActiveTab('settings');
                setMenuOpen(false);
              }}
            >
              Settings
            </button>
            <div className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 transform 
                          ${activeTab === 'settings' 
                            ? `${colors.oColor.replace('text-', 'bg-')} scale-x-100` 
                            : 'bg-transparent scale-x-0 group-hover:scale-x-100 group-hover:bg-white group-hover:bg-opacity-30'}`}>
            </div>
          </div>
          
          {/* Scores Tab */}
          <div className="relative group">
            <button
              className={`px-2 py-2 text-center w-full md:w-auto transition-all duration-300 text-base
                       ${activeTab === 'scores' 
                         ? 'text-white font-medium' 
                         : 'text-gray-300 hover:text-white'}`}
              onClick={() => {
                setActiveTab('scores');
                setMenuOpen(false);
              }}
            >
              Scores
            </button>
            <div className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 transform 
                          ${activeTab === 'scores' 
                            ? `${colors.xColor.replace('text-', 'bg-')} scale-x-100` 
                            : 'bg-transparent scale-x-0 group-hover:scale-x-100 group-hover:bg-white group-hover:bg-opacity-30'}`}>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;