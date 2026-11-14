import getStroke from "perfect-freehand";
import simplify from "simplify-js";

export type Stroke = [number, number][];
export type SignatureData = { w: number; h: number; s: number[][] };

const PAD = 6;
export const STROKE_OPTIONS = { size: 9, thinning: 0.5, smoothing: 0.5, streamline: 0.5 };

export function encodeSignature(strokes: Stroke[]): string | null {
  const all = strokes.flat();
  if (!all.length) return null;

  const minX = Math.min(...all.map((p) => p[0])) - PAD;
  const minY = Math.min(...all.map((p) => p[1])) - PAD;
  const maxX = Math.max(...all.map((p) => p[0])) + PAD;
  const maxY = Math.max(...all.map((p) => p[1])) + PAD;

  const s = strokes.map((stroke) => {
    const pts = simplify(
      stroke.map(([x, y]) => ({ x: x - minX, y: y - minY })),
      1.2,
      true
    );
    const flat: number[] = [];
    let px = 0, py = 0;
    pts.forEach((p, i) => {
      const x = Math.round(p.x), y = Math.round(p.y);
      flat.push(i === 0 ? x : x - px, i === 0 ? y : y - py);
      px = x; py = y;
    });
    return flat;
  });

  const data: SignatureData = { w: Math.ceil(maxX - minX), h: Math.ceil(maxY - minY), s };
  return JSON.stringify(data);
}

export function decodeSignature(raw: string): { w: number; h: number; d: string } | null {
  try {
    const { w, h, s } = JSON.parse(raw) as SignatureData;
    const d = s
      .map((flat) => {
        const pts: Stroke = [];
        let x = 0, y = 0;
        for (let i = 0; i < flat.length; i += 2) {
          x += flat[i]; y += flat[i + 1];
          pts.push([x, y]);
        }
        return pathFromOutline(getStroke(pts, STROKE_OPTIONS));
      })
      .join("");
    return { w, h, d };
  } catch {
    return null;
  }
}

function pathFromOutline(points: number[][]) {
  const len = points.length;
  if (len < 4) return "";
  const avg = (a: number, b: number) => (a + b) / 2;
  const f = (n: number) => n.toFixed(1);
  let [a, b, c] = [points[0], points[1], points[2]];
  let r = `M${f(a[0])},${f(a[1])} Q${f(b[0])},${f(b[1])} ${f(avg(b[0], c[0]))},${f(avg(b[1], c[1]))} T`;
  for (let i = 2; i < len - 1; i++) {
    a = points[i]; b = points[i + 1];
    r += `${f(avg(a[0], b[0]))},${f(avg(a[1], b[1]))} `;
  }
  return r + "Z";
}

export function signatureToDataUri(raw?: string | null): string | null {
  if (!raw) return null;

  // formato antigo: já é um SVG
  if (raw.trimStart().startsWith("<svg")) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(raw)}`;
  }

  const sig = decodeSignature(raw);
  if (!sig) return null;

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sig.w} ${sig.h}" ` +
    `width="${sig.w}" height="${sig.h}"><path fill="#fff" d="${sig.d}"/></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}