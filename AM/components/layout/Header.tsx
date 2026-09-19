import React from 'react';
import type { UserSettings } from '../../types/chat';
import { Menu, Layers, Compass, Sun, Moon, Filter } from 'lucide-react';

interface HeaderProps {
  settings: UserSettings;
  onToggleTheme: () => void;
  onOpenCatalog: () => void;
  onOpenCompareModal: () => void;
  onOpenSettings: () => void;
  onToggleSidebarMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onToggleTheme,
  onOpenCatalog,
  onOpenCompareModal,
  onOpenSettings,
  onToggleSidebarMobile
}) => {
  const activeFiltersCount = [
    settings.freeOnly,
    settings.openSourceOnly,
    settings.preferLocal,
    settings.apiRequired
  ].filter(Boolean).length;

  return (
    <header className="h-14 bg-[#F0F2F5] dark:bg-[#202C33] border-b border-black/10 dark:border-white/10 px-3 sm:px-4 flex items-center justify-between shrink-0 select-none z-20">
      {/* Left: Mobile Toggle & Branding */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebarMobile}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] flex items-center justify-center text-base shadow-xs">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                AI Match
              </span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-[#128C7E]/15 text-[#128C7E] dark:text-[#25D366] font-bold uppercase tracking-wider">
                Pro
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#8696A0]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden xs:inline">AI Recommendation Engine</span>
              <span className="xs:hidden">Engine Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center/Right: Action Buttons & Filter Badges */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Active Filters Pill */}
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onOpenSettings}
            className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-medium hover:bg-emerald-500/25 transition-colors"
          >
            <Filter className="w-3 h-3" />
            <span>{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active</span>
          </button>
        )}

        {/* Explore All AI Tools */}
        <button
          type="button"
          onClick={onOpenCatalog}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white dark:bg-[#2A3942] hover:bg-slate-100 dark:hover:bg-[#32424b] text-slate-800 dark:text-slate-200 border border-black/10 dark:border-white/10 transition-colors shadow-2xs"
        >
          <Compass className="w-4 h-4 text-[#128C7E] dark:text-[#25D366]" />
          <span className="hidden sm:inline">Explore 75+ AI Tools</span>
          <span className="sm:hidden">Catalog</span>
        </button>

        {/* Deep Comparison Modal Trigger */}
        <button
          type="button"
          onClick={onOpenCompareModal}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white dark:bg-[#2A3942] hover:bg-slate-100 dark:hover:bg-[#32424b] text-slate-800 dark:text-slate-200 border border-black/10 dark:border-white/10 transition-colors shadow-2xs"
        >
          <Layers className="w-4 h-4 text-[#128C7E] dark:text-[#25D366]" />
          <span className="hidden md:inline">Compare Models</span>
          <span className="md:hidden">Compare</span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          title={settings.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {settings.theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>
    </header>
  );
};
