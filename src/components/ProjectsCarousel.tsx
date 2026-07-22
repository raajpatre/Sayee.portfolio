'use client';

import { useRef, useState, useEffect } from 'react';


export default function ProjectsCarousel({ projects }: { projects: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
  }, [filteredProjects]);

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
    <div className="w-full max-w-container-max mx-auto mt-2 group px-4 md:px-0">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-6 gap-6">
        <div className="inline-block bg-white/95 backdrop-blur-sm p-5 md:p-6 border-4 border-brand-black shadow-hard-md -rotate-1 relative mx-4 md:mx-0 self-start">
          {/* Tape accent */}
          <div className="absolute -top-4 -left-4 w-16 h-6 bg-brand-yellow/80 border-2 border-brand-black -rotate-12"></div>
          <span className="font-handwriting text-brand-coral text-3xl block mb-1 md:mb-2">
            selected work
          </span>
          <h2 className="text-4xl md:text-headline-lg font-headline-lg text-brand-black leading-none">
            Things I've Made
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-3 z-10 relative md:-translate-y-4 px-4 md:px-0">
          {categories.map((cat: any) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm border-2 border-brand-black font-bold shadow-[2px_2px_0_0_#1a1a1a] transition-all transform ${
                activeCategory === cat 
                  ? 'bg-brand-yellow -rotate-2 hover:rotate-0' 
                  : 'bg-white border-dashed hover:bg-brand-cream rotate-1 hover:rotate-0'
              } text-brand-black`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full">
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
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbars pb-12 pt-4 px-4 min-h-[440px] md:min-h-[390px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project: any, index: number) => {
              const isFlipped = !!flippedCards[project.id];
              return (
                <div 
                  key={project.id} 
                  className={`w-[72vw] min-w-[72vw] sm:w-[50vw] sm:min-w-[50vw] md:w-[calc(25%-18px)] md:min-w-[calc(25%-18px)] flex-none snap-start perspective-800 transform transition-transform duration-300 hover:scale-[1.02] ${
                    index % 2 === 0 ? '-rotate-2' : 'rotate-2'
                  }`}
                  onClick={() => {
                    setFlippedCards(prev => ({
                      ...prev,
                      [project.id]: !prev[project.id]
                    }));
                  }}
                >
                  <div className={`relative w-full h-[360px] md:h-[340px] transition-transform duration-500 transform-style-3d cursor-pointer hover-flip ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}>
                    
                    {/* FRONT SIDE (POLAROID CARD) */}
                    <div className="absolute inset-0 bg-white p-4 pb-6 border-4 border-brand-black shadow-hard-lg backface-hidden flex flex-col justify-between z-10">
                      {/* Tape accent */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-brand-cream/90 border-2 border-brand-black rotate-[-3deg] z-10"></div>
                      
                      <div className={`w-full border-2 border-brand-black relative overflow-hidden mb-4 bg-brand-black/5 ${
                        project.aspect_ratio === '3:4' ? 'aspect-[3/4]' : 
                        project.aspect_ratio === '4:3' ? 'aspect-[4/3]' : 
                        'aspect-square'
                      }`}>
                        <img
                          className="w-full h-full object-cover grayscale-[20%]"
                          alt={project.title}
                          src={project.cover_image || 'https://via.placeholder.com/800x600'}
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="font-headline-md text-lg md:text-xl text-brand-black mb-0.5 line-clamp-1">
                            {project.title}
                          </h3>
                          {project.client_name && (
                            <p className="text-[10px] text-brand-black/60 font-bold uppercase tracking-widest mb-2.5">
                              Client: {project.client_name}
                            </p>
                          )}
                        </div>
                        <div>
                          <span className="inline-block px-3 py-1 bg-brand-yellow border-2 border-brand-black text-xs font-bold text-brand-black uppercase transform -rotate-1">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE (PROJECT DESCRIPTION) */}
                    <div className="absolute inset-0 bg-brand-cream p-5 border-4 border-brand-black shadow-hard-lg backface-hidden rotate-y-180 flex flex-col justify-between">
                      {/* Decorative pin */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-coral border-2 border-brand-black rounded-full z-10 shadow-sm"></div>
                      
                      {/* Info Badge (Top Right) */}
                      <span className="absolute top-4 right-4 text-[9px] font-bold bg-brand-yellow border-2 border-brand-black px-2 py-0.5 rounded text-brand-black flex items-center gap-1 select-none z-20 shadow-sm uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        Info
                      </span>

                      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                        <span className="font-handwriting text-brand-blue text-sm uppercase block tracking-wider">Project Story</span>
                        <h4 className="font-headline-md text-xl text-brand-black leading-tight border-b-2 border-dashed border-brand-black/20 pb-2 pr-10">
                          {project.title}
                        </h4>
                        <p className="text-xs md:text-sm font-semibold text-brand-black/85 leading-relaxed font-body-md whitespace-pre-wrap">
                          {project.description || "A custom selected piece from our portfolio catalog."}
                        </p>
                      </div>

                      {project.client_name && (
                        <div className="pt-3 border-t-2 border-dashed border-brand-black/10 flex items-center justify-between mt-3 shrink-0">
                          <span className="text-[10px] font-bold text-brand-black/60 uppercase tracking-widest">
                            {project.client_name}
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
             <div className="w-full flex items-center justify-center text-center py-20 font-handwriting text-3xl text-brand-black/50">
               No projects found in this category...
             </div>
          )}
        </div>
      </div>
      {/* F-13 FIX: CSS moved to globals.css — dangerouslySetInnerHTML removed */}
    </div>
  );
}
