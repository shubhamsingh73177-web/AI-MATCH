import React from 'react';
import type { TradeOffWinners } from '../../types/chat';
import type { AIModel } from '../../types/aiModel';
import { Award, Zap, ShieldCheck, Smile, Sparkles } from 'lucide-react';

interface TradeOffBadgesProps {
  winners: TradeOffWinners;
  onSelectModel?: (model: AIModel) => void;
}

export const TradeOffBadges: React.FC<TradeOffBadgesProps> = ({ winners, onSelectModel }) => {
  const cards: {
    key: string;
    label: string;
    model?: AIModel;
    icon: React.ReactNode;
    colorClasses: string;
    badgeBg: string;
    subtext: string;
  }[] = [
    {
      key: 'quality',
      label: 'Best for Quality',
      model: winners.bestQuality,
      icon: <Award className="w-4 h-4 text-amber-500" />,
      colorClasses: 'border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5',
      badgeBg: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
      subtext: winners.bestQuality?.tradeOffProfile.qualityExplanation || 'Highest benchmark accuracy and fidelity'
    },
    {
      key: 'free',
      label: 'Best for Free Usage',
      model: winners.bestFree,
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
      colorClasses: 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/5',
      badgeBg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
      subtext: winners.bestFree?.freeTierDetails || 'Generous daily free limits or $0 forever'
    },
    {
      key: 'beginner',
      label: 'Best for Beginners',
      model: winners.bestBeginner,
      icon: <Smile className="w-4 h-4 text-teal-500" />,
      colorClasses: 'border-teal-500/30 hover:border-teal-500/60 bg-teal-500/5',
      badgeBg: 'bg-teal-500/15 text-teal-700 dark:text-teal-300',
      subtext: 'Intuitive web interface with zero setup curve'
    },
    {
      key: 'privacy',
      label: 'Best for Privacy / Offline',
      model: winners.bestPrivacyLocal,
      icon: <ShieldCheck className="w-4 h-4 text-purple-500" />,
      colorClasses: 'border-purple-500/30 hover:border-purple-500/60 bg-purple-500/5',
      badgeBg: 'bg-purple-500/15 text-purple-700 dark:text-purple-300',
      subtext: winners.bestPrivacyLocal?.localHardwareRequirements || 'Runs 100% locally with private weights'
    },
    {
      key: 'speed',
      label: 'Fastest Generation',
      model: winners.fastest,
      icon: <Zap className="w-4 h-4 text-sky-500" />,
      colorClasses: 'border-sky-500/30 hover:border-sky-500/60 bg-sky-500/5',
      badgeBg: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
      subtext: winners.fastest?.tradeOffProfile.speedExplanation || 'Near-instant generation latency'
    }
  ];

  // Filter out any entries without a model or redundant duplicates if only 1 model is available
  const validCards = cards.filter(c => c.model);

  if (validCards.length === 0) return null;

  return (
    <div className="my-3">
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
        <span>⚖️ Specific Trade-Off Highlights</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {validCards.slice(0, 3).map(card => (
          <div
            key={card.key}
            onClick={() => card.model && onSelectModel?.(card.model)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer card-hover-effect ${card.colorClasses}`}
          >
            <div className="flex items-center justify-between gap-1.5 mb-1">
              <div className="flex items-center gap-1.5">
                {card.icon}
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  {card.label}
                </span>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 truncate">
              {card.model?.name}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {card.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
