import { Link } from 'react-router-dom';
import { usePosts } from '@/features/posts/usePosts';
import { PostKind } from '@/features/posts/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const PostList = ({ kind }: { kind: PostKind }) => {
  const { posts } = usePosts(kind);
  const published = posts.filter(p => p.status === 'published');
  const title = kind === 'blog' ? 'Blog' : 'Portfolio';
  const subtitle = kind === 'blog' ? 'News, tips and tutorials.' : 'Selected projects and case studies.';
  const base = kind === 'blog' ? '/blog' : '/portfolio';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <header className="bg-gradient-to-br from-primary to-primary/80 pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-3">{title}</h1>
          <p className="text-primary-foreground/90 text-lg">{subtitle}</p>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-12">
        {published.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Nothing published yet. Check back soon.</p>
        ) : (
          <div className={`grid gap-8 ${kind === 'portfolio' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {published.map(p => (
              <Link key={p.id} to={`${base}/${p.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card transition-all hover:-translate-y-1">
                <div className="aspect-video bg-muted overflow-hidden">
                  {p.cover ? <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : null}
                </div>
                <div className="p-5">
                  {p.category && <span className="text-xs uppercase tracking-wide text-primary font-semibold">{p.category}</span>}
                  <h2 className="font-bold text-xl text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">{p.title}</h2>
                  {p.excerpt && <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <LanguageSwitcher />
    </div>
  );
};

export default PostList;