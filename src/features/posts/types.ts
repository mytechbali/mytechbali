export type PostKind = 'blog' | 'portfolio';

export type Block =
  | { id: string; type: 'hero'; title: string; subtitle: string; image: string; align: 'left' | 'center' | 'right'; height: 'sm' | 'md' | 'lg' }
  | { id: string; type: 'heading'; text: string; level: 1 | 2 | 3; align: 'left' | 'center' | 'right' }
  | { id: string; type: 'text'; html: string }
  | { id: string; type: 'image'; src: string; alt: string; caption: string; width: 'narrow' | 'wide' | 'full' }
  | { id: string; type: 'video'; src: string; poster: string; autoplay: boolean }
  | { id: string; type: 'gallery'; images: { src: string; alt: string }[]; columns: 2 | 3 | 4 }
  | { id: string; type: 'quote'; text: string; author: string }
  | { id: string; type: 'cta'; title: string; subtitle: string; buttonLabel: string; buttonHref: string }
  | { id: string; type: 'spacer'; size: 'sm' | 'md' | 'lg' }
  | { id: string; type: 'divider' };

export type BlockType = Block['type'];

export interface Post {
  id: string;
  kind: PostKind;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  status: 'draft' | 'published';
  featured?: boolean;
  blocks: Block[];
  createdAt: number;
  updatedAt: number;
}

export const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80);

export const blockDefaults = (type: BlockType): Block => {
  const id = newId();
  switch (type) {
    case 'hero': return { id, type, title: 'Your headline here', subtitle: 'A short supporting line', image: '', align: 'center', height: 'md' };
    case 'heading': return { id, type, text: 'Section heading', level: 2, align: 'left' };
    case 'text': return { id, type, html: 'Write your content here. You can use basic HTML.' };
    case 'image': return { id, type, src: '', alt: '', caption: '', width: 'wide' };
    case 'video': return { id, type, src: '', poster: '', autoplay: false };
    case 'gallery': return { id, type, images: [], columns: 3 };
    case 'quote': return { id, type, text: 'A memorable quote.', author: 'Author' };
    case 'cta': return { id, type, title: 'Ready to get started?', subtitle: 'Reach out today.', buttonLabel: 'Contact us', buttonHref: '/#contact' };
    case 'spacer': return { id, type, size: 'md' };
    case 'divider': return { id, type };
  }
};