import { Block, BlockType, blockDefaults } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowDown, ArrowUp, Trash2, Plus, Image as ImageIcon, Video, Type, Heading, Quote, Megaphone, Minus, MoveVertical, LayoutPanelTop, Images } from 'lucide-react';

const blockMeta: { type: BlockType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { type: 'hero', label: 'Hero', icon: LayoutPanelTop },
  { type: 'heading', label: 'Heading', icon: Heading },
  { type: 'text', label: 'Text', icon: Type },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'gallery', label: 'Gallery', icon: Images },
  { type: 'quote', label: 'Quote', icon: Quote },
  { type: 'cta', label: 'CTA', icon: Megaphone },
  { type: 'spacer', label: 'Spacer', icon: MoveVertical },
  { type: 'divider', label: 'Divider', icon: Minus },
];

interface Props {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

export const BlockEditor = ({ blocks, onChange }: Props) => {
  const add = (type: BlockType) => onChange([...blocks, blockDefaults(type)]);
  const remove = (id: string) => onChange(blocks.filter(b => b.id !== id));
  const move = (id: string, dir: -1 | 1) => {
    const i = blocks.findIndex(b => b.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const updateBlock = (id: string, patch: Partial<Block>) => {
    onChange(blocks.map(b => (b.id === id ? ({ ...b, ...patch } as Block) : b)));
  };

  return (
    <div className="space-y-4">
      {blocks.length === 0 && (
        <div className="border-2 border-dashed border-border rounded-xl p-10 text-center text-muted-foreground">
          No blocks yet. Add your first block below.
        </div>
      )}

      {blocks.map((block, i) => (
        <div key={block.id} className="border border-border rounded-xl bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{block.type}</span>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={() => move(block.id, -1)} disabled={i === 0}><ArrowUp className="w-4 h-4" /></Button>
              <Button size="sm" variant="ghost" onClick={() => move(block.id, 1)} disabled={i === blocks.length - 1}><ArrowDown className="w-4 h-4" /></Button>
              <Button size="sm" variant="ghost" onClick={() => remove(block.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <BlockFields block={block} update={(patch) => updateBlock(block.id, patch)} />
          </div>
        </div>
      ))}

      {/* Add toolbar */}
      <div className="border border-dashed border-border rounded-xl p-4 bg-muted/20">
        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1"><Plus className="w-3 h-3" /> Add block</p>
        <div className="flex flex-wrap gap-2">
          {blockMeta.map(({ type, label, icon: Icon }) => (
            <Button key={type} size="sm" variant="outline" onClick={() => add(type)}>
              <Icon className="w-3.5 h-3.5 mr-1" /> {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlockFields = ({ block, update }: { block: Block; update: (patch: Partial<Block>) => void }) => {
  switch (block.type) {
    case 'hero':
      return (
        <>
          <Field label="Title"><Input value={block.title} onChange={e => update({ title: e.target.value } as Partial<Block>)} /></Field>
          <Field label="Subtitle"><Input value={block.subtitle} onChange={e => update({ subtitle: e.target.value } as Partial<Block>)} /></Field>
          <Field label="Background image URL"><Input value={block.image} onChange={e => update({ image: e.target.value } as Partial<Block>)} placeholder="Paste from Media Library" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Align">
              <Select value={block.align} onChange={v => update({ align: v as 'left' | 'center' | 'right' } as Partial<Block>)} options={['left','center','right']} />
            </Field>
            <Field label="Height">
              <Select value={block.height} onChange={v => update({ height: v as 'sm' | 'md' | 'lg' } as Partial<Block>)} options={['sm','md','lg']} />
            </Field>
          </div>
        </>
      );
    case 'heading':
      return (
        <>
          <Field label="Text"><Input value={block.text} onChange={e => update({ text: e.target.value } as Partial<Block>)} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Level">
              <Select value={String(block.level)} onChange={v => update({ level: Number(v) as 1 | 2 | 3 } as Partial<Block>)} options={['1','2','3']} />
            </Field>
            <Field label="Align">
              <Select value={block.align} onChange={v => update({ align: v as 'left' | 'center' | 'right' } as Partial<Block>)} options={['left','center','right']} />
            </Field>
          </div>
        </>
      );
    case 'text':
      return <Field label="HTML content"><Textarea rows={6} value={block.html} onChange={e => update({ html: e.target.value } as Partial<Block>)} /></Field>;
    case 'image':
      return (
        <>
          <Field label="Image URL"><Input value={block.src} onChange={e => update({ src: e.target.value } as Partial<Block>)} /></Field>
          <Field label="Alt text"><Input value={block.alt} onChange={e => update({ alt: e.target.value } as Partial<Block>)} /></Field>
          <Field label="Caption"><Input value={block.caption} onChange={e => update({ caption: e.target.value } as Partial<Block>)} /></Field>
          <Field label="Width">
            <Select value={block.width} onChange={v => update({ width: v as 'narrow' | 'wide' | 'full' } as Partial<Block>)} options={['narrow','wide','full']} />
          </Field>
        </>
      );
    case 'video':
      return (
        <>
          <Field label="Video URL"><Input value={block.src} onChange={e => update({ src: e.target.value } as Partial<Block>)} /></Field>
          <Field label="Poster URL (optional)"><Input value={block.poster} onChange={e => update({ poster: e.target.value } as Partial<Block>)} /></Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={block.autoplay} onChange={e => update({ autoplay: e.target.checked } as Partial<Block>)} />
            Autoplay (muted, looped)
          </label>
        </>
      );
    case 'gallery':
      return (
        <>
          <Field label="Columns">
            <Select value={String(block.columns)} onChange={v => update({ columns: Number(v) as 2 | 3 | 4 } as Partial<Block>)} options={['2','3','4']} />
          </Field>
          <Field label="Image URLs (one per line)">
            <Textarea
              rows={5}
              value={block.images.map(i => i.src).join('\n')}
              onChange={e => update({ images: e.target.value.split('\n').map(s => s.trim()).filter(Boolean).map(src => ({ src, alt: '' })) } as Partial<Block>)}
              placeholder="https://...&#10;https://..."
            />
          </Field>
        </>
      );
    case 'quote':
      return (
        <>
          <Field label="Quote"><Textarea rows={3} value={block.text} onChange={e => update({ text: e.target.value } as Partial<Block>)} /></Field>
          <Field label="Author"><Input value={block.author} onChange={e => update({ author: e.target.value } as Partial<Block>)} /></Field>
        </>
      );
    case 'cta':
      return (
        <>
          <Field label="Title"><Input value={block.title} onChange={e => update({ title: e.target.value } as Partial<Block>)} /></Field>
          <Field label="Subtitle"><Input value={block.subtitle} onChange={e => update({ subtitle: e.target.value } as Partial<Block>)} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Button label"><Input value={block.buttonLabel} onChange={e => update({ buttonLabel: e.target.value } as Partial<Block>)} /></Field>
            <Field label="Button link"><Input value={block.buttonHref} onChange={e => update({ buttonHref: e.target.value } as Partial<Block>)} /></Field>
          </div>
        </>
      );
    case 'spacer':
      return <Field label="Size"><Select value={block.size} onChange={v => update({ size: v as 'sm' | 'md' | 'lg' } as Partial<Block>)} options={['sm','md','lg']} /></Field>;
    case 'divider':
      return <p className="text-xs text-muted-foreground">A simple horizontal rule.</p>;
  }
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs">{label}</Label>
    {children}
  </div>
);

const Select = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
  >
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);