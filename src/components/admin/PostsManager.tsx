import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePosts } from '@/features/posts/usePosts';
import { Post, PostKind, slugify } from '@/features/posts/types';
import { BlockEditor } from '@/features/posts/BlockEditor';
import { BlockRenderer } from '@/features/posts/BlockRenderer';
import { FileText, Briefcase, Plus, Trash2, ArrowLeft, Eye, Save, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export const PostsManager = ({ kind }: { kind: PostKind }) => {
  const { posts, create, update, remove } = usePosts(kind);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewOn, setPreviewOn] = useState(false);

  const editing = useMemo(() => posts.find(p => p.id === editingId) || null, [posts, editingId]);

  const Icon = kind === 'blog' ? FileText : Briefcase;
  const label = kind === 'blog' ? 'Blog Posts' : 'Portfolio';
  const routeBase = kind === 'blog' ? '/blog' : '/portfolio';

  if (editing) {
    return (
      <PostEditor
        post={editing}
        onBack={() => { setEditingId(null); setPreviewOn(false); }}
        onUpdate={(patch) => update(editing.id, patch)}
        previewOn={previewOn}
        setPreviewOn={setPreviewOn}
        routeBase={routeBase}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {label}
        </CardTitle>
        <Button size="sm" onClick={() => { const p = create(kind); setEditingId(p.id); }}>
          <Plus className="w-4 h-4 mr-1" /> New {kind === 'blog' ? 'post' : 'project'}
        </Button>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">
            No {kind === 'blog' ? 'posts' : 'projects'} yet. Click "New" above to create one.
          </p>
        ) : (
          <div className="grid gap-3">
            {posts.map(p => (
              <div key={p.id} className="flex items-center gap-3 border border-border rounded-lg p-3 hover:bg-muted/40 transition-colors">
                <div className="w-16 h-16 rounded-md bg-muted overflow-hidden shrink-0">
                  {p.cover ? <img src={p.cover} alt="" className="w-full h-full object-cover" /> : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{p.title}</p>
                    <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded ${p.status === 'published' ? 'bg-accent/20 text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">/{p.slug} · {p.blocks.length} block{p.blocks.length === 1 ? '' : 's'}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => setEditingId(p.id)}>Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => window.open(`${routeBase}/${p.slug}`, '_blank')}>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { if (confirm('Delete this post?')) { remove(p.id); toast.success('Deleted'); } }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PostEditor = ({
  post, onBack, onUpdate, previewOn, setPreviewOn, routeBase,
}: {
  post: Post;
  onBack: () => void;
  onUpdate: (patch: Partial<Post>) => void;
  previewOn: boolean;
  setPreviewOn: (v: boolean) => void;
  routeBase: string;
}) => {
  const handleTitle = (title: string) => {
    onUpdate({ title, slug: post.slug.startsWith(`${post.kind}-`) ? slugify(title) || post.slug : post.slug });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setPreviewOn(!previewOn)}>
            <Eye className="w-4 h-4 mr-1" /> {previewOn ? 'Edit' : 'Preview'}
          </Button>
          <Button size="sm" variant={post.status === 'published' ? 'secondary' : 'default'} onClick={() => onUpdate({ status: post.status === 'published' ? 'draft' : 'published' })}>
            {post.status === 'published' ? 'Unpublish' : 'Publish'}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => window.open(`${routeBase}/${post.slug}`, '_blank')}>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {previewOn ? (
        <div className="border border-border rounded-xl bg-background overflow-hidden">
          <div className="bg-muted/40 px-4 py-2 text-xs text-muted-foreground border-b border-border">Preview</div>
          <div className="py-4">
            {post.blocks.map(b => <BlockRenderer key={b.id} block={b} />)}
            {post.blocks.length === 0 && <p className="p-10 text-center text-muted-foreground text-sm">Add blocks to preview.</p>}
          </div>
        </div>
      ) : (
        <>
          <Card>
            <CardHeader><CardTitle className="text-base">Post info</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5"><Label className="text-xs">Title</Label><Input value={post.title} onChange={e => handleTitle(e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label className="text-xs">Slug</Label><Input value={post.slug} onChange={e => onUpdate({ slug: slugify(e.target.value) })} /></div>
                <div className="space-y-1.5"><Label className="text-xs">Category</Label><Input value={post.category} onChange={e => onUpdate({ category: e.target.value })} placeholder="e.g. Tutorial" /></div>
              </div>
              <div className="space-y-1.5"><Label className="text-xs">Excerpt</Label><Textarea rows={2} value={post.excerpt} onChange={e => onUpdate({ excerpt: e.target.value })} /></div>
              <div className="space-y-1.5"><Label className="text-xs">Cover image URL</Label><Input value={post.cover} onChange={e => onUpdate({ cover: e.target.value })} placeholder="Used in the listing card" /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Content blocks</CardTitle></CardHeader>
            <CardContent>
              <BlockEditor blocks={post.blocks} onChange={(blocks) => onUpdate({ blocks })} />
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
            <Save className="w-3 h-3" /> Changes save automatically to your browser.
          </p>
        </>
      )}
    </div>
  );
};