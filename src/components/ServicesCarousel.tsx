'use client';

import { useRef, useState, useEffect } from 'react';

export default function ServicesCarousel({ services }: { services: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [services]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' }); // 24 is gap
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-container-max mx-auto mt-12 group px-4 md:px-0">
      {/* Navigation Buttons */}
      <div className={`absolute top-1/2 -translate-y-1/2 -left-2 md:-left-12 z-20 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={scrollLeft}
          className="w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-brand-black shadow-hard-sm hover:shadow-none hover:translate-y-1 hover:-rotate-6 transition-all duration-300 flex items-center justify-center text-brand-black font-bold text-xl md:text-2xl -rotate-2"
          aria-label="Scroll left"
        >
          &larr;
        </button>
      </div>
      <div className={`absolute top-1/2 -translate-y-1/2 -right-2 md:-right-12 z-20 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={scrollRight}
          className="w-10 h-10 md:w-12 md:h-12 bg-brand-yellow border-4 border-brand-black shadow-hard-sm hover:shadow-none hover:translate-y-1 hover:rotate-6 transition-all duration-300 flex items-center justify-center text-brand-black font-bold text-xl md:text-2xl rotate-2"
          aria-label="Scroll right"
        >
          &rarr;
        </button>
      </div>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbars pb-12 pt-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service: any, index: number) => {
          const cardColorClass = service.card_color || 'bg-white';
          const textColorClass = service.text_color || 'text-brand-black';
          
          // Different colors for washi tapes for an authentic scrapbook feel
          const tapeColors = [
            'bg-brand-yellow/80 rotate-2',
            'bg-brand-coral/80 -rotate-3',
            'bg-brand-blue/70 rotate-6',
            'bg-emerald-300/80 -rotate-1',
          ];
          const tapeClass = tapeColors[index % tapeColors.length];

          return (
            <div 
              key={service.id} 
              className={`min-w-[66vw] w-[66vw] sm:w-[45vw] sm:min-w-[45vw] md:w-[calc(25%-18px)] md:min-w-[calc(25%-18px)] flex-none snap-start ${cardColorClass} border-[3px] border-brand-black p-5 shadow-[6px_6px_0_0_#1a1a1a] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300 relative rounded-2xl flex flex-col group overflow-hidden h-full ${index % 2 === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0'}`}
              style={{
                backgroundImage: "radial-gradient(rgba(26,26,26,0.06) 1.2px, transparent 1.2px)",
                backgroundSize: "14px 14px"
              }}
            >
              {/* Scrapbook Tape Accent */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 border border-brand-black/30 backdrop-blur-sm z-20 ${tapeClass}`}></div>
              
              {/* Giant Background Icon for texture */}
              <div className="absolute -right-6 -bottom-6 text-[110px] opacity-10 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none select-none">
                {service.icon || '✨'}
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col pt-2">
                <div className="w-12 h-12 rounded-full bg-white border-[3px] border-brand-black flex items-center justify-center text-xl mb-4 shadow-hard-sm group-hover:-translate-y-1 group-hover:rotate-12 transition-transform duration-300 self-start">
                  {service.icon || '✨'}
                </div>
                
                <h3 className={`text-xl md:text-2xl font-headline-lg font-black ${textColorClass} mb-3 uppercase tracking-tighter leading-[1]`}>
                  {service.title}
                </h3>
                
                <div className={`w-10 h-1 bg-brand-black mb-3 opacity-20 rounded-full`}></div>
                
                <p className={`${textColorClass} font-body-md text-sm mb-4 font-medium leading-snug`}>
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  <ul className={`space-y-1.5 text-xs font-bold ${textColorClass}`}>
                    {service.features && service.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5 bg-white/20 p-2 rounded-lg border border-brand-black/10 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[15px] shrink-0 text-brand-coral">bolt</span> 
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* F-13 FIX: CSS moved to globals.css — dangerouslySetInnerHTML removed */}
    </div>
  );
}
