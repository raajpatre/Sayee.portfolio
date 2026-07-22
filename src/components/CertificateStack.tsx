'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

type Credential = {
  id: string;
  title: string;
  image_url?: string | null;
  date?: string;
  type?: string;
};

// Fallback placeholder credentials if none exist
const FALLBACK_CREDENTIALS: Credential[] = [
  {
    id: 'placeholder-1',
    title: 'Awwwards Site of the Day',
    image_url: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=1200',
    date: '2023',
    type: 'award'
  },
  {
    id: 'placeholder-2',
    title: 'Brand Impact Award',
    image_url: 'https://images.unsplash.com/photo-1589330694653-efa648bc38dc?auto=format&fit=crop&q=80&w=1200',
    date: '2022',
    type: 'award'
  },
  {
    id: 'placeholder-3',
    title: 'Google UX Certification',
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    date: '2021',
    type: 'certification'
  }
];

export default function CertificateStack({ initialCredentials = [] }: { initialCredentials?: Credential[] }) {
  // Use real credentials if available, otherwise fallbacks
  const initialCards = initialCredentials.length > 0 ? initialCredentials : FALLBACK_CREDENTIALS;
  
  // We keep the cards in a state array so we can shift them
  const [cards, setCards] = useState<Credential[]>(initialCards);
  
  // Handle swipe completion
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100; // How far to drag before it counts as a swipe
    if (Math.abs(info.offset.x) > swipeThreshold) {
      // Swiped far enough! Take the top card and move it to the back (bottom of stack)
      setCards((prev) => {
        const newCards = [...prev];
        const swipedCard = newCards.shift(); // Remove from front
        if (swipedCard) newCards.push(swipedCard); // Push to back
        return newCards;
      });
    }
  };

  return (
    <div className="relative w-full max-w-[800px] aspect-[4/3] mx-auto perspective-1000 flex items-center justify-center mt-12 mb-20">
      <AnimatePresence>
        {/* We map backwards so the first item in the array renders on top visually */}
        {[...cards].reverse().map((cert, reversedIndex) => {
          const index = cards.length - 1 - reversedIndex; // Actual index in array (0 is top)
          const isTop = index === 0;
          
          // Calculate dynamic offsets for the messier stack effect
          const xOffsets = [0, -15, 20, 5, -10];
          const yOffsets = [0, 10, 25, -5, 15];
          const rotations = [-1, 4, -5, 3, -2];
          
          const xOffset = xOffsets[index % xOffsets.length];
          const yOffset = yOffsets[index % yOffsets.length] + (index * 5); // Add a little progressive downward shift
          const scale = 1 - index * 0.02;
          const rotate = rotations[index % rotations.length];
          const zIndex = cards.length - index;

          return (
            <motion.div
              key={cert.id}
              className="absolute top-0 left-0 w-full h-full bg-[#FFFBF0] border-2 border-brand-black p-2 pb-10 shadow-[4px_6px_0px_0px_rgba(31,27,16,1)] flex flex-col cursor-grab active:cursor-grabbing origin-center"
              style={{ zIndex }}
              // Framer motion properties for initial stack positioning
              initial={false}
              animate={{
                x: xOffset,
                y: yOffset,
                scale: scale,
                rotate: rotate,
                opacity: index > 3 ? 0 : 1, // Show up to 4 cards
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              // Drag interactions (only enable for top card)
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileDrag={{ scale: 1.02, rotate: rotate + 5, zIndex: 100 }}
              // Hover effect for top card
              whileHover={isTop ? { y: -5, scale: 1.01 } : {}}
            >
              {/* Certificate Image (Full Bleed) */}
              <div className="w-full h-full bg-gray-200 border-2 border-brand-black relative overflow-hidden pointer-events-none">
                {cert.image_url ? (
                  <img 
                    src={cert.image_url} 
                    alt={cert.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#E5D3B3] text-brand-black font-caveat text-4xl">
                    No Photo
                  </div>
                )}
              </div>
              
              {/* Bottom Metadata Bar */}
              <div className="absolute bottom-0 left-0 w-full h-10 px-4 flex items-center justify-between text-brand-black font-caveat text-xl sm:text-2xl pointer-events-none">
                <span className="font-bold opacity-80 uppercase tracking-wide">
                  {cert.type && `${cert.type} • `}{cert.date ? `Issued ${cert.date}` : ''}
                </span>
                <span className="font-bold opacity-80">{index + 1} / {cards.length}</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
