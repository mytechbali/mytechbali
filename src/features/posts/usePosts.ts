import { useCallback, useEffect, useState } from 'react';
import { Post, PostKind, newId, slugify } from './types';

const KEY = 'mtb_posts_v1';
const EVT = 'mtb-posts-updated';

const read = (): Post[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const write = (posts: Post[]) => {
  localStorage.setItem(KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event(EVT));
};

export const usePosts = (kind?: PostKind) => {
  const [posts, setPosts] = useState<Post[]>(() => read());

  useEffect(() => {
    const h = () => setPosts(read());
    window.addEventListener(EVT, h);
    window.addEventListener('storage', h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener('storage', h);
    };
  }, []);

  const filtered = kind ? posts.filter(p => p.kind === kind) : posts;

  const create = useCallback((kind: PostKind): Post => {
    const now = Date.now();
    const post: Post = {
      id: newId(),
      kind,
      slug: `${kind}-${now.toString(36)}`,
      title: kind === 'blog' ? 'New blog post' : 'New project',
      excerpt: '',
      cover: '',
      category: '',
      status: 'draft',
      blocks: [],
      createdAt: now,
      updatedAt: now,
    };
    const next = [post, ...read()];
    write(next);
    return post;
  }, []);

  const update = useCallback((id: string, patch: Partial<Post>) => {
    const all = read();
    const next = all.map(p => p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p);
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter(p => p.id !== id));
  }, []);

  const getBySlug = useCallback((slug: string) => read().find(p => p.slug === slug), []);

  return { posts: filtered, allPosts: posts, create, update, remove, getBySlug, slugify };
};