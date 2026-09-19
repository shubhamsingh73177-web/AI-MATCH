import React from 'react';
import type { AIModel } from '../../types/aiModel';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { ExternalLink, Layers, CheckCircle2, Zap } from 'lucide-react';

interface RecommendationCardProps {
  model: AIModel;
  onOpenCompare?: (model: AIModel) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  model,
  onOpenCompare
}) => {
  return (
    <div className="my-3.5 bg-gradient-to-b from-[#128C7E]/10 via-[#128C7E]/5 to-transparent dark:from-[#128C7E]/20 dark:via-[#202C33] dark:to-[#202C33] border border-[#128C7E]/30 dark:border-[#128C7E]/40 rounded-2xl p-4 shadow-sm relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#128C7E]" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#128C7E] dark:text-[#25D366] uppercase tracking-wider mb-1">
            <span>🏆 Recommended Match</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {model.name}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
              by {model.provider}
            </span>
          </h3>
        </div>

        <Badge type={model.pricingType} size="md" />
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
        {model.tagline}
      </p>

      {/* Suitability Reasons */}
      <div className="bg-white/70 dark:bg-black/25 rounded-xl p-3 border border-black/5 dark:border-white/5 mb-3.5">
        <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Best suited for your task because:</span>
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {model.keyStrengths.slice(0, 3).map((strength, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#128C7E] dark:text-[#25D366] font-bold mt-0.5">•</span>
              <span>{strength}</span>
            </li>
          ))}
          <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
            <span className="text-emerald-500 font-bold mt-0.5">•</span>
            <span>
              <strong className="text-slate-800 dark:text-slate-200">Free Access:</strong> {model.freeTierDetails}
            </span>
          </li>
        </ul>
      </div>

      {/* Quick Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 mb-4 bg-slate-500/5 p-2.5 rounded-xl">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Quality</span>
          <StarRating rating={model.qualityRating} showText />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Speed</span>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-sky-500" />
            <StarRating rating={model.speedRating} showText />
          </div>
        </div>
        {model.contextWindow ? (
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Context Window</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block text-[11px]">
              {model.contextWindow.split(' ')[0]} {model.contextWindow.split(' ')[1]}
            </span>
          </div>
        ) : (
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Ease of Use</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
              {model.easeOfUse}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-black/5 dark:border-white/5">
        <a
          href={model.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs"
        >
          <span>Open {model.name.split(' ')[0]}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          type="button"
          onClick={() => onOpenCompare?.(model)}
          className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 bg-slate-200/80 hover:bg-slate-300/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#25D366]" />
          <span>Compare All Options</span>
        </button>
      </div>
    </div>
  );
};
