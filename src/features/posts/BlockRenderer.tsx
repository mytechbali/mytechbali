import { Block } from './types';
import { Button } from '@/components/ui/button';

const alignCls = (a: 'left' | 'center' | 'right') =>
  a === 'center' ? 'text-center' : a === 'right' ? 'text-right' : 'text-left';

const heroHeight = (h: 'sm' | 'md' | 'lg') =>
  h === 'sm' ? 'min-h-[40vh]' : h === 'lg' ? 'min-h-[85vh]' : 'min-h-[60vh]';

const widthCls = (w: 'narrow' | 'wide' | 'full') =>
  w === 'full' ? 'max-w-none' : w === 'wide' ? 'max-w-5xl' : 'max-w-3xl';

const spacerCls = (s: 'sm' | 'md' | 'lg') =>
  s === 'sm' ? 'h-8' : s === 'lg' ? 'h-32' : 'h-16';

export const BlockRenderer = ({ block }: { block: Block }) => {
  switch (block.type) {
    case 'hero':
      return (
        <section
          className={`relative w-full ${heroHeight(block.height)} flex items-center overflow-hidden`}
          style={block.image ? { backgroundImage: `url(${block.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-background/90" />
          <div className={`relative z-10 container mx-auto px-6 ${alignCls(block.align)}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">{block.title}</h1>
            {block.subtitle && <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">{block.subtitle}</p>}
          </div>
        </section>
      );
    case 'heading': {
      const Tag = (`h${block.level}` as 'h1' | 'h2' | 'h3');
      const size = block.level === 1 ? 'text-4xl md:text-5xl' : block.level === 2 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl';
      return (
        <div className="container mx-auto px-6 my-8 max-w-3xl">
          <Tag className={`${size} font-bold text-foreground ${alignCls(block.align)}`}>{block.text}</Tag>
        </div>
      );
    }
    case 'text':
      return (
        <div className="container mx-auto px-6 my-6 max-w-3xl">
          <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed [&_a]:text-primary [&_a]:underline" dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case 'image':
      return (
        <figure className={`container mx-auto px-6 my-8 ${widthCls(block.width)}`}>
          {block.src ? (
            <img src={block.src} alt={block.alt} className="w-full h-auto rounded-2xl shadow-card" />
          ) : (
            <div className="w-full aspect-video bg-muted rounded-2xl flex items-center justify-center text-muted-foreground">No image</div>
          )}
          {block.caption && <figcaption className="text-sm text-muted-foreground text-center mt-3">{block.caption}</figcaption>}
        </figure>
      );
    case 'video':
      return (
        <div className="container mx-auto px-6 my-8 max-w-5xl">
          {block.src ? (
            <video src={block.src} poster={block.poster || undefined} controls autoPlay={block.autoplay} muted={block.autoplay} loop={block.autoplay} className="w-full rounded-2xl shadow-card" />
          ) : (
            <div className="w-full aspect-video bg-muted rounded-2xl flex items-center justify-center text-muted-foreground">No video</div>
          )}
        </div>
      );
    case 'gallery':
      return (
        <div className="container mx-auto px-6 my-8 max-w-6xl">
          <div className={`grid gap-4 ${block.columns === 2 ? 'grid-cols-1 md:grid-cols-2' : block.columns === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
            {block.images.map((img, i) => (
              <img key={i} src={img.src} alt={img.alt} className="w-full aspect-square object-cover rounded-xl shadow-sm hover:shadow-md transition-shadow" />
            ))}
          </div>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="container mx-auto px-6 my-10 max-w-3xl border-l-4 border-primary pl-6">
          <p className="text-2xl italic text-foreground/90 leading-relaxed">"{block.text}"</p>
          {block.author && <footer className="mt-3 text-sm text-muted-foreground">— {block.author}</footer>}
        </blockquote>
      );
    case 'cta':
      return (
        <section className="container mx-auto px-6 my-12 max-w-5xl">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-14 text-center shadow-card">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">{block.title}</h3>
            {block.subtitle && <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">{block.subtitle}</p>}
            <Button asChild size="lg" variant="secondary">
              <a href={block.buttonHref}>{block.buttonLabel}</a>
            </Button>
          </div>
        </section>
      );
    case 'spacer':
      return <div className={spacerCls(block.size)} />;
    case 'divider':
      return <div className="container mx-auto px-6 my-8 max-w-3xl"><hr className="border-border" /></div>;
  }
};