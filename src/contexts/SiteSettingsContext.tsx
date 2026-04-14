import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SiteSettings {
  // Colors (HSL values without hsl() wrapper)
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  // Typography
  fontFamily: string;
  headingFontFamily: string;
  // Head
  siteTitle: string;
  // Text overrides
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubheadline: string;
  footerDescription: string;
}

const defaultSettings: SiteSettings = {
  primaryColor: '217 91% 50%',
  accentColor: '170 80% 45%',
  backgroundColor: '220 20% 97%',
  foregroundColor: '220 40% 13%',
  fontFamily: 'Outfit',
  headingFontFamily: 'Outfit',
  siteTitle: 'My Tech Bali - Computer Repair & Service',
  heroHeadline1: '',
  heroHeadline2: '',
  heroSubheadline: '',
  footerDescription: '',
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'mytechbali_site_settings';

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Apply CSS variables whenever settings change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', settings.primaryColor);
    root.style.setProperty('--accent', settings.accentColor);
    root.style.setProperty('--background', settings.backgroundColor);
    root.style.setProperty('--foreground', settings.foregroundColor);
    root.style.setProperty('--ring', settings.primaryColor);

    // Update gradient
    root.style.setProperty(
      '--gradient-primary',
      `linear-gradient(135deg, hsl(${settings.primaryColor}) 0%, hsl(${settings.accentColor}) 100%)`
    );

    // Font
    document.body.style.fontFamily = `'${settings.fontFamily}', sans-serif`;

    // Title
    document.title = settings.siteTitle;
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const resetSettings = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSettings(defaultSettings);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  return context;
};

export { defaultSettings };
