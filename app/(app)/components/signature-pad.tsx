"use client";

import { useRef, useState } from "react";
import getStroke from "perfect-freehand";
import { STROKE_OPTIONS, type Stroke } from "@/lib/signature";

type Props = { strokes: Stroke[]; onChange: (s: Stroke[]) => void; className?: string };

export function SignaturePad({ strokes, onChange, className }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [current, setCurrent] = useState<Stroke | null>(null);

  const point = (e: React.PointerEvent): [number, number] => {
    const r = ref.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  const toPath = (s: Stroke) => {
    const o = getStroke(s, STROKE_OPTIONS);
    if (o.length < 2) return "";
    return "M" + o.map((p) => p.map((n) => n.toFixed(1)).join(",")).join("L") + "Z";
  };

  return (
    <svg
      ref={ref}
      className={className}
      style={{ touchAction: "none" }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setCurrent([point(e)]);
      }}
      onPointerMove={(e) => current && setCurrent([...current, point(e)])}
      onPointerUp={() => {
        if (current && current.length > 1) onChange([...strokes, current]);
        setCurrent(null);
      }}
    >
      <g fill="white">
        {[...strokes, ...(current ? [current] : [])].map((s, i) => (
          <path key={i} d={toPath(s)} />
        ))}
      </g>
    </svg>
  );
}