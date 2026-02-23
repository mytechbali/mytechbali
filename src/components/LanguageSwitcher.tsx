import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';



const languageOptions: { code: Language; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'id', flag: '🇮🇩', label: 'Indonesia' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = languageOptions.find((l) => l.code === language)!;

  return (
    <div className="fixed bottom-6 left-6 z-50" ref={ref}>
      <Button
        variant="default"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 gap-1.5 px-3 py-2"
      >
        <Globe className="w-4 h-4" />
        {current.flag} {current.code.toUpperCase()}
      </Button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px] z-50">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-muted transition-colors ${
                language === lang.code ? 'text-primary font-semibold' : 'text-foreground'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
