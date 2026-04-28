
CREATE TABLE public.site_translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  lang TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (key, lang)
);

ALTER TABLE public.site_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read translations"
  ON public.site_translations FOR SELECT
  USING (true);

CREATE POLICY "Public can insert translations"
  ON public.site_translations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can update translations"
  ON public.site_translations FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE POLICY "Public can delete translations"
  ON public.site_translations FOR DELETE
  USING (true);

CREATE INDEX idx_site_translations_lang ON public.site_translations(lang);
