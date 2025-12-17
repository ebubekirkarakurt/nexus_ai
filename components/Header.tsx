
import React from 'react';
import { AppMode } from '../types';

interface HeaderProps {
  currentMode: AppMode;
  onToggleMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentMode, onToggleMode }) => {
  return (
    <header className="flex-none bg-background-dark border-b border-border-dark z-20">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-white">
            <div className="size-8 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </div>
            <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Nexus AI</h2>
            {currentMode === 'assistant' && (
              <span className="ml-2 px-2 py-0.5 rounded border border-border-dark text-[10px] uppercase font-bold text-[#a3b99d]">Assistant Mode</span>
            )}
          </div>
          <div className="flex w-64 items-stretch rounded-xl h-10 bg-surface-dark border border-border-dark focus-within:border-primary transition-colors">
            <div className="text-[#a3b99d] flex items-center justify-center pl-4 pr-2">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input className="flex-1 min-w-0 resize-none overflow-hidden rounded-xl rounded-l-none text-white focus:outline-0 bg-transparent h-full placeholder:text-[#a3b99d] text-sm" placeholder="Search docs, comments..."/>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <button className="text-white hover:text-primary transition-colors text-sm font-medium">File</button>
          <button className="text-white hover:text-primary transition-colors text-sm font-medium">Home</button>
          <button className="text-white hover:text-primary transition-colors text-sm font-medium">Insert</button>
          <button className={`transition-colors text-sm font-bold relative ${currentMode === 'editor' ? 'text-primary' : 'text-white'}`}>
            Review
            {currentMode === 'editor' && <div className="absolute w-full h-0.5 bg-primary -bottom-5 left-0"></div>}
          </button>
          <button className="text-white hover:text-primary transition-colors text-sm font-medium">View</button>
        </div>

        <div className="flex gap-3 items-center">
          {currentMode === 'assistant' ? (
            <button 
              onClick={onToggleMode}
              className="flex items-center justify-center rounded-full h-10 px-5 border border-primary/50 bg-transparent hover:bg-primary/10 transition-colors text-primary text-sm font-bold"
            >
              <span className="material-symbols-outlined text-[18px] mr-2">auto_fix</span>
              Return to Editor
            </button>
          ) : (
            <button className="flex items-center justify-center rounded-full h-10 px-5 bg-primary hover:bg-primary/90 transition-colors text-background-dark text-sm font-bold">
              <span>Share</span>
            </button>
          )}
          <button className="flex size-10 items-center justify-center rounded-full bg-surface-dark hover:bg-white/10 transition-colors text-white">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-full bg-surface-dark hover:bg-white/10 transition-colors text-white relative">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border border-surface-dark"></span>
          </button>
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ml-2 border border-border-dark" style={{backgroundImage: 'url("https://picsum.photos/100/100?random=1")'}}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
