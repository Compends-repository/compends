"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const ALLOWED = ["image/png", "image/jpeg", "image/webp"];

export function ImageUpload({
  labelIdle,
  field = "avatar",
  initialUrl,
  alt = "",
}: {
  labelIdle?: string;
  field?: "avatar" | "background";
  initialUrl?: string | null;
  alt?: string;
}) {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  async function handleRemove() {
    setRemoving(true);
    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field }),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.refresh();
    } catch (e) {
      console.error("remove falhou:", e);
      alert("Não foi possível remover a imagem.");
    } finally {
      setRemoving(false);
    }
  }

  if (initialUrl) {
    return (
      <div className="relative w-full h-full">
        <img
          src={initialUrl}
          alt={alt}
          className="w-full h-full object-cover object-center"
        />
        <button
          type="button"
          onClick={handleRemove}
          disabled={removing}
          aria-label="Remover foto"
          className="absolute top-3 right-3 size-8 rounded-full bg-black/60 text-white cursor-pointer disabled:opacity-50"
        >
          {removing ? "…" : "✕"}
        </button>
      </div>
    );
  }

  return (
    <div className="upload-zone relative w-full h-full rounded-[inherit] border border-dashed border-white/30">
      <FilePond
        stylePanelLayout="compact"
        stylePanelAspectRatio={undefined}
        allowMultiple={false}
        acceptedFileTypes={ALLOWED}
        maxFileSize="300KB"
        credits={false}
        labelIdle={labelIdle ?? "Enviar foto"}
        server={{
          process: (_name, file, _meta, load, error, progress, abort) => {
            const body = new FormData();
            body.append("file", file, file.name);
            body.append("field", field);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/upload");
            xhr.upload.onprogress = (e) =>
              progress(e.lengthComputable, e.loaded, e.total);
            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                load(JSON.parse(xhr.responseText).url);
                router.refresh();
              } else {
                error("Falha no upload");
              }
            };
            xhr.onerror = () => error("Falha no upload");
            xhr.send(body);

            return {
              abort: () => {
                xhr.abort();
                abort();
              },
            };
          },
        }}
      />
    </div>
  );
}
