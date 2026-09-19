import React from 'react';

interface StarRatingProps {
  rating: number; // 1 to 5
  max?: number;
  className?: string;
  showText?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5, className = '', showText = false }) => {
  const clamped = Math.max(0, Math.min(max, rating));

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex text-amber-500 text-xs">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={i < clamped ? 'opacity-100' : 'opacity-25'}>
            ★
          </span>
        ))}
      </div>
      {showText && (
        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 ml-0.5">
          {rating}/{max}
        </span>
      )}
    </div>
  );
};
