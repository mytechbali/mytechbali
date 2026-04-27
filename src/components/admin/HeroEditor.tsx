import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { Image as ImageIcon, Video, Film, Check, Link2 } from 'lucide-react';
import type { SiteSettings } from '@/contexts/SiteSettingsContext';

type Update = (key: keyof SiteSettings, value: string | number) => void;

interface Props {
  settings: SiteSettings;
  update: Update;
}

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">{label}</Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export const HeroEditor = ({ settings, update }: Props) => {
  const { items } = useMediaLibrary();
  const [pickerOpen, setPickerOpen] = useState(false);
  const videos = items.filter(i => i.type.startsWith('video/'));

  return (
    <div className="space-y-6">
      {/* Background video */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Film className="w-5 h-5 text-primary" />
            Background Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field
            label="Video URL"
            hint="Paste a direct video URL, or pick from your Media Library below. Leave empty to use the default bundled video."
          >
            <div className="flex gap-2">
              <Input
                value={settings.heroVideoUrl}
                onChange={e => update('heroVideoUrl', e.target.value)}
                placeholder="https://... or blob:..."
              />
              <Button variant="outline" type="button" onClick={() => update('heroVideoUrl', '')}>
                Reset
              </Button>
            </div>
          </Field>

          <div>
            <Button variant="outline" type="button" onClick={() => setPickerOpen(o => !o)}>
              <Video className="w-4 h-4 mr-2" />
              {pickerOpen ? 'Hide' : 'Pick from Media Library'} ({videos.length})
            </Button>
          </div>

          {pickerOpen && (
            <div className="border border-border rounded-lg p-3">
              {videos.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No videos uploaded yet. Go to <strong>Media Library</strong> and upload an .mp4 / .webm file first.
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {videos.map(v => {
                    const selected = settings.heroVideoUrl === v.url;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => update('heroVideoUrl', v.url)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all text-left ${
                          selected ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <video src={v.url} className="w-full aspect-video object-cover bg-muted" muted />
                        <div className="p-2 bg-card">
                          <p className="text-xs font-medium truncate">{v.name}</p>
                        </div>
                        {selected && (
                          <div className="absolute top-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                ⚠️ Media Library URLs are local to this browser. For a video that loads on every device, paste a public URL instead (e.g. from a CDN).
              </p>
            </div>
          )}

          {/* Preview */}
          {settings.heroVideoUrl && (
            <div className="rounded-lg overflow-hidden border border-border bg-black">
              <video src={settings.heroVideoUrl} className="w-full max-h-64 object-cover" autoPlay loop muted playsInline />
            </div>
          )}

          <Field label={`Overlay darkness: ${settings.heroOverlayOpacity}%`} hint="Higher value = darker overlay over the video for better text readability.">
            <input
              type="range"
              min={0}
              max={100}
              value={settings.heroOverlayOpacity}
              onChange={e => update('heroOverlayOpacity', parseInt(e.target.value, 10))}
              className="w-full accent-primary"
            />
          </Field>
        </CardContent>
      </Card>

      {/* Text content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Hero Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Top Badge">
            <Input value={settings.heroBadge} onChange={e => update('heroBadge', e.target.value)} placeholder="Trusted Tech Service in Bali" />
          </Field>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Headline Line 1">
              <Input value={settings.heroHeadline1} onChange={e => update('heroHeadline1', e.target.value)} placeholder="Expert Computer" />
            </Field>
            <Field label="Headline Line 2 (gradient)">
              <Input value={settings.heroHeadline2} onChange={e => update('heroHeadline2', e.target.value)} placeholder="Repair & Service" />
            </Field>
          </div>
          <Field label="Subheadline">
            <Input value={settings.heroSubheadline} onChange={e => update('heroSubheadline', e.target.value)} placeholder="Your trusted partner..." />
          </Field>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" />
            Call-to-Action Buttons
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg border border-border">
            <Field label="Primary Button Label">
              <Input value={settings.heroPrimaryBtnLabel} onChange={e => update('heroPrimaryBtnLabel', e.target.value)} placeholder="Book Appointment" />
            </Field>
            <Field label="Primary Button URL" hint="WhatsApp, tel:, mailto:, or any URL">
              <Input value={settings.heroPrimaryBtnUrl} onChange={e => update('heroPrimaryBtnUrl', e.target.value)} placeholder="https://wa.me/..." />
            </Field>
          </div>
          <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg border border-border">
            <Field label="Secondary Button Label">
              <Input value={settings.heroSecondaryBtnLabel} onChange={e => update('heroSecondaryBtnLabel', e.target.value)} placeholder="Free Diagnosis" />
            </Field>
            <Field label="Secondary Button URL">
              <Input value={settings.heroSecondaryBtnUrl} onChange={e => update('heroSecondaryBtnUrl', e.target.value)} placeholder="https://wa.me/..." />
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Quick services */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Service Cards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map(n => {
            const tKey = `heroService${n}Title` as keyof SiteSettings;
            const dKey = `heroService${n}Desc` as keyof SiteSettings;
            return (
              <div key={n} className="grid md:grid-cols-2 gap-4 p-4 rounded-lg border border-border">
                <Field label={`Card ${n} — Title`}>
                  <Input
                    value={settings[tKey] as string}
                    onChange={e => update(tKey, e.target.value)}
                    placeholder="Computer Repair"
                  />
                </Field>
                <Field label={`Card ${n} — Description`}>
                  <Input
                    value={settings[dKey] as string}
                    onChange={e => update(dKey, e.target.value)}
                    placeholder="Hardware & software fixes"
                  />
                </Field>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">Leave empty to use translated defaults.</p>
        </CardContent>
      </Card>
    </div>
  );
};