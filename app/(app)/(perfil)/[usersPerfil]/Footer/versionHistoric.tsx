import {
  FloatingPanelContent,
  FloatingPanelRoot,
  FloatingPanelTrigger,
} from "@/components/ui/floating-panel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const versions = [
  "Compends - v1.0.0 (terminal)",
  "Compends - v1.0.2 (terminal)",
  "Compends - v1.1.0 (terminal)",
  "Compends - v1.1.5 (terminal)",
  "Compends - v1.2.0 (terminal)",
  "Compends - v1.3.0 (terminal)",
  "Compends - v1.4.0 (terminal)",
  "Compends - v1.5.0 (terminal)",
  "Compends - v1.5.6 (terminal)",

  "Compends - v2.α.0",
];

const ultimo = versions[versions.length - 1];

export default function Vs() {
  return (
    <div className="flex w-full">
      <FloatingPanelRoot>
        <FloatingPanelTrigger title="Versions" className="absolute 3xl:left-[90vw] 2xl:left-[88vw] bottom-[-1vw] whitespace-nowrap">
          {ultimo}
        </FloatingPanelTrigger>

        <FloatingPanelContent position="top" align="right" className="w-[215]">
          <ScrollArea className="h-64 rounded-md p-3">
            <ul className="space-y-1 text-sm text-white">
              {versions.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    </div>
  );
}
