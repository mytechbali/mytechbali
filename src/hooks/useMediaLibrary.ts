import { useEffect, useState, useCallback } from 'react';

const DB_NAME = 'mtb_media_library';
const STORE = 'files';
const DB_VERSION = 1;

export interface MediaItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: number;
  blob: Blob;
}

export interface MediaItemMeta {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: number;
  url: string; // object URL for preview / copy
}

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const tx = async <T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    const req = fn(store);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
};

export const useMediaLibrary = () => {
  const [items, setItems] = useState<MediaItemMeta[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const all = await tx<MediaItem[]>('readonly', s => s.getAll() as IDBRequest<MediaItem[]>);
      const metas: MediaItemMeta[] = all
        .sort((a, b) => b.uploadedAt - a.uploadedAt)
        .map(it => ({
          id: it.id,
          name: it.name,
          type: it.type,
          size: it.size,
          uploadedAt: it.uploadedAt,
          url: URL.createObjectURL(it.blob),
        }));
      setItems(prev => {
        prev.forEach(p => URL.revokeObjectURL(p.url));
        return metas;
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    return () => {
      // cleanup on unmount
      setItems(prev => {
        prev.forEach(p => URL.revokeObjectURL(p.url));
        return [];
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upload = async (file: File) => {
    const item: MediaItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      uploadedAt: Date.now(),
      blob: file,
    };
    await tx('readwrite', s => s.put(item));
    await refresh();
  };

  const remove = async (id: string) => {
    await tx('readwrite', s => s.delete(id));
    await refresh();
  };

  return { items, loading, upload, remove, refresh };
};