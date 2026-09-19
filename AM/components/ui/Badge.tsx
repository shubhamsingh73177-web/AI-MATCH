import React from 'react';
import type { PricingType } from '../../types/aiModel';

interface BadgeProps {
  type: PricingType | 'category' | 'status' | 'custom';
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ type, label, className = '', size = 'sm' }) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-semibold',
    lg: 'text-sm px-3 py-1.5 rounded-full font-semibold'
  }[size];

  if (type === 'free') {
    return (
      <span className={`inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        {label || '100% Free'}
      </span>
    );
  }

  if (type === 'free_tier') {
    return (
      <span className={`inline-flex items-center gap-1 bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30 ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
        {label || 'Free Tier'}
      </span>
    );
  }

  if (type === 'open_source') {
    return (
      <span className={`inline-flex items-center gap-1 bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        {label || 'Open Source'}
      </span>
    );
  }

  if (type === 'local') {
    return (
      <span className={`inline-flex items-center gap-1 bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
        {label || 'Local Model'}
      </span>
    );
  }

  if (type === 'paid') {
    return (
      <span className={`inline-flex items-center gap-1 bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        {label || 'Paid'}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30 ${sizeClasses} ${className}`}>
      {label}
    </span>
  );
};
