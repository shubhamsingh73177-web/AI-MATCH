import React from 'react';
import { SUGGESTION_CHIPS } from '../../data/categories';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface EmptyStateHeroProps {
  onSelectPrompt: (promptText: string) => void;
  onOpenCatalog?: () => void;
}

export const EmptyStateHero: React.FC<EmptyStateHeroProps> = ({
  onSelectPrompt,
  onOpenCatalog
}) => {
  const samplePrompts = [
    {
      title: 'Free Video for Event',
      desc: '30s cinematic clip with zero budget',
      prompt: 'I want to make a 30-second cinematic video for my college event. It should be free.'
    },
    {
      title: 'Slide Deck from Notes',
      desc: 'Convert raw notes into PowerPoint presentation',
      prompt: 'I want to create a professional presentation from my notes for free.'
    },
    {
      title: 'Instagram Product Ad',
      desc: 'Multi-tool workflow: cutout, video & voiceover',
      prompt: 'I want to create an Instagram advertisement using my product image and add a voiceover.'
    },
    {
      title: '100-page PDF Analysis',
      desc: 'Zero-hallucination citations & audio podcast',
      prompt: 'I want to summarize a 100-page PDF and ask questions with citations. It must be free.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center animate-bubble">
      {/* Brand Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] flex items-center justify-center text-3xl shadow-lg shadow-[#128C7E]/20 mb-4 transform hover:scale-105 transition-transform">
        🎯
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        AI Match
      </h1>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mb-6 leading-relaxed font-medium">
        Tell me what you want to do. I’ll find the AI that fits.
      </p>

      {/* Feature Highlights Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
        <span className="inline-flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#25D366]" />
          <span>Multi-Model Trade-Offs</span>
        </span>
        <span className="inline-flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/5 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Verified Free Tiers</span>
        </span>
        <span className="inline-flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/5 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-blue-500" />
          <span>Multi-Step Workflows</span>
        </span>
      </div>

      {/* Suggestion Category Chips */}
      <div className="w-full mb-8">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Popular Task Categories
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {SUGGESTION_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(chip.prompt)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/90 dark:bg-[#202C33] border border-black/10 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-[#128C7E] hover:text-[#128C7E] dark:hover:border-[#25D366] dark:hover:text-[#25D366] transition-all shadow-2xs hover:scale-102 active:scale-98 cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Example Conversation Prompt Cards */}
      <div className="w-full max-w-2xl text-left">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 text-center sm:text-left">
          Or try one of these examples:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {samplePrompts.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(item.prompt)}
              className="p-3 rounded-xl text-left bg-white/70 dark:bg-[#202C33]/70 hover:bg-white dark:hover:bg-[#202C33] border border-black/10 dark:border-white/10 hover:border-[#128C7E]/50 dark:hover:border-[#25D366]/50 transition-all group card-hover-effect cursor-pointer"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#128C7E] dark:group-hover:text-[#25D366] transition-colors mb-0.5">
                {item.title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explore All Tools Banner */}
      {onOpenCatalog && (
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 w-full max-w-lg">
          <button
            type="button"
            onClick={onOpenCatalog}
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#128C7E] dark:hover:text-[#25D366] font-medium flex items-center justify-center gap-1.5 mx-auto transition-colors"
          >
            <span>Browse complete database of 75+ AI models & tools</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};
