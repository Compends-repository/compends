"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

type Props = {
  onSelect: (file: File) => void;
};

export default function UploadButton({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-[#ffffff10] text-white transition hover:bg-[#ffffff20]"
        aria-label="Enviar imagem"
      >
        <Upload size={18} />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
          e.target.value = "";
        }}
      />
    </>
  );
}
