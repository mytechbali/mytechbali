import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Languages, Sparkles, Loader2, Check } from 'lucide-react';
import { translations } from '@/i18n/translations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Flat = { key: string; value: string };

const flatten = (obj: any, prefix = ''): Flat[] => {
  const out: Flat[] = [];
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out.push({ key: path, value: v });
    else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (typeof item === 'string') out.push({ key: `${path}.${i}`, value: item });
      });
    } else if (v && typeof v === 'object') out.push(...flatten(v, path));
  }
  return out;
};

const LANG_LABELS: Record<string, string> = {
  en: 'English', id: 'Indonesian', ja: 'Japanese', zh: 'Chinese',
  de: 'German', fr: 'French', ru: 'Russian', ko: 'Korean',
};

// Group keys by their top-level section for a cleaner UI.
const sectionOf = (key: string) => key.split('.')[0];

export const ContentEditor = () => {
  const baseFlat = useMemo(() => flatten(translations.en), []);
  const sections = useMemo(() => {
    const map = new Map<string, Flat[]>();
    for (const f of baseFlat) {
      const s = sectionOf(f.key);
      if (!map.has(s)) map.set(s, []);
      map.get(s)!.push(f);
    }
    return Array.from(map.entries());
  }, [baseFlat]);

  const [activeSection, setActiveSection] = useState<string>(sections[0]?.[0] ?? 'nav');
  // current value per key (what the admin is editing, source language = en)
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    baseFlat.forEach(f => { initial[f.key] = f.value; });
    return initial;
  });
  // which rows have DB overrides (so we can show a badge)
  const [overridden, setOverridden] = useState<Record<string, boolean>>({});
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState<string | null>(null);

  // Load existing EN overrides from DB so the admin sees their current edits.
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('site_translations')
        .select('key, lang, value')
        .eq('lang', 'en');
      if (!data) return;
      const o: Record<string, boolean> = {};
      setValues(prev => {
        const next = { ...prev };
        for (const row of data) {
          next[row.key] = row.value;
          o[row.key] = true;
        }
        return next;
      });
      setOverridden(o);
    })();
  }, []);

  const handleTranslate = async (key: string) => {
    setBusyKey(key);
    try {
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: { key, sourceLang: 'en', sourceText: values[key] ?? '' },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setOverridden(prev => ({ ...prev, [key]: true }));
      setJustSaved(key);
      setTimeout(() => setJustSaved(s => (s === key ? null : s)), 2000);
      toast.success('Translated & saved across all languages');
      // Tell the site to refresh overrides
      window.dispatchEvent(new CustomEvent('site-translations-updated'));
    } catch (e: any) {
      toast.error(e?.message || 'Translation failed');
    } finally {
      setBusyKey(null);
    }
  };

  const current = sections.find(([s]) => s === activeSection)?.[1] ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-primary" />
          Content & Translations
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Edit text in English, then click <b>Translate & Save</b> — it will be auto-translated
          into {Object.keys(LANG_LABELS).length - 1} other languages and shown on the live site.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {sections.map(([s]) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                activeSection === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {current.map(({ key }) => {
            const isLong = (values[key] ?? '').length > 80;
            const busy = busyKey === key;
            const saved = justSaved === key;
            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label className="font-mono text-xs text-muted-foreground">{key}</Label>
                  {overridden[key] && !saved && (
                    <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">Custom</span>
                  )}
                  {saved && (
                    <span className="text-[10px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Saved
                    </span>
                  )}
                </div>
                <div className="flex gap-2 items-start">
                  {isLong ? (
                    <Textarea
                      value={values[key] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                      className="flex-1 min-h-[70px]"
                    />
                  ) : (
                    <Input
                      value={values[key] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                      className="flex-1"
                    />
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={busy}
                    onClick={() => handleTranslate(key)}
                    className="shrink-0"
                  >
                    {busy ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span className="ml-1 hidden sm:inline">Translate & Save</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;