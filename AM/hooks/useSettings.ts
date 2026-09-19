import { useState, useEffect } from 'react';
import type { UserSettings } from '../types/chat';

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  freeOnly: false,
  openSourceOnly: false,
  preferLocal: false,
  apiRequired: false,
  streamSpeed: 'natural'
};

const STORAGE_KEY = 'aimatch_user_settings_v1';

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }

    // Apply dark/light class to root element
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (settings.theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      // system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  }, [settings]);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleSetting = (key: 'freeOnly' | 'openSourceOnly' | 'preferLocal' | 'apiRequired') => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return {
    settings,
    updateSetting,
    toggleSetting,
    resetSettings: () => setSettings(DEFAULT_SETTINGS)
  };
}
