import React, { useEffect } from 'react';
import { X, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { MemoryItem } from '../content/birthdayData';
import { soundManager } from '../utils/audio';

interface ModalImageViewerProps {
  memory: MemoryItem | null;
  memories: MemoryItem[];
  onSelect: (item: MemoryItem) => void;
  onClose: () => void;
}

export const ModalImageViewer: React.FC<ModalImageViewerProps> = ({
  memory,
  memories,
  onSelect,
  onClose,
}) => {
  const currentIndex = memory ? memories.findIndex((m) => m.id === memory.id) : -1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelect(memories[currentIndex - 1]);
      }
      if (e.key === 'ArrowRight' && currentIndex < memories.length - 1) {
        onSelect(memories[currentIndex + 1]);
      }
    };
    if (memory) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [memory, currentIndex, memories, onClose, onSelect]);

  if (!memory || currentIndex === -1) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playChime();
    const prev = currentIndex > 0 ? currentIndex - 1 : memories.length - 1;
    onSelect(memories[prev]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playChime();
    const next = currentIndex < memories.length - 1 ? currentIndex + 1 : 0;
    onSelect(memories[next]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={memory.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full bg-[#fdf8f4] text-neutral-800 rounded-2xl p-4 sm:p-5 shadow-2xl border-4 border-pink-100/90 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playChime();
            onClose();
          }}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg hover:bg-pink-700 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Polaroid frame look */}
        <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-900 shadow-inner mb-3">
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-pink-200 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-300" />
            {memory.tag}
          </div>

          {/* Navigation Arrows inside image on mobile */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Index Counter */}
        <div className="text-center my-1">
          <span className="text-[11px] font-mono text-pink-600 tracking-widest uppercase font-bold">
            {currentIndex + 1} OF {memories.length}
          </span>
        </div>

        {/* Decorative footer */}
        <div className="mt-2 pt-2 border-t border-neutral-200/80 flex items-center justify-between text-xs text-pink-600 font-medium">
          <span className="font-script text-base text-pink-700">Memory Keepsake ♡</span>
          <button
            onClick={() => {
              soundManager.playChime();
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition-colors cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            Loved
          </button>
        </div>
      </div>
    </div>
  );
};
