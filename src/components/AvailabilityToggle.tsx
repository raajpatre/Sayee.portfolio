'use client';

import { useState, useTransition } from 'react';
import { updateAvailability } from '@/lib/actions';

export default function AvailabilityToggle({ initialStatus }: { initialStatus: string }) {
  const [isOpenForWork, setIsOpenForWork] = useState(initialStatus !== 'working');
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const nextStatus = !isOpenForWork;
    setIsOpenForWork(nextStatus);
    
    startTransition(async () => {
      try {
        await updateAvailability(nextStatus ? 'open' : 'working');
      } catch (err) {
        // Revert on error
        setIsOpenForWork(!nextStatus);
        console.error(err);
      }
    });
  }

  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 shadow-subtle">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-[13px] text-[#6B7280] font-medium">Availability</span>
        <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#9CA3AF]" style={{ fontVariationSettings: "'FILL' 0" }}>
          work
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[14px] sm:text-[15px] font-bold text-[#1A1A1A]">{isOpenForWork ? 'Open for Work' : 'Unavailable'}</span>
        <button 
          onClick={handleToggle}
          disabled={isPending}
          className={`w-9 h-5 sm:w-11 sm:h-6 rounded-full flex items-center px-0.5 sm:px-1 cursor-pointer shrink-0 transition-colors duration-300 disabled:opacity-50 ${isOpenForWork ? 'bg-[#10B981] justify-end' : 'bg-[#DCDCDC] justify-start'}`}
        >
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-sm" />
        </button>
      </div>
    </div>
  );
}
