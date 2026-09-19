import React from 'react';
import type { AIModel } from '../../types/aiModel';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { ExternalLink, Layers } from 'lucide-react';

interface ComparisonTableProps {
  primaryModel: AIModel;
  alternativeModels: AIModel[];
  onOpenCompare?: (model: AIModel) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  primaryModel,
  alternativeModels,
  onOpenCompare
}) => {
  const allModels = [primaryModel, ...alternativeModels];

  return (
    <div className="my-3">
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
        <span>📊 Side-by-Side Model Comparison</span>
        <span className="text-[10px] text-slate-400 font-normal">Scroll to view details →</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-slate-100/70 dark:bg-slate-800/60 text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <th className="py-2.5 px-3">AI Model</th>
              <th className="py-2.5 px-3">Best For</th>
              <th className="py-2.5 px-3">Free Access & Limits</th>
              <th className="py-2.5 px-3">Quality</th>
              <th className="py-2.5 px-3">Speed</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
            {allModels.map((model, idx) => {
              const isPrimary = idx === 0;
              return (
                <tr
                  key={model.id}
                  className={`hover:bg-slate-500/5 transition-colors ${
                    isPrimary ? 'bg-[#128C7E]/5 dark:bg-[#128C7E]/10 font-medium' : ''
                  }`}
                >
                  {/* Model Name & Provider */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {model.name}
                      </span>
                      {isPrimary && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#128C7E]/20 text-[#128C7E] dark:text-[#25D366] font-bold">
                          Top
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {model.provider}
                    </div>
                  </td>

                  {/* Best For */}
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 max-w-[150px] truncate" title={model.bestFor}>
                    {model.bestFor}
                  </td>

                  {/* Free Access & Limits */}
                  <td className="py-2.5 px-3">
                    <div className="mb-0.5">
                      <Badge type={model.pricingType} size="sm" />
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1" title={model.freeTierDetails}>
                      {model.freeTierDetails}
                    </div>
                  </td>

                  {/* Quality */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <StarRating rating={model.qualityRating} />
                  </td>

                  {/* Speed */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <StarRating rating={model.speedRating} />
                  </td>

                  {/* Action */}
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenCompare?.(model)}
                        title="Compare full specs"
                        className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={model.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Open ${model.name}`}
                        className="p-1 rounded-lg text-[#128C7E] dark:text-[#25D366] hover:bg-[#128C7E]/15 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
