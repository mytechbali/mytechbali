import { Link } from 'react-router-dom';
import { usePosts } from '@/features/posts/usePosts';

const LatestPosts = () => {
  const { posts } = usePosts();
  const latest = posts
    .filter(p => p.status === 'published')
    .sort((a, b) => (Number(!!b.featured) - Number(!!a.featured)) || (b.createdAt - a.createdAt))
    .slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wide text-primary font-semibold">Latest</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">From our blog & portfolio</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map(p => {
            const base = p.kind === 'blog' ? '/blog' : '/portfolio';
            return (
              <Link key={p.id} to={`${base}/${p.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card transition-all hover:-translate-y-1">
                <div className="aspect-video bg-muted overflow-hidden">
                  {p.cover ? <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : null}
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">{p.kind}</span>
                  <h3 className="font-bold text-lg text-foreground mt-1 mb-1 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                  {p.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-10 flex justify-center gap-3">
          <Link to="/blog" className="text-sm font-medium text-primary hover:underline">View all blog posts →</Link>
          <Link to="/portfolio" className="text-sm font-medium text-primary hover:underline">View portfolio →</Link>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;