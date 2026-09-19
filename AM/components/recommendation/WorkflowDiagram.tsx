import React from 'react';
import type { WorkflowStep } from '../../types/chat';
import type { AIModel } from '../../types/aiModel';
import { Badge } from '../ui/Badge';
import { ArrowDown, ExternalLink, Sparkles } from 'lucide-react';

interface WorkflowDiagramProps {
  steps: WorkflowStep[];
  onSelectModel?: (model: AIModel) => void;
}

export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ steps, onSelectModel }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-3.5 bg-slate-500/5 dark:bg-black/25 rounded-2xl p-4 border border-black/10 dark:border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
          <Sparkles className="w-4 h-4 text-[#128C7E] dark:text-[#25D366]" />
          <span>Recommended Multi-Tool Workflow ({steps.length} Steps)</span>
        </div>
        <span className="text-[10px] bg-[#128C7E]/10 text-[#128C7E] dark:text-[#25D366] font-semibold px-2 py-0.5 rounded-full">
          Optimized Pipeline
        </span>
      </div>

      <div className="space-y-2 relative">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const tool = step.recommendedTool;

          return (
            <div key={step.stepNumber} className="relative">
              <div className="flex items-start gap-3 bg-white dark:bg-[#202C33] rounded-xl p-3 border border-black/5 dark:border-white/5 shadow-xs hover:border-[#128C7E]/40 transition-colors">
                {/* Step Number Badge */}
                <div className="w-6 h-6 rounded-full bg-[#128C7E] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                  {step.stepNumber}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {step.stageName}
                    </h4>
                    <Badge type={tool.pricingType} size="sm" />
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Recommended Tool Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100/80 dark:bg-black/30 px-2.5 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Tool:</span>
                      <button
                        type="button"
                        onClick={() => onSelectModel?.(tool)}
                        className="text-xs font-bold text-[#128C7E] dark:text-[#25D366] hover:underline truncate"
                      >
                        {tool.name}
                      </button>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        • {step.freeStatusNote}
                      </span>
                    </div>

                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-500 hover:text-[#128C7E] dark:hover:text-[#25D366] flex items-center gap-1 shrink-0"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Connecting Down Arrow */}
              {!isLast && (
                <div className="flex justify-center my-1">
                  <ArrowDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
