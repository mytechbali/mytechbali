import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteSettings, defaultSettings } from '@/contexts/SiteSettingsContext';
import { LogOut, Palette, Type, FileText, RotateCcw, Save, Home, Eye } from 'lucide-react';

const GOOGLE_FONTS = [
  'Outfit', 'Inter', 'Poppins', 'Roboto', 'Open Sans', 'Montserrat',
  'Lato', 'Raleway', 'Nunito', 'Playfair Display', 'Merriweather',
  'Source Sans 3', 'Ubuntu', 'Rubik', 'Work Sans', 'DM Sans',
  'Fira Sans', 'Quicksand', 'Josefin Sans', 'Barlow',
];

const hslToHex = (hsl: string): string => {
  try {
    const parts = hsl.trim().split(/\s+/);
    const h = parseFloat(parts[0]) || 0;
    const s = (parseFloat(parts[1]) || 0) / 100;
    const l = (parseFloat(parts[2]) || 0) / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  } catch {
    return '#3b82f6';
  }
};

const hexToHsl = (hex: string): string => {
  try {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return `0 0% ${Math.round(l * 100)}%`;
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  } catch {
    return '217 91% 50%';
  }
};

const ColorField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">{label}</Label>
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={hslToHex(value)}
        onChange={e => onChange(hexToHsl(e.target.value))}
        className="w-12 h-10 rounded-lg border border-input cursor-pointer"
      />
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">HSL</Label>
          <Input
            value={value}
            onChange={e => onChange(e.target.value)}
            className="font-mono text-xs h-9"
            placeholder="H S% L%"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">HEX</Label>
          <Input
            value={hslToHex(value).toUpperCase()}
            onChange={e => {
              const v = e.target.value.trim();
              if (/^#?[0-9a-fA-F]{6}$/.test(v)) {
                onChange(hexToHsl(v.startsWith('#') ? v : `#${v}`));
              }
            }}
            className="font-mono text-xs h-9 uppercase"
            placeholder="#3B82F6"
          />
        </div>
      </div>
      <div className="w-10 h-10 rounded-lg border border-input shrink-0" style={{ backgroundColor: `hsl(${value})` }} />
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, resetSettings } = useSiteSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'text'>('colors');

  useEffect(() => {
    if (localStorage.getItem('mtb_admin_auth') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  // Load font when headingFontFamily or fontFamily changes
  useEffect(() => {
    const fonts = new Set([localSettings.fontFamily, localSettings.headingFontFamily]);
    fonts.forEach(font => {
      if (font && font !== 'Outfit') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800&display=swap`;
        document.head.appendChild(link);
      }
    });
  }, [localSettings.fontFamily, localSettings.headingFontFamily]);

  const handleSave = () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetSettings();
    setLocalSettings(defaultSettings);
  };

  const handleLogout = () => {
    localStorage.removeItem('mtb_admin_auth');
    navigate('/admin');
  };

  const update = (key: keyof typeof localSettings, value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'colors' as const, label: 'Colors', icon: Palette },
    { id: 'typography' as const, label: 'Typography', icon: Type },
    { id: 'text' as const, label: 'Text & Title', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Site Settings</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => window.open('/', '_blank')}>
              <Eye className="w-4 h-4 mr-1" /> Preview
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-1" /> Site
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-card/80'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Colors */}
        {activeTab === 'colors' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ColorField label="Primary Color" value={localSettings.primaryColor} onChange={v => update('primaryColor', v)} />
              <ColorField label="Accent Color" value={localSettings.accentColor} onChange={v => update('accentColor', v)} />
              <ColorField label="Background Color" value={localSettings.backgroundColor} onChange={v => update('backgroundColor', v)} />
              <ColorField label="Foreground / Text Color" value={localSettings.foregroundColor} onChange={v => update('foregroundColor', v)} />

              {/* Live preview */}
              <div className="border border-border rounded-xl p-6 space-y-3">
                <p className="text-sm font-medium text-muted-foreground mb-3">Live Preview</p>
                <div className="flex gap-4">
                  <div className="flex-1 rounded-lg p-4" style={{ backgroundColor: `hsl(${localSettings.backgroundColor})`, color: `hsl(${localSettings.foregroundColor})` }}>
                    <p className="font-semibold mb-1">Sample Text</p>
                    <p className="text-sm opacity-70">This is how body text looks.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="px-4 py-2 rounded-lg text-sm font-medium text-center" style={{ backgroundColor: `hsl(${localSettings.primaryColor})`, color: 'white' }}>
                      Primary Button
                    </div>
                    <div className="px-4 py-2 rounded-lg text-sm font-medium text-center" style={{ backgroundColor: `hsl(${localSettings.accentColor})`, color: 'white' }}>
                      Accent Button
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Typography */}
        {activeTab === 'typography' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Body Font</Label>
                <select
                  value={localSettings.fontFamily}
                  onChange={e => update('fontFamily', e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {GOOGLE_FONTS.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Heading Font</Label>
                <select
                  value={localSettings.headingFontFamily}
                  onChange={e => update('headingFontFamily', e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {GOOGLE_FONTS.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              {/* Preview */}
              <div className="border border-border rounded-xl p-6 space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Font Preview</p>
                <h2 className="text-3xl font-bold" style={{ fontFamily: `'${localSettings.headingFontFamily}', sans-serif` }}>
                  Heading Example
                </h2>
                <p className="text-base" style={{ fontFamily: `'${localSettings.fontFamily}', sans-serif` }}>
                  This is how body text will appear with the selected font. Quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Text & Title */}
        {activeTab === 'text' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Text & Head Title
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Site Title (Browser Tab)</Label>
                <Input value={localSettings.siteTitle} onChange={e => update('siteTitle', e.target.value)} placeholder="My Tech Bali - Computer Repair & Service" />
              </div>
              <div className="space-y-2">
                <Label>Hero Headline 1 (leave empty for default)</Label>
                <Input value={localSettings.heroHeadline1} onChange={e => update('heroHeadline1', e.target.value)} placeholder="Expert Computer" />
              </div>
              <div className="space-y-2">
                <Label>Hero Headline 2 (leave empty for default)</Label>
                <Input value={localSettings.heroHeadline2} onChange={e => update('heroHeadline2', e.target.value)} placeholder="Repair & Service" />
              </div>
              <div className="space-y-2">
                <Label>Hero Subheadline (leave empty for default)</Label>
                <Input value={localSettings.heroSubheadline} onChange={e => update('heroSubheadline', e.target.value)} placeholder="Your trusted partner..." />
              </div>
              <div className="space-y-2">
                <Label>Footer Description (leave empty for default)</Label>
                <Input value={localSettings.footerDescription} onChange={e => update('footerDescription', e.target.value)} placeholder="Your trusted partner..." />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-6 bg-card rounded-xl p-4 border border-border shadow-card">
          <Button variant="outline" onClick={handleReset} className="text-destructive border-destructive/30 hover:bg-destructive/10">
            <RotateCcw className="w-4 h-4 mr-1" /> Reset to Default
          </Button>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-accent font-medium animate-fade-in">✓ Saved!</span>}
            <Button onClick={handleSave} size="lg">
              <Save className="w-4 h-4 mr-1" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
