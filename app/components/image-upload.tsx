"use client";

import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const ALLOWED = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 500 * 1024;

export function ImageUpload({ labelIdle }: { labelIdle?: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (preview) {
    return (
      <div className="relative w-full h-full">
        <img
          src={preview}
          alt=""
          className="w-full h-full object-cover object-center"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setPreview(null);
          }}
        />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="size-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          </div>
        )}

        {!loading && (
          <button
            type="button"
            onClick={() => setPreview(null)}
            aria-label="Remover foto"
            className="absolute top-3 right-3 size-8 rounded-full bg-black/60 text-white cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="upload-zone relative w-full h-full rounded-[inherit] border border-dashed border-white/30">
      <FilePond
        allowMultiple={false}
        acceptedFileTypes={ALLOWED}
        maxFileSize="500KB"
        credits={false}
        labelIdle={labelIdle ?? "Enviar foto"}
        onaddfile={(error, item) => {
          if (error) return;
          const file = item.file;
          if (!ALLOWED.includes(file.type) || file.size > MAX_SIZE) return;
          setLoading(true);
          setPreview(URL.createObjectURL(file));
        }}
      />
    </div>
  );
}