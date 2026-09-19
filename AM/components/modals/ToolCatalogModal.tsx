import React, { useState } from 'react';
import { AI_MODELS_DATABASE } from '../../data/aiModels';
import { CATEGORIES_DATA } from '../../data/categories';
import type { AIModel } from '../../types/aiModel';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { X, Search, ExternalLink, Layers, MessageSquare } from 'lucide-react';

interface ToolCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectForChat: (prompt: string) => void;
  onOpenCompare: (model: AIModel) => void;
}

export const ToolCatalogModal: React.FC<ToolCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectForChat,
  onOpenCompare
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [pricingFilter, setPricingFilter] = useState<string>('all');
  const [onlyOpenSource, setOnlyOpenSource] = useState(false);
  const [onlyLocal, setOnlyLocal] = useState(false);
  const [onlyApi, setOnlyApi] = useState(false);

  if (!isOpen) return null;

  const filteredModels = AI_MODELS_DATABASE.filter(m => {
    // Search
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.provider.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.subcategories.some(s => s.toLowerCase().includes(q));

    // Category
    const matchCat = selectedCategory === 'all' || m.category === selectedCategory;

    // Pricing
    const matchPrice =
      pricingFilter === 'all' ||
      (pricingFilter === 'free' && (m.pricingType === 'free' || m.pricingType === 'open_source')) ||
      (pricingFilter === 'free_tier' && m.pricingType === 'free_tier') ||
      (pricingFilter === 'paid' && m.pricingType === 'paid');

    // Extra toggles
    if (onlyOpenSource && !m.isOpenSource) return false;
    if (onlyLocal && !m.isLocalCapable) return false;
    if (onlyApi && !m.isApiAvailable) return false;

    return matchSearch && matchCat && matchPrice;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111B21] border border-black/10 dark:border-[#222E35] rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-800 dark:text-[#E9EDEF]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-[#222E35] bg-[#F0F2F5] dark:bg-[#202C33] flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📚 AI Models & Tools Catalog</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#128C7E]/15 text-[#128C7E] dark:text-[#25D366]">
                {filteredModels.length} Models
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8696A0] mt-0.5">
              Explore capabilities, verified free quotas, and open-source licenses
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3.5 border-b border-black/10 dark:border-[#222E35] bg-slate-50 dark:bg-[#182229] space-y-3">
          {/* Top row: Search input & Price selector */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, provider, task, or keyword (e.g. 'Flux', 'Audio', 'Ollama')..."
                className="w-full bg-white dark:bg-[#111B21] text-xs pl-9 pr-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#128C7E]"
              />
            </div>

            {/* Pricing selector */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#111B21] p-1 rounded-xl border border-black/10 dark:border-white/10 shrink-0 text-xs">
              <span className="text-[11px] font-bold text-slate-400 px-2 hidden sm:inline">Pricing:</span>
              {(['all', 'free', 'free_tier', 'paid'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPricingFilter(p)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    pricingFilter === p
                      ? 'bg-[#128C7E] text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {p === 'all' ? 'All' : p === 'free' ? '100% Free' : p === 'free_tier' ? 'Free Tier' : 'Paid'}
                </button>
              ))}
            </div>
          </div>

          {/* Second row: Categories scroll & checkboxes */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#128C7E] text-white'
                    : 'bg-white dark:bg-[#202C33] text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/5'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES_DATA.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                    selectedCategory === c.id
                      ? 'bg-[#128C7E] text-white'
                      : 'bg-white dark:bg-[#202C33] text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/5'
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>

            {/* Checkbox toggles */}
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyOpenSource}
                  onChange={e => setOnlyOpenSource(e.target.checked)}
                  className="rounded text-[#128C7E] focus:ring-0"
                />
                <span>Open Source</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyLocal}
                  onChange={e => setOnlyLocal(e.target.checked)}
                  className="rounded text-[#128C7E] focus:ring-0"
                />
                <span>Local Offline</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyApi}
                  onChange={e => setOnlyApi(e.target.checked)}
                  className="rounded text-[#128C7E] focus:ring-0"
                />
                <span>API Ready</span>
              </label>
            </div>
          </div>
        </div>

        {/* Model Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50 dark:bg-[#0c1317]">
          {filteredModels.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                No AI models found matching your current search and filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPricingFilter('all');
                  setOnlyOpenSource(false);
                  setOnlyLocal(false);
                  setOnlyApi(false);
                }}
                className="text-xs text-[#128C7E] dark:text-[#25D366] font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredModels.map(model => (
                <div
                  key={model.id}
                  className="bg-white dark:bg-[#202C33] rounded-2xl p-4 border border-black/10 dark:border-white/10 shadow-xs flex flex-col justify-between card-hover-effect"
                >
                  <div>
                    {/* Top Row: Provider, Badge */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-[#8696A0] uppercase tracking-wider">
                        {model.provider}
                      </span>
                      <Badge type={model.pricingType} size="sm" />
                    </div>

                    {/* Model Name */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {model.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                      {model.tagline}
                    </p>

                    {/* Free Quotas Box */}
                    <div className="bg-slate-50 dark:bg-black/20 p-2.5 rounded-xl border border-black/5 dark:border-white/5 text-xs mb-3 space-y-1">
                      <div className="font-semibold text-slate-700 dark:text-slate-200 text-[11px]">
                        Free Tier Quota:
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {model.freeTierDetails}
                      </div>
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 pt-1 border-t border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Quality:</span>
                        <StarRating rating={model.qualityRating} />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Speed:</span>
                        <StarRating rating={model.speedRating} />
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectForChat(`Tell me about ${model.name} by ${model.provider} and how to use it for ${model.bestFor}`);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black/30 dark:hover:bg-black/50 text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#25D366]" />
                      <span>Ask AI Match</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenCompare(model);
                      }}
                      title="Compare specs"
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black/30 dark:hover:bg-black/50 text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      <Layers className="w-4 h-4" />
                    </button>

                    <a
                      href={model.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit website"
                      className="p-1.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
