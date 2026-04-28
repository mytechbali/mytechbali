import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { translations, Language } from './translations';
import { supabase } from '@/integrations/supabase/client';

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : T[K] extends readonly string[] ? readonly string[] : DeepString<T[K]>;
};

type TranslationValues = DeepString<(typeof translations)['en']>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationValues;
  refreshOverrides: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Apply a dotted key path (e.g. "hero.headline1" or "services.laptopFeatures.0")
// onto a clone of the base tree.
const applyOverride = (tree: any, key: string, value: string) => {
  const parts = key.split('.');
  let cur: any = tree;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur[p] === undefined || cur[p] === null) return;
    if (Array.isArray(cur[p])) cur[p] = [...cur[p]];
    else cur[p] = { ...cur[p] };
    cur = cur[p];
  }
  const last = parts[parts.length - 1];
  // Array index
  if (Array.isArray(cur) && /^\d+$/.test(last)) {
    cur[Number(last)] = value;
  } else {
    cur[last] = value;
  }
};

const cloneTree = (src: any): any => {
  if (Array.isArray(src)) return src.slice();
  if (src && typeof src === 'object') {
    const o: any = {};
    for (const k of Object.keys(src)) o[k] = cloneTree(src[k]);
    return o;
  }
  return src;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [overrides, setOverrides] = useState<Record<string, Record<string, string>>>({});
  // shape: { [lang]: { [key]: value } }

  const loadOverrides = useCallback(async () => {
    const { data, error } = await supabase.from('site_translations').select('key, lang, value');
    if (error || !data) return;
    const next: Record<string, Record<string, string>> = {};
    for (const row of data) {
      if (!next[row.lang]) next[row.lang] = {};
      next[row.lang][row.key] = row.value;
    }
    setOverrides(next);
  }, []);

  useEffect(() => {
    loadOverrides();
    // Listen for admin-triggered refresh (same tab)
    const handler = () => loadOverrides();
    window.addEventListener('site-translations-updated', handler);
    return () => window.removeEventListener('site-translations-updated', handler);
  }, [loadOverrides]);

  const base = translations[language] || translations['en'];
  const langOverrides = overrides[language] || {};
  let merged: TranslationValues;
  if (Object.keys(langOverrides).length === 0) {
    merged = base as TranslationValues;
  } else {
    const clone = cloneTree(base);
    for (const [key, value] of Object.entries(langOverrides)) {
      applyOverride(clone, key, value);
    }
    merged = clone;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: merged, refreshOverrides: loadOverrides }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
