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
        className="flex gap-2"
        onClick={() => inputRef.current?.click()}
        aria-label="Enviar imagem"
      >
       <Upload size={18}/><span>Change Wallpaper</span>
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
