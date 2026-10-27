"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const ALLOWED = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 500 * 1024;

export function ImageUpload({
  labelIdle,
  field = "avatar",
}: {
  labelIdle?: string;
  field?: "avatar" | "background";
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function handleAdd(file: File) {
    if (!ALLOWED.includes(file.type) || file.size > MAX_SIZE) return;

    setLoading(true);
    setPreview(URL.createObjectURL(file));

    const body = new FormData();
    body.append("file", file);
    body.append("field", field);

    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      if (!res.ok) throw new Error("Falha no upload");
      router.refresh(); // recarrega o server component com o avatar novo
    } catch {
      setPreview(null);
    } finally {
      setLoading(false);
    }
  }

  if (preview) {
    return (
      <div className="relative w-full h-full">
        <img src={preview} alt="" className="w-full h-full object-cover object-center" />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="size-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          </div>
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
          handleAdd(item.file as File);
        }}
      />
    </div>
  );
}