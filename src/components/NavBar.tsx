'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar({ profile }: { profile: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[50] bg-white border-b-4 border-brand-black text-brand-black w-full shadow-hard-sm h-16 md:h-20">
      <div className="flex justify-between items-center w-full h-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-20 bg-white">
        <Link
          className="font-handwriting text-2xl md:text-3xl font-bold text-brand-black -rotate-2 hover:rotate-0 hover:text-brand-coral transition-transform whitespace-nowrap overflow-hidden text-ellipsis max-w-[70vw]"
          href="/"
        >
          {profile?.display_name || 'Sayee'}
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {profile?.resume_url && (
            <a 
              href={profile.resume_url} 
              download 
              target="_blank" 
              rel="noreferrer"
              className="bg-brand-coral text-white border-2 border-brand-black px-4 py-1.5 font-bold text-sm uppercase tracking-wider hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] transition-all rotate-2 mr-2"
            >
              My Resume
            </a>
          )}
          <Link
            className="text-brand-black font-bold uppercase tracking-wider text-sm hover:text-brand-coral hover:translate-y-1 transition-all"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-brand-black font-bold uppercase tracking-wider text-sm hover:text-brand-coral hover:translate-y-1 transition-all"
            href="/about"
          >
            About Me
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 border-2 border-brand-black bg-brand-yellow hover:bg-brand-coral transition-colors rotate-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-5 h-[3px] bg-brand-black transition-transform ${isOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-[3px]'}`}></span>
          <span className={`block w-5 h-[3px] bg-brand-black my-[3px] transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 h-[3px] bg-brand-black transition-transform ${isOpen ? '-rotate-45 -translate-y-[10px]' : 'translate-y-[3px]'}`}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b-4 border-brand-black flex flex-col p-6 shadow-hard-md gap-4 transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}
      >
        {profile?.resume_url && (
          <a 
            href={profile.resume_url} 
            download 
            target="_blank" 
            rel="noreferrer"
            className="bg-brand-coral text-white border-4 border-brand-black px-4 py-3 font-bold text-center uppercase tracking-wider hover:bg-opacity-90 transition-all -rotate-1 shadow-hard-sm"
          >
            My Resume
          </a>
        )}
        <Link
          className="text-brand-black font-bold uppercase tracking-wider p-3 border-4 border-brand-black bg-brand-yellow rotate-1 text-center shadow-hard-sm"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          className="text-brand-black font-bold uppercase tracking-wider p-3 border-4 border-brand-black bg-[#E3F2FD] -rotate-1 text-center shadow-hard-sm"
          href="/about"
          onClick={() => setIsOpen(false)}
        >
          About Me
        </Link>
      </div>
    </nav>
  );
}
