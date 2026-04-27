import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMediaLibrary, MediaItemMeta } from '@/hooks/useMediaLibrary';
import { Upload, Trash2, Copy, Image as ImageIcon, Video, File as FileIcon, FolderOpen, Download } from 'lucide-react';
import { toast } from 'sonner';

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

const getKind = (type: string): 'image' | 'video' | 'document' => {
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  return 'document';
};

const KindIcon = ({ kind }: { kind: 'image' | 'video' | 'document' }) => {
  if (kind === 'image') return <ImageIcon className="w-5 h-5" />;
  if (kind === 'video') return <Video className="w-5 h-5" />;
  return <FileIcon className="w-5 h-5" />;
};

const MediaTile = ({ item, onRemove }: { item: MediaItemMeta; onRemove: (id: string) => void }) => {
  const kind = getKind(item.type);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(item.url);
      toast.success('URL copied to clipboard');
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = item.url;
    a.download = item.name;
    a.click();
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {kind === 'image' ? (
          <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
        ) : kind === 'video' ? (
          <video src={item.url} className="w-full h-full object-cover" muted />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
            <FileIcon className="w-12 h-12 mb-2" />
            <span className="text-xs uppercase">{item.type.split('/')[1] || 'file'}</span>
          </div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground truncate">
          <KindIcon kind={kind} />
          <span className="truncate" title={item.name}>{item.name}</span>
        </div>
        <p className="text-xs text-muted-foreground">{formatSize(item.size)}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-background/95 to-transparent">
        <Button size="sm" variant="secondary" className="flex-1 h-8 text-xs" onClick={copyUrl}>
          <Copy className="w-3 h-3 mr-1" /> URL
        </Button>
        <Button size="sm" variant="secondary" className="h-8 px-2" onClick={download}>
          <Download className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="destructive" className="h-8 px-2" onClick={() => onRemove(item.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export const MediaLibrary = () => {
  const { items, loading, upload, remove } = useMediaLibrary();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await upload(file);
      }
      toast.success(`${files.length} file(s) uploaded`);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed. Storage may be full.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (id: string) => {
    await remove(id);
    toast.success('File deleted');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-primary" />
          Media Library
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'
          }`}
        >
          <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground mb-1">
            Drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Images (JPG, PNG, WEBP), Videos (MP4, WEBM), Documents (PDF, DOCX) — no size limit
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            onChange={e => handleFiles(e.target.files)}
            className="hidden"
          />
          <Button
            variant="default"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="w-4 h-4 mr-1" />
            {uploading ? 'Uploading...' : 'Choose Files'}
          </Button>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Loading library…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No media yet. Upload your first file above.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
              <MediaTile key={item.id} item={item} onRemove={handleRemove} />
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Files are stored locally in your browser (IndexedDB). They persist across sessions on this device.
        </p>
      </CardContent>
    </Card>
  );
};