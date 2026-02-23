import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  floating?: boolean;
}

const languageOptions: { code: Language; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'id', flag: '🇮🇩', label: 'Indonesia' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
];

const LanguageSwitcher = ({ isScrolled = true, floating = false }: LanguageSwitcherProps) => {
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
    <div className={`relative ${floating ? 'fixed bottom-6 left-6 z-50' : ''}`} ref={ref}>
      <Button
        variant={floating ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={floating
          ? 'rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300'
          : `font-semibold text-xs px-2 gap-1 transition-colors ${
              isScrolled
                ? 'text-foreground hover:text-primary'
                : 'text-primary-foreground hover:text-primary-foreground/80'
            }`
        }
      >
        <Globe className={floating ? 'w-6 h-6' : 'w-4 h-4'} />
        {!floating && <>{current.flag} {current.code.toUpperCase()}</>}
      </Button>

      {isOpen && (
        <div className={`absolute bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px] z-50 ${
          floating ? 'left-0 bottom-full mb-2' : 'right-0 top-full mt-2'
        }`}>
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
