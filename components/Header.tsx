import React from 'react';
import { Aperture } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
               <Aperture className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-bold tracking-wide text-white">Lumina.</span>
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Collections</button>
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">About</button>
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;