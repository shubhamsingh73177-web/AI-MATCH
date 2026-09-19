import React, { useState } from 'react';
import type { AIModel } from '../../types/aiModel';
import { AI_MODELS_DATABASE } from '../../data/aiModels';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { X, Plus, ExternalLink, Trash2 } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModels: AIModel[];
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  initialModels
}) => {
  const [selectedModels, setSelectedModels] = useState<AIModel[]>(() => {
    return initialModels.length > 0 ? initialModels.slice(0, 4) : [AI_MODELS_DATABASE[0], AI_MODELS_DATABASE[1]];
  });

  const [searchAdd, setSearchAdd] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Sync if initialModels changes
  React.useEffect(() => {
    if (initialModels.length > 0) {
      setSelectedModels(initialModels.slice(0, 4));
    }
  }, [initialModels]);

  if (!isOpen) return null;

  const removeModel = (id: string) => {
    if (selectedModels.length <= 1) return;
    setSelectedModels(prev => prev.filter(m => m.id !== id));
  };

  const addModel = (model: AIModel) => {
    if (selectedModels.some(m => m.id === model.id)) return;
    if (selectedModels.length >= 4) {
      setSelectedModels(prev => [...prev.slice(1), model]);
    } else {
      setSelectedModels(prev => [...prev, model]);
    }
    setIsAdding(false);
    setSearchAdd('');
  };

  const availableToAdd = AI_MODELS_DATABASE.filter(
    m => !selectedModels.some(s => s.id === m.id) &&
         (m.name.toLowerCase().includes(searchAdd.toLowerCase()) ||
          m.provider.toLowerCase().includes(searchAdd.toLowerCase()) ||
          m.category.toLowerCase().includes(searchAdd.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111B21] border border-black/10 dark:border-[#222E35] rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-800 dark:text-[#E9EDEF]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-[#222E35] bg-[#F0F2F5] dark:bg-[#202C33] flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚖️ Deep Multi-Model Comparison Matrix</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8696A0] mt-0.5">
              Side-by-side trade-offs, free tier quotas, speeds, and limitations
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedModels.length < 4 && (
              <button
                type="button"
                onClick={() => setIsAdding(!isAdding)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Model ({selectedModels.length}/4)</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add Model Dropdown Search */}
        {isAdding && (
          <div className="p-3 bg-slate-100 dark:bg-[#202C33] border-b border-black/10 dark:border-[#222E35] animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                value={searchAdd}
                onChange={e => setSearchAdd(e.target.value)}
                placeholder="Search model to add to comparison..."
                autoFocus
                className="w-full bg-white dark:bg-[#111B21] text-xs px-3.5 py-2 rounded-xl border border-[#128C7E] text-slate-900 dark:text-white focus:outline-none"
              />
              <div className="mt-2 max-h-40 overflow-y-auto bg-white dark:bg-[#111B21] rounded-xl border border-black/10 dark:border-white/10 shadow-lg divide-y divide-black/5 dark:divide-white/5">
                {availableToAdd.slice(0, 8).map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => addModel(m)}
                    className="w-full text-left p-2.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{m.name}</span>
                      <span className="text-slate-400 ml-1.5 text-[11px]">({m.provider} • {m.category})</span>
                    </div>
                    <Badge type={m.pricingType} size="sm" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Matrix Table Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-5 gap-3 border-b border-black/10 dark:border-white/10 pb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pt-3">
                Feature / Metric
              </div>
              {selectedModels.map(m => (
                <div key={m.id} className="relative bg-slate-50 dark:bg-[#202C33] p-3 rounded-xl border border-black/5 dark:border-white/5">
                  {selectedModels.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModel(m.id)}
                      title="Remove from comparison"
                      className="absolute top-2 right-2 text-slate-400 hover:text-rose-500 p-1 rounded-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate pr-6">
                    {m.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-[#8696A0] mb-1.5">
                    {m.provider}
                  </div>
                  <Badge type={m.pricingType} size="sm" />
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            <div className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {/* Row: Best For */}
              <div className="grid grid-cols-5 gap-3 py-3 items-start">
                <div className="font-bold text-slate-600 dark:text-slate-400">Best For</div>
                {selectedModels.map(m => (
                  <div key={m.id} className="text-slate-800 dark:text-slate-200">
                    {m.bestFor}
                  </div>
                ))}
              </div>

              {/* Row: Free Availability & Limits */}
              <div className="grid grid-cols-5 gap-3 py-3 items-start bg-emerald-500/5 dark:bg-emerald-500/10 -mx-2 px-2 rounded-lg">
                <div className="font-bold text-emerald-800 dark:text-emerald-400">
                  Free Access & Quotas
                </div>
                {selectedModels.map(m => (
                  <div key={m.id} className="text-slate-800 dark:text-slate-200 font-medium">
                    {m.freeTierDetails}
                  </div>
                ))}
              </div>

              {/* Row: Output Quality */}
              <div className="grid grid-cols-5 gap-3 py-3 items-center">
                <div className="font-bold text-slate-600 dark:text-slate-400">Output Quality</div>
                {selectedModels.map(m => (
                  <div key={m.id}>
                    <StarRating rating={m.qualityRating} showText />
                  </div>
                ))}
              </div>

              {/* Row: Speed */}
              <div className="grid grid-cols-5 gap-3 py-3 items-center">
                <div className="font-bold text-slate-600 dark:text-slate-400">Generation Speed</div>
                {selectedModels.map(m => (
                  <div key={m.id}>
                    <StarRating rating={m.speedRating} showText />
                  </div>
                ))}
              </div>

              {/* Row: Context Window / Capacity */}
              <div className="grid grid-cols-5 gap-3 py-3 items-start">
                <div className="font-bold text-slate-600 dark:text-slate-400">Context Window</div>
                {selectedModels.map(m => (
                  <div key={m.id} className="text-slate-800 dark:text-slate-200">
                    {m.contextWindow || 'Standard generation limits'}
                  </div>
                ))}
              </div>

              {/* Row: Open Source & Local */}
              <div className="grid grid-cols-5 gap-3 py-3 items-start">
                <div className="font-bold text-slate-600 dark:text-slate-400">License & Local</div>
                {selectedModels.map(m => (
                  <div key={m.id} className="text-slate-800 dark:text-slate-200 space-y-1">
                    <div>{m.isOpenSource ? '✅ Open Source Weights' : '🔒 Proprietary SaaS'}</div>
                    {m.isLocalCapable && (
                      <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                        Runs offline ({m.localHardwareRequirements || 'Ollama ready'})
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Row: API Availability */}
              <div className="grid grid-cols-5 gap-3 py-3 items-center">
                <div className="font-bold text-slate-600 dark:text-slate-400">Developer API</div>
                {selectedModels.map(m => (
                  <div key={m.id} className="text-slate-800 dark:text-slate-200">
                    {m.isApiAvailable ? '✅ Developer API Available' : '❌ Web UI Only'}
                  </div>
                ))}
              </div>

              {/* Row: Key Strengths */}
              <div className="grid grid-cols-5 gap-3 py-3 items-start">
                <div className="font-bold text-slate-600 dark:text-slate-400">Key Strengths</div>
                {selectedModels.map(m => (
                  <ul key={m.id} className="space-y-1 text-slate-800 dark:text-slate-200 list-disc list-inside">
                    {m.keyStrengths.slice(0, 3).map((st, i) => (
                      <li key={i} className="text-[11px]">{st}</li>
                    ))}
                  </ul>
                ))}
              </div>

              {/* Row: Limitations */}
              <div className="grid grid-cols-5 gap-3 py-3 items-start">
                <div className="font-bold text-slate-600 dark:text-slate-400">Limitations</div>
                {selectedModels.map(m => (
                  <ul key={m.id} className="space-y-1 text-slate-500 dark:text-slate-400 list-disc list-inside">
                    {m.limitations.map((lim, i) => (
                      <li key={i} className="text-[11px]">{lim}</li>
                    ))}
                  </ul>
                ))}
              </div>

              {/* Row: Visit Website */}
              <div className="grid grid-cols-5 gap-3 py-4 items-center">
                <div className="font-bold text-slate-600 dark:text-slate-400">Direct Link</div>
                {selectedModels.map(m => (
                  <div key={m.id}>
                    <a
                      href={m.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white transition-colors"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
