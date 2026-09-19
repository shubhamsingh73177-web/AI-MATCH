import React from 'react';
import type { FollowUpQuestion } from '../../types/chat';
import { HelpCircle } from 'lucide-react';

interface FollowUpPillsProps {
  questions: FollowUpQuestion[];
  onSelectOption: (optionValue: string) => void;
}

export const FollowUpPills: React.FC<FollowUpPillsProps> = ({ questions, onSelectOption }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-3.5 space-y-3 pt-3 border-t border-black/5 dark:border-white/5">
      {questions.map(q => (
        <div key={q.id} className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#25D366]" />
            <span>{q.question}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectOption(opt.value)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-[#111B21] border border-[#128C7E]/30 dark:border-[#128C7E]/40 text-slate-800 dark:text-slate-200 hover:bg-[#128C7E] hover:text-white dark:hover:bg-[#128C7E] transition-all shadow-2xs hover:scale-102 active:scale-98"
              >
                {opt.icon && <span>{opt.icon}</span>}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
