import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '@/features/posts/usePosts';
import { PostKind } from '@/features/posts/types';
import { BlockRenderer } from '@/features/posts/BlockRenderer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft } from 'lucide-react';

export const PostDetail = ({ kind }: { kind: PostKind }) => {
  const { slug = '' } = useParams();
  const { getBySlug } = usePosts();
  const post = getBySlug(slug);
  const base = kind === 'blog' ? '/blog' : '/portfolio';

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-6 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Not found</h1>
          <Link to={base} className="text-primary underline">Back to {kind}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {post.status === 'draft' && (
          <div className="bg-amber-500/15 border-y border-amber-500/30 text-amber-900 dark:text-amber-200 text-center text-sm py-2">
            Draft preview — this post is not published yet.
          </div>
        )}
        <div className="container mx-auto px-6 mt-6">
          <Link to={base} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="w-4 h-4" /> Back to {kind}</Link>
        </div>
        {/* Header */}
        <header className="container mx-auto px-6 max-w-3xl pt-8 pb-4 text-center">
          {post.category && <span className="text-xs uppercase tracking-wide text-primary font-semibold">{post.category}</span>}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-lg text-muted-foreground">{post.excerpt}</p>}
        </header>
        {post.cover && (
          <div className="container mx-auto px-6 max-w-5xl my-6">
            <img src={post.cover} alt={post.title} className="w-full aspect-video object-cover rounded-2xl shadow-card" />
          </div>
        )}
        {/* Blocks */}
        <article className="py-6">
          {post.blocks.map(b => <BlockRenderer key={b.id} block={b} />)}
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
      <LanguageSwitcher />
    </div>
  );
};

export default PostDetail;