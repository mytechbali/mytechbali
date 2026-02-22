import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

const LanguageSwitcher = ({ isScrolled = true }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
      className={`font-semibold text-xs px-2 transition-colors ${
        isScrolled
          ? 'text-foreground hover:text-primary'
          : 'text-primary-foreground hover:text-primary-foreground/80'
      }`}
    >
      {language === 'en' ? '🇮🇩 ID' : '🇬🇧 EN'}
    </Button>
  );
};

export default LanguageSwitcher;
