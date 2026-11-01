"use client";

import { forwardRef } from "react";

type Props = {
  onSelect: (file: File) => void;
  id?: string;
};

const FileInput = forwardRef<HTMLInputElement, Props>(function FileInput(
  { onSelect, id },
  ref,
) {
  return (
    <input
      id={id}
      ref={ref}
      type="file"
      accept="image/*"
      className="sr-only"
      tabIndex={-1}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onSelect(file);
        e.target.value = "";
      }}
    />
  );
});

export default FileInput;