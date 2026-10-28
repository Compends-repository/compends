"use client";

import { useRouter } from "next/navigation";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview,
);

const ALLOWED = ["image/png", "image/jpeg", "image/webp"];

export function ImageUpload({
  labelIdle,
  field = "avatar",
  initialUrl,
}: {
  labelIdle?: string;
  field?: "avatar" | "background";
  initialUrl?: string | null;
}) {
  const router = useRouter();

  async function removeFromServer(
    load: () => void,
    error: (msg: string) => void,
  ) {
    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field }),
      });
      if (!res.ok) throw new Error();
      load();
      router.refresh();
    } catch {
      error("Não foi possível remover");
    }
  }

  return (
    <FilePond
      allowMultiple={false}
      acceptedFileTypes={ALLOWED}
      maxFileSize="500KB"
      credits={false}
      labelIdle={labelIdle ?? "Enviar foto"}
      stylePanelAspectRatio="1:1"
      styleItemPanelAspectRatio="1:1"
      imagePreviewMaxHeight={400}
      files={
        initialUrl ? [{ source: initialUrl, options: { type: "local" } }] : []
      }
      server={{
        // envia o arquivo (instantUpload é o padrão: roda ao adicionar)
        process: (
          _fieldName,
          file,
          _metadata,
          load,
          error,
          progress,
          abort,
        ) => {
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

        // X em um arquivo enviado nesta sessão
        revert: (_uniqueFileId, load, error) => removeFromServer(load, error),

        // X na foto que já estava salva no banco
        remove: (_source, load, error) => removeFromServer(load, error),

        // carrega a foto existente para dentro do FilePond
        load: (_source, load, error) => {
          fetch(`/api/avatar?field=${field}`)
            .then((r) => {
              if (!r.ok) throw new Error();
              return r.blob();
            })
            .then(load)
            .catch(() => error("Não foi possível carregar a imagem"));
        },
      }}
    />
  );
}
