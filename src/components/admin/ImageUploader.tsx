import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploaderProps {
  bucket?: string;
  folder?: string;
  onUploaded: (publicUrl: string, path: string) => void;
}

const ImageUploader = ({ bucket = "product-images", folder = "products", onUploaded }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const path = `${folder}/${crypto.randomUUID?.() ?? Date.now()}-${safeName}`;
      const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onUploaded(data.publicUrl, path);
    } catch (e: any) {
      console.error(e);
      setError(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
        disabled={uploading}
      />
      {uploading && <div className="text-sm text-gray-500">Uploading…</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default ImageUploader;
