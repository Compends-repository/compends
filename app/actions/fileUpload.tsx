"use client";

import { forwardRef } from "react";

type Props = {
  onSelect: (file: File) => void;
};

const FileInput = forwardRef<HTMLInputElement, Props>(function FileInput(
  { onSelect },
  ref,
) {
  return (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onSelect(file);
        e.target.value = "";
      }}
    />
  );
});

export default FileInput;